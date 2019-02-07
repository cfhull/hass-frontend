import { hassService } from '../../../services/hass.service.js' 
import component from '../../../services/component.service.js'

export default class SnapcastClient extends HTMLElement {
  constructor() {
    super()
  }

  static get observedAttributes() {
    return [
      'entity_id', 'name', 'volume', 'isVolumeMuted', 'state'
    ]
  }

  async connectedCallback() {
    const shadowRoot = await component.create(this, './components/media-manager/snapcast-client/snapcast-client.html')

    this.initEvents()
    SnapcastClient.observedAttributes.forEach(x => this.render(x, null, this[x]))
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    this[attrName] = newVal
    this.render(attrName, oldVal, newVal)
  }

  async initEvents() {
    this.shadowRoot.querySelector('#volume').onchange = async (e) => {
      const element = e.currentTarget

      await hassService.media.setVolume(
        this.entity_id,
        element.value
      )
    }
  }

  render(attrName, oldVal, newVal) {
    if (this.shadowRoot) {
      const el = this.shadowRoot.querySelector(`#${attrName}`)
      if (el) {
        switch(attrName) {
          case 'volume':
            el.value = newVal
            break;
          case 'name':
            el.innerHTML = newVal
            break
          default:
            break
        }
      }
    }
  }
}

customElements.define('snapcast-client', SnapcastClient)

