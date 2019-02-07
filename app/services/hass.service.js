import {
  getAuth,
  createConnection,
  subscribeEntities,
  ERR_HASS_HOST_REQUIRED,
  callService,
} from '../../node_modules/home-assistant-js-websocket/dist/haws.es.js'

export const hassService = (() => {
  const url = 'https://biddy.duckdns.org:8123'
  let connection

  return {
    connect: async () => {
      let auth
      try {
        auth = await getAuth({
          hassUrl: url,
        })
      } catch (err) {
        if (err === ERR_HASS_HOST_REQUIRED) {
          const hassUrl = prompt(
            'What host to connect to?',
            'https://biddy.duckdns.org'
          )
          // Redirect user to log in on their instance
          auth = await getAuth({ hassUrl })
        } else {
          alert(`Unknown error: ${err}`)
          return
        }
      }
      connection = await createConnection({ auth })
    },

    subscribeEntities: cb =>
      subscribeEntities(connection, ent => cb(ent)),

    media: {
      play: entity_id => callService(
        connection,
        'media_player',
        'media_play',
        { entity_id }
      ),
      pause: entity_id => callService(
        connection,
        'media_player',
        'media_pause',
        { entity_id }
      ),
      setVolume: (entity_id, volume_level) => callService(
        connection,
        'media_player',
        'volume_set',
        {
          entity_id,
          volume_level,
        }
      ),
    },

    callService: (domain, service, data) =>
      callService(connection, domain, service, data),
  }
})()
