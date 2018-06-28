import React from 'react'

const Policy = () => <div>ITEM</div>

const Policies = ({active, items}) => <div className={`body-block ${active} policies`}>
  {items.map((item, index) => <Policy {...item} key={`policy-${index}`} />)}
</div>

export default Policies
