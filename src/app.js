import React from 'react'
import Hero from './hero'
import Head from './head'
import Timeline from './timeline'
import Contact from './contact'

const Component = ({app, headActions, classesActions, eventsActions, contactActions}) => {
  return <div>
    <Hero links={app.hero.links} />
    <Head {...app.head} {...headActions} />
    <div className='body'>
      <Timeline route='classes' {...app.classes} {...classesActions} />
      <Timeline route='events' {...app.events} {...eventsActions} />
      <Contact {...app.contact} {...contactActions} />
    </div>
  </div>
}

export default Component
