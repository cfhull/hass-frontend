import elements from '@cfhull/dom-it'
import styles from './spotify-manager.module.css'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

export const SpotifyManager = ({
  attributes: {
    entity_picture,
    media_artist,
    media_album_name,
    media_title,
    volume_level,
  } = {},
  entity_id,
  state,
  onVolumeChange,
  onStateChange,
}) => { 
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
          onclick: onStateChange,
        }),
        input({
          className: styles.volume,
          type: 'range',
          min: '0',
          max: '1',
          step: '0.01',
          value: volume_level,
          oninput: onVolumeChange,
        })
      )
    )
  )
}

