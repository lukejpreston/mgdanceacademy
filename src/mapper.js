const getRoute = (pathname) => {
  let route = 'home'
  if (pathname.includes('classes')) route = 'classes'
  if (pathname.includes('contact')) route = 'contact'
  if (pathname.includes('events')) route = 'events'
  if (pathname.includes('policies')) route = 'policies'
  if (pathname.includes('thanks')) route = 'thanks'
  return route
}

export default (state) => {
  state.app.hero = {
    links: [{
      to: '/classes/tuesday',
      label: 'Classes'
    }, {
      to: '/events',
      label: 'Events'
    }, {
      to: '/contact',
      label: 'Contact'
    }, {
      to: '/policies',
      label: 'Policies'
    }]
  }

  state.app.hero.links[1].to = `/events/${state.app.events.timeline[0].name}`

  const pathname = state.router.location.pathname
  const route = getRoute(pathname)

  state.app.head.disabled = route !== 'home'
  if (route === 'home') {
    state.app.head.dimensions = state.app.head.dimensions || {}
    state.app.head.currentHeight = state.app.head.dimensions.height
  }

  state.app.head.items.forEach(item => {
    item.dimensions = item.dimensions || {}
    if (route === 'home') item.className = 'is-home'
    else if (item.icon === route) {
      item.className = 'is-title'
      state.app.head.currentHeight = item.dimensions.height
    } else item.className = 'is-hidden'
  })

  state.app.classes.active = route === 'classes' ? 'is-active' : 'is-inactive'
  state.app.classes.timeline.forEach(timeline => {
    timeline.disabled = route !== 'classes'
    timeline.active = 'is-inactive'
    timeline.contents.linksDisabled = true
    if (pathname.includes(timeline.name)) {
      timeline.active = 'is-active'
      timeline.contents.linksDisabled = false
    }
  })

  state.app.events.active = route === 'events' ? 'is-active' : 'is-inactive'
  state.app.events.timeline.forEach(timeline => {
    timeline.disabled = route !== 'events'
    timeline.active = 'is-inactive'
    timeline.contents.linksDisabled = true
    if (pathname.includes(timeline.name)) {
      timeline.active = 'is-active'
      timeline.contents.linksDisabled = false
    }
  })

  state.app.contact.active = route === 'contact' ? 'is-active' : 'is-inactive'
  state.app.contact.disabled = route !== 'contact'
  state.app.policies.active = route === 'policies' ? 'is-active' : 'is-inactive'
  state.app.policies.disabled = route !== 'policies'
  state.app.thanks.active = route === 'thanks' ? 'is-active' : 'is-inactive'
  state.app.thanks.disabled = route !== 'thanks'

  if (route === 'thanks') {
    state.app.head.currentHeight = 0
  }
  return state
}
