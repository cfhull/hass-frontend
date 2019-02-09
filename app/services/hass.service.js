import {
  getAuth,
  createConnection,
  subscribeEntities,
  getStates,
  ERR_HASS_HOST_REQUIRED,
  callService,
} from '../../node_modules/home-assistant-js-websocket/dist/haws.es.js'

const url = 'https://biddy.duckdns.org:8123'
let connection

export const connect = async () => {
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
}

export const subscribe = cb => subscribeEntities(connection, ent => cb(ent))

export const publish = async (actionType, data) => (
  match(actionType).on(x => x === 'volume_set', () => ( 
    callService(
      connection,
      'media_player',
      actionType,
      {
        entity_id: 'media_player.spotify',
        volume_level: data.value,
      }
    )
  ))
  .on(x => x === 'set_media_state', () => (
    callService(
      connection,
      'media_player',
      data.service,
      {
        entity_id: 'media_player.spotify',
      }
    )
  ))
  .otherwise(x => { throw 'invalid service call: ' + x })
)

export const getState = (entityId) =>
  getStates(connection).then(states =>
    states.find(state => state.entity_id === entityId)
  )

export const SET_VOLUME = 'volume_set'
export const SET_MEDIA_STATE = 'set_media_state'

const matched = x => ({
  on: () => matched(x),
  otherwise: () => x,
})

const match = x => ({  
  on: (pred, fn) => (pred(x) ? matched(fn(x)) : match(x)),
  otherwise: fn => fn(x),
})
