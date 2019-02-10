import { connect } from './services/hass.service.js'
import MediaManager from './components/media-manager/media-manager'

connect().then(x => 
  document.getElementById('app-root').appendChild(MediaManager())
)
