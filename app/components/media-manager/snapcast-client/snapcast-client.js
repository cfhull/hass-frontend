import { publish, SET_VOLUME } from '../../../services/hass.service.js' 
import { elements } from '../../../element-creator.js'
import styles from './snapcast-client.module.css'

export const SnapcastClient = ({
  entity_id,
  attributes: {
    volume_level,
    friendly_name,
  } = {},
}) => {
  const { div, input } = elements
  return (
    div({},
      div({
        className: styles.name,
        innerHTML: friendly_name,
      }) ,
      div({
        className: styles.controls,
      },
        input({
          className: styles.volume,
          type: 'range',
          min: 0,
          max: 1,
          step: 0.01,
          value: volume_level,
          onchange: async(e) => {
            const element = e.currentTarget

            await publish(SET_VOLUME, {
              entity_id,
              value: element.value,
            })
          },
        })
      ) ,
    )
  )
}
