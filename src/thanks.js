import React from 'react'

const Thanks = ({active, disabled}) => {
  return <div className={`thanks body-block ${active}`}>
    <p className='contact-warning'>
      {`Thanks for getting in touch, we will get back to you as soon as possible

Please do not send any sensitive information such as passwords or credit card details.

We may hold onto any information from this correspondence for future reference unless requested for it's removal.

All correspondance kept, will be removed when it is longer required.`}
    </p>
  </div>
}

export default Thanks
