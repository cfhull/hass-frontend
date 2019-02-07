const component = {
  create: async (component, templatePath) => {
      const res = await fetch(templatePath)
      const textTemplate = await res.text()

      const HTMLTemplate = new DOMParser()
        .parseFromString(textTemplate, 'text/html')
        .querySelector('template')

      const shadowRoot = component.attachShadow({ mode: 'open' })
      const instance = HTMLTemplate.content.cloneNode(true)
      shadowRoot.appendChild(instance)

      return shadowRoot
  },

  remove: (root, tagName) => {
      const elements = root.querySelectorAll(tagName) || []
      elements.forEach(x => x.remove())
  }
}

export default component
