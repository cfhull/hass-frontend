import { subscribe, publish, getState, SET_VOLUME, SET_MEDIA_STATE } from '../../../services/hass.service.js' 
import { elements } from '../../../element-creator.js'
import { DiffDOM } from 'diff-dom'
import styles from './spotify-manager.module.css'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

export const SpotifyManager = () => {
  let dom = render({})

  subscribe(entities => {
    const data = entities['media_player.spotify'].attributes
    data.state = entities['media_player.spotify'].state

    const dd = new DiffDOM()
    const diff = dd.diff(dom, render(data))

    if (diff.length > 0) {
      dd.apply(dom, diff)
    }
  })


  function render({
    entity_id,
    entity_picture,
    media_artist,
    media_album_name,
    media_title,
    volume_level,
    state,
  }) { 
    const { div, span, img, input } = elements
    return (
      div({},
        span({
          className: styles.state,
        }),
        div({
          className: styles.songInfo,
        },
          img({
            className: styles.artwork,
            src: `https://biddy.duckdns.org${entity_picture}`,
          }),
          div({
            innerHTML: media_artist,
          }),
          div({
            innerHTML: media_album_name,
          }),
          div({
            innerHTML: media_title,
          }),
        ),
        div({
          className: styles.controls,
        },
          div({
            className: cx(styles.stateToggle, { playing: state === 'playing'}),
            onclick: async () => {
              const state = await getState('media_player.spotify')
              publish(
                SET_MEDIA_STATE,
                {
                  service: state.state === 'playing' ? 'media_pause' : 'media_play',
                }
              )
            },
          }),
          input({
            className: styles.volume,
            type: 'range',
            min: '0',
            max: '1',
            step: '0.01',
            value: volume_level,
            onchange: async(e) => {
              const element = e.currentTarget

              await publish(SET_VOLUME, {
                value: element.value,
              })
            },
          })
        )
      )
    )
  }

  return dom
}

