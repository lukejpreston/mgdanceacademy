import React from 'react'
import Hero from './hero'
import Head from './head'
import Timeline from './timeline'
import Contact from './contact'
import Policies from './policies'

const Component = ({app, headActions, classesActions, eventsActions, contactActions, policiesActions}) => {
  return <div>
    <Hero links={app.hero.links} />
    <Head {...app.head} {...headActions} />
    <div className='body'>
      <Timeline route='classes' {...app.classes} {...classesActions} />
      <Timeline route='events' {...app.events} {...eventsActions} />
      <Contact {...app.contact} {...contactActions} />
      <Policies {...app.policies} {...policiesActions} />
    </div>
  </div>
}

export default Component
