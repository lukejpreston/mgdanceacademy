import React from 'react'
import Facebook from './facebook'
import Instagram from './instagram'
import Icon from './mgda-icon'
import {Link} from 'react-router-dom'
import './hero.css'

const Hero = ({links}) => <div className='hero'>
  <div className='hero-container'>
    <div className='hero-images'>
      <Link to='/'>
        <Icon />
      </Link>
      <div className='hero-images-social'>
        <a href='https://www.facebook.com/mgda.mfsd'><Facebook /></a>
        <a href='https://www.instagram.com/mgda.mfsd'><Instagram /></a>
      </div>
    </div>
    <div className='hero-links'>
      {links.map(link => <Link key={link.to} className='hero-link' to={link.to}>{link.label}</Link>)}
      {/* <Link className='hero-link' to='/classes/monday'>Classes</Link>
      <Link className='hero-link' to='/events'>Events</Link>
      <Link className='hero-link' to='/contact'>Contact</Link>
      <Link className='hero-link' to='/policies'>Policies</Link> */}
    </div>
  </div>
</div>

export default Hero
