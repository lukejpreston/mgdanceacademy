import React from 'react'
import Hero from './hero'
import Head from './head'
import Timeline from './timeline'

const Component = ({app, headActions, classesActions, eventsActions}) => {
  return <div>
    <Hero links={app.hero.links} />
    <Head {...app.head} {...headActions} />
    <div className='body'>
      <Timeline route='classes' {...app.classes} {...classesActions} />
      <Timeline route='events' {...app.events} {...eventsActions} />
    </div>
  </div>
}

export default Component
