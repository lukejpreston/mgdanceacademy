const items = [{
  icon: 'classes',
  side: 'left',
  title: 'Classes',
  message: `Don't be late for our Acro, Ballet, Tap and Modern classes.`,
  link: {
    label: 'Join a class',
    to: '/classes'
  }
}, {
  icon: 'events',
  side: 'right',
  title: 'Events',
  message: 'Never miss out on a workshop, performance or exams ever again.',
  link: {
    label: 'Find an event',
    to: '/events'
  }
}, {
  icon: 'contact',
  side: 'left',
  title: 'Contact',
  message: `Ping! Thanks for the email. We are on Facebook and Instagram too.`,
  link: {
    label: 'Get in touch',
    to: '/classes'
  }
}, {
  icon: 'policies',
  side: 'right',
  title: 'Policies',
  message: 'We want you to feel safe and happy. Read our policies and all the T&Cs.',
  link: {
    label: 'Read our policies',
    to: '/events'
  }
}]

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
  items.forEach(item => {
    item.visible = route === 'home' || item.icon === route
    item.inRoute = item.icon === route
  })

  state.app.head = {
    items: items
  }

  return state
}
