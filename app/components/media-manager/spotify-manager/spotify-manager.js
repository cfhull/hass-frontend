import { hassService } from '../../../services/hass.service.js' 
import component from '../../../services/component.service.js'

import { elements } from '../../../element-creator.js'

export default class SpotifyManager extends HTMLElement {
  constructor() {
    super()
  }

  static get observedAttributes() {
    return [
      'entity_id', 'state', 'volume', 'artist', 'album', 'song', 'artwork',
    ]
  }

  async connectedCallback() {
    await component.create(this, './components/media-manager/spotify-manager/spotify-manager.html')


    this.initEvents()
    SpotifyManager.observedAttributes.forEach(x => this.render(x, null, this[x]))
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    this[attrName] = newVal
    this.render(attrName, oldVal, newVal)
  }

  async initEvents() {
    this.shadowRoot.querySelector('.state-toggle').onclick = () => {
      if(this.state === 'playing') {
        hassService.media.pause(this.entity_id)
      } else if (this.state === 'paused'){
        hassService.media.play(this.entity_id)
      }
    }

    this.shadowRoot.querySelector('#volume').onchange = async (e) => {
      const element = e.currentTarget

      await hassService.media.setVolume(
        this.entity_id,
        element.value
      )
    }
  }


  render(attrName, oldVal, newVal) {
    const { div, span } = elements

    document.body.appendChild(
      div(
        {
          id: '1',
          className: 'pie',
          innerText: 'this is a div',
        },
        span(
          {
            className: 'header'
          },
        )
      )
    )

    if (this.shadowRoot) {
      let el
      switch(attrName) {
        case 'volume':
          el = this.shadowRoot.querySelector(`#${attrName}`)
          el.value = newVal
          break
        case 'artist':
        case 'album':
        case 'song':
          el = this.shadowRoot.querySelector(`#${attrName}`)
          el.innerHTML = newVal
          break
        case 'artwork':
          el = this.shadowRoot.querySelector(`#${attrName}`)
          el.src = `https://biddy.duckdns.org${newVal}`
          break
        case 'state':
          if (newVal === 'playing')
            this.shadowRoot.querySelector('.state-toggle').classList.add('playing')
          else if (newVal === 'paused')
            this.shadowRoot.querySelector('.state-toggle').classList.remove('playing')
          /*
          this.shadowRoot.querySelector('.fa-play')
            .hidden = newVal === 'playing'
          this.shadowRoot.querySelector('.fa-pause')
            .hidden = newVal === 'paused'
            */
          break
        default:
          break
      }
    }
  }
}

customElements.define('spotify-manager', SpotifyManager)

