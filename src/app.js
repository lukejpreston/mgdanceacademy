import React from 'react'
import Hero from './hero'
import Head from './head'

const Component = ({app, headActions}) => {
  return <div>
    <Hero />
    <Head {...app.head} {...headActions} />
  </div>
}

export default Component
