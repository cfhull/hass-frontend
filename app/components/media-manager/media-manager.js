import { SpotifyManager } from './spotify-manager/spotify-manager.js'
import { SnapcastClient } from './snapcast-client/snapcast-client.js'
import { subscribe, publish, SET_VOLUME, SET_MEDIA_STATE, getState } from '../../services/hass.service.js' 
import elements from '@cfhull/dom-it'
import updateElement from '@cfhull/diff-dom-props'
import styles from './media-manager.module.css'

const MediaManager = () => {
  let spotifyData = {}
  let snapcastData = [{}]
  let dom = render()

  subscribe(entities => {
    spotifyData = entities['media_player.spotify']
    spotifyData.onVolumeChange = async e => {
      publish(SET_VOLUME, {
        value: e.currentTarget.value,
        entity_id: 'media_player.spotify',
      })
    }
    spotifyData.onStateChange = async e => {
      const state = await getState('media_player.spotify')
      publish(
        SET_MEDIA_STATE,
        {
          service: state.state === 'playing' ? 'media_pause' : 'media_play',
        }
      )
    }

    snapcastData = Object.keys(entities)
      .filter(key => key.startsWith('media_player.snapcast_client_'))
      .reduce((obj, key) => {
        obj.push(entities[key])
        return obj
      }, [])
      .filter(entity => entity.state !== 'off')

    updateElement(dom.parentElement, render(), dom)
  })


  function render() {
    const { div } = elements 
    return (
      div({
        className: styles.container,
      },
        SpotifyManager(spotifyData),
        ...snapcastData.map(data => SnapcastClient(data))
      )
    )
  }

  return dom
}

export default MediaManager
