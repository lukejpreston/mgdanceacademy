const getRoute = (pathname) => {
  let route = 'home'
  if (pathname.includes('classes')) route = 'classes'
  if (pathname.includes('contact')) route = 'contact'
  if (pathname.includes('events')) route = 'events'
  if (pathname.includes('policies')) route = 'policies'
  return route
}

export default (state) => {
  const pathname = state.router.location.pathname
  const route = getRoute(pathname)

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

  state.app.classes.timeline.forEach(timeline => {
    timeline.active = 'is-inactive'
    if (pathname.includes(timeline.name)) timeline.active = 'is-active'
  })

  return state
}
