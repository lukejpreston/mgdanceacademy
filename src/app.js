import React from 'react'
import Hero from './hero'

const Title = () => (
  <div className="container has-text-centered">
      <h1 className="title">
          WELCOME TO MG DANCE ACADEMY
    </h1>
      <h2 className="subtitle">
          Inspiring a generation of young dancers
    </h2>
  </div>
)


export default () => {
  return (
    <>
      <Hero />
      <main>
        <Title />
      </main>
    </>
  )
}

