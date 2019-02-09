import { SpotifyManager } from './spotify-manager/spotify-manager.js'
import { SnapcastClient } from './snapcast-client/snapcast-client.js'
import { subscribe, publish, SET_VOLUME } from '../../services/hass.service.js' 
import { elements } from '../../element-creator.js'
import { DiffDOM } from 'diff-dom'
import styles from './media-manager.module.css'

const MediaManager = () => {
  let spotifyData = {}
  let snapcastData = [{}]
  let dom = render()

  subscribe(entities => {
    spotifyData = entities['media_player.spotify'].attributes
    spotifyData.state = entities['media_player.spotify'].state

    snapcastData = Object.keys(entities)
      .filter(key => key.startsWith('media_player.snapcast_client_'))
      .reduce((obj, key) => {
        obj.push(entities[key])
        return obj
      }, [])
      .filter(entity => entity.state !== 'off')

    const dd = new DiffDOM()
    const diff = dd.diff(dom, render())

    if (diff.length > 0) {
      dd.apply(dom, diff)
    }
  })

  function render() {
    const { div } = elements 
    return (
      div({
        className: styles.container,
      },
        SpotifyManager(),
        ...snapcastData.map(data => SnapcastClient(data))
      )
    )
  }

  return dom
}

export default MediaManager

