import { hassService } from '../../../services/hass.service.js' 
import component from '../../../services/component.service.js'

import { elements } from '../../../element-creator.js'

export default class SpotifyManager extends HTMLElement {
  constructor() {
    super()

    this.el
  }

  static get observedAttributes() {
    return [
      'entity_id', 'state', 'volume', 'artist', 'album', 'song', 'artwork',
    ]
  }

  static get state() {
    const state = {}
    this.observedAttributes.forEach(attr => {
      state[attr] = this[attr]
    })
    return state
  }

  async connectedCallback() {
    await component.create(this, './components/media-manager/spotify-manager/spotify-manager.html')

    this.el = this.render()
    this.shadowRoot.appendChild(this.el)
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    this[attrName] = newVal
    if(!this.shadowRoot) return

    const dd = new diffDOM.DiffDOM()
    const diff = dd.diff(this.el, this.render())

    if (diff.length > 0) {
      dd.apply(this.el, diff)
    }
  }

  render() {
    const { div, span, img, input, style } = elements

    return (
      div({},
        style({
          innerHTML: '@import "./components/media-manager/spotify-manager/spotify-manager.css";',
        }
        ),
        span({
          id: 'state',
        }),
        div({
          className: 'song-info',
        },
          img({
            id: 'artwork',
            src: `https://biddy.duckdns.org${this.artwork}`,
          }),
          div({
            id: 'artist',
            innerHTML: this.artist,
          }),
          div({
            id: 'album',
            innerHTML: this.album,
          }),
          div({
            id: 'song',
            innerHTML: this.song,
          }),
        ),
        div({
          className: 'controls',
        },
          div({
            className: `state-toggle${this.state === 'playing' ? ' playing' : ''}`,
            onclick: () => {
              if(this.state === 'playing') {
                hassService.media.pause(this.entity_id)
              } else if (this.state === 'paused' || this.state === 'idle'){
                hassService.media.play(this.entity_id)
              }
            },
          }),
          input({
            id: 'volume',
            type: 'range',
            min: '0',
            max: '1',
            step: '0.01',
            value: this.volume,
            onchange: async(e) => {
              const element = e.currentTarget

              await hassService.media.setVolume(
                this.entity_id,
                element.value
              )
            },
          })
        ),
      )
    )
  }
}

customElements.define('spotify-manager', SpotifyManager)

