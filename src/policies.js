import React from 'react'
import './policies.css'
import Icon from './pdf-icon'

const Policy = ({ title, message, link, disabled }) => <div className='policy'>
  <Icon className='policy-image' />
  <div className='policy-info'>
    <div className='content-item'>
      <span className='policy-title'>{title}</span>
    </div>
    <div className='content-item'>
      <span className='policy-message'>{message}</span>
    </div>

    {disabled ? null : <div className='content-item'><a className='policy-link' href={link}>Open the file</a></div>}
  </div>
</div>

const Policies = ({ active, items, disabled }) => <div className={`body-block ${active} policies`}>
  {items.map((item, index) => <Policy {...item} key={`policy-${index}`} disabled={disabled} />)}
</div>

export default Policies
