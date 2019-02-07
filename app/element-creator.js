import { htmlTags } from './html-tags.js'

const elements = {}

htmlTags.forEach(tag => {
  elements[tag] = (props, ...children)  => {
    const el = document.createElement(tag)

    Object.keys(props).forEach(prop => {
      el[prop] = props[prop]
    })

    if (!Array.isArray(children))
      children = [children]

    children.forEach(child => el.appendChild(child))

    return el
  }
})

export { elements }

