const test = require('tape')
const JSDOM = require('jsdom').JSDOM
const DOM = new JSDOM()
global.document = DOM.window.document
global.HTMLElement = DOM.window.HTMLElement

const MediaManager = require('./media-manager.js').default

const testEntities = [
  {
    entity_id: 'media_player.spotify'
  },
  {
    entity_id: 'media_player.snapcast_client'
  },
]

test('mediaManager should render', t => {
  console.log(new MediaManager())
    MediaManager.updateEntities(testEntities)

    t.ok(document.querySelector('.media-manager'))
    t.ok(document.querySelector('.spotify'))
    t.end()
});
