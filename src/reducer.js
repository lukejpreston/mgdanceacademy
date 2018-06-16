const head = {
  items: [{
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
}

export default (state, actions) => {
  state.head = head
  return state
}
