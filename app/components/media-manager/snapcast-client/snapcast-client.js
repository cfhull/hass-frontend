import { publish, SET_VOLUME } from '../../../services/hass.service.js' 
import elements from '@cfhull/dom-it'
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
    div({id: entity_id},
      div({
        innerHTML: friendly_name,
      }) ,
      div({
      },
        input({
          type: 'range',
          min: 0,
          max: 1,
          step: 0.01,
          value: volume_level,
          onchange: async(e) => {
            await publish(SET_VOLUME, {
              entity_id,
              value: e.currentTarget.value,
            })
          },
        })
      ),
    )
  )
}
