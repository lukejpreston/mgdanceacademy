import React from 'react'
import Hero from './hero'
import Head from './head'
import Timeline from './timeline'

const Component = ({app, headActions, classesActions}) => {
  return <div>
    <Hero />
    <Head {...app.head} {...headActions} />
    <div className='body'>
      <Timeline {...app.classes} {...classesActions} />
    </div>
  </div>
}

export default Component
