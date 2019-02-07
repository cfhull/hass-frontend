const test = require('tape')

const hassServices = require('./hass-service.js').hassService

test.skip('hass-service should connect', t => {
    mediaManager.updateEntities(testEntities)

    t.ok(document.querySelector('.media-manager'))
    t.ok(document.querySelector('.spotify'))
    t.end()
});

