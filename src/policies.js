import React from 'react'
import './policies.css'

const Policy = ({title, message, link, disabled}) => <div className='policy'>
  <img alt='pdf' src='/pdf.png' className='policy-image' />
  <span className='policy-title'>{title}</span>
  <span className='policy-message'>{message}</span>
  {disabled ? null : <a className='policy-link' href={link}>The pdf file</a>}
</div>

const Policies = ({active, items, disabled}) => <div className={`body-block ${active} policies`}>
  {items.map((item, index) => <Policy {...item} key={`policy-${index}`} disabled={disabled} />)}
</div>

export default Policies
