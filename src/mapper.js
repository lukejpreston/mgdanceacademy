const getRoute = (state) => {
  let route = 'home'
  const pathname = state.router.location.pathname
  if (pathname.includes('classes')) route = 'classes'
  if (pathname.includes('contact')) route = 'contact'
  if (pathname.includes('events')) route = 'events'
  if (pathname.includes('policies')) route = 'policies'
  return route
}

export default (state) => {
  const route = getRoute(state)

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

  return state
}
