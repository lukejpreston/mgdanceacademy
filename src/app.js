import React from 'react'
import Hero from './hero'
import Head from './head'

const Component = ({head}) => {
  return <div>
    <Hero />
    <Head {...head} />
  </div>
}

export default Component
