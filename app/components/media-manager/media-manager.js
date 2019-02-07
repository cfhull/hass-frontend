import { hassService } from '../../services/hass.service.js' 
import component from '../../services/component.service.js' 
import SpotifyManager from './spotify-manager/spotify-manager.js'
import SnapcastClient from './snapcast-client/snapcast-client.js'

export default class MediaManager extends HTMLElement {
  constructor() {
    super()
  }

  async connectedCallback() {
    await component.create(this, './components/media-manager/media-manager.html')

    hassService.connect().then(() => {
      hassService.subscribeEntities(entities => {
        const mediaPlayerEntities = Object.keys(entities)
          .filter(x => x.startsWith('media_player'))
          .reduce((a, b) => {
            a.push(entities[b])
            return a
          }, [])

        this.updateEntities(mediaPlayerEntities)
      })
    })
  }

  updateEntities(entities) {
    const spotifyEntity = entities.find(x => x.entity_id.startsWith('media_player.spotify'))
    let spotifyEl = Array.from(this.shadowRoot.querySelectorAll('spotify-manager')).find(x => x.entity_id === spotifyEntity.entity_id)
    if (!spotifyEl) {
      spotifyEl = document.createElement('spotify-manager')
      this.shadowRoot.appendChild(spotifyEl)
    }

    spotifyEl.setAttribute('entity_id', spotifyEntity.entity_id)
    spotifyEl.setAttribute('state', spotifyEntity.state)
    spotifyEl.setAttribute('volume', spotifyEntity.attributes.volume_level)
    spotifyEl.setAttribute('artist', spotifyEntity.attributes.media_artist)
    spotifyEl.setAttribute('album', spotifyEntity.attributes.media_album_name)
    spotifyEl.setAttribute('song', spotifyEntity.attributes.media_title)
    spotifyEl.setAttribute('artwork', spotifyEntity.attributes.entity_picture)

    const snapcastClientEntities = entities.filter(x => x.entity_id.startsWith('media_player.snapcast_client') && x.state === 'on')
    let snapcastContainer = this.shadowRoot.querySelector('.snapcast-container')
    if (!snapcastContainer) {
      snapcastContainer = document.createElement('div')
      snapcastContainer.classList.add('snapcast-container')
      this.shadowRoot.appendChild(snapcastContainer)
    }
    snapcastClientEntities.forEach(snapcastClientEntity => {
      let snapcastClientEl = Array.from(this.shadowRoot.querySelectorAll('snapcast-client')).find(x => x.entity_id === snapcastClientEntity.entity_id)
      if (!snapcastClientEl) {
        snapcastClientEl = document.createElement('snapcast-client')
        snapcastContainer.appendChild(snapcastClientEl)
      }

      snapcastClientEl.setAttribute('entity_id', snapcastClientEntity.entity_id)
      snapcastClientEl.setAttribute('name', snapcastClientEntity.attributes.friendly_name)
      snapcastClientEl.setAttribute('volume', snapcastClientEntity.attributes.volume_level)
      snapcastClientEl.setAttribute('isVolumeMuted', snapcastClientEntity.attributes.is_volume_muted)
      snapcastClientEl.setAttribute('state', snapcastClientEntity.attributes.state)
    })
  }
}

customElements.define('media-manager', MediaManager)
