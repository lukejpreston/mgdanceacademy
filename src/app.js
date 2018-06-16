import React from 'react'
import Hero from './hero'
import Head from './head'

const Component = ({app}) => {
  return <div>
    <Hero />
    <Head {...app.head} />
  </div>
}

export default Component
