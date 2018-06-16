import React from 'react'
import {Link} from 'react-router-dom'
import ClassesIcon from './classes-icon'
import EventsIcon from './events-icon'
import ContactIcon from './contact-icon'
import PoliciesIcon from './policies-icon'

const icons = {
  classes: ClassesIcon,
  events: EventsIcon,
  contact: ContactIcon,
  policies: PoliciesIcon
}

const Item = ({side, icon, title, message, link}) => <div className={`row is-${side}`}>
  {side === 'left' ? <div className='left'>
    {icons[icon]()}
  </div> : null}
  <div className='middle'>
    <div className='title-container'>
      <span className='title'>{title}</span>
    </div>
    <div className='message-container'>
      <span className='message'>{message}</span>
    </div>
    <div className='link-container'>
      <Link className='link' to={link.to}>{link.label}</Link>
    </div>
  </div>
  {side === 'right' ? <div className='right'>
    {icons[icon]()}
  </div> : null}
</div>

const Head = ({items}) => {
  return <div className='head'>
    {items.map(item => <Item {...item} key={item.icon} />)}
  </div>
}

export default Head
