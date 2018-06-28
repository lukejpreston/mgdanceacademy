import React, {Component, createRef} from 'react'
import {Link} from 'react-router-dom'
import ClassesIcon from './classes-icon'
import EventsIcon from './events-icon'
import ContactIcon from './contact-icon'
import PoliciesIcon from './policies-icon'
import './head.css'

const icons = {
  classes: ClassesIcon,
  events: EventsIcon,
  contact: ContactIcon,
  policies: PoliciesIcon
}

class Item extends Component {
  constructor (props) {
    super(props)
    this.rowRef = createRef()
  }
  componentDidMount () {
    const boundingClientRect = this.rowRef.current.getBoundingClientRect()
    const top = boundingClientRect.top
    const height = boundingClientRect.height
    this.props.mount({
      key: this.props.icon,
      top,
      height
    })
  }
  componentDidUpdate () {
    if (this.props.className === 'is-title') {
      const top = this.props.dimensions.top - this.props.headDimensions.top
      this.rowRef.current.style.transform = `translate(0, -${top}px)`
    } else if (this.props.className === 'is-hidden' && this.props.side === 'left') {
      this.rowRef.current.style.transform = `translateX(-100%)`
    } else if (this.props.className === 'is-hidden') {
      this.rowRef.current.style.transform = `translateX(100%)`
    } else {
      this.rowRef.current.style.transform = `initial`
    }
  }
  render () {
    return <div ref={this.rowRef} className={`row is-${this.props.side} ${this.props.className}`}>
      {this.props.side === 'left' ? <div className='left'>
        {icons[this.props.icon]()}
      </div> : null}
      <div className='middle'>
        <div className='title-container'>
          <span className='title'>{this.props.title}</span>
        </div>
        <div className='message-container'>
          <span className='message'>{this.props.message}</span>
        </div>
        <div className='link-container'>
          {this.props.disabled ? null : <Link className='link' to={this.props.link.to}>{this.props.link.label}</Link>}
        </div>
      </div>
      {this.props.side === 'right' ? <div className='right'>
        {icons[this.props.icon]()}
      </div> : null}
    </div>
  }
}

Item.defaultProps = {
  dimensions: {top: 0, height: 0}
}

class Head extends Component {
  constructor (props) {
    super(props)
    this.headRef = createRef()
    this.state = {
      top: 0
    }
  }
  componentDidMount () {
    const boundingClientRect = this.headRef.current.getBoundingClientRect()
    const top = boundingClientRect.top
    const height = boundingClientRect.height
    this.props.mount({
      key: 'head',
      top,
      height
    })
  }
  componentDidUpdate () {
    this.headRef.current.style.height = `${this.props.currentHeight}px`
  }
  render () {
    return <div ref={this.headRef} className='head'>
      {this.props.items.map(item => <Item {...item} key={item.icon} top={this.state.top} mount={this.props.mount} headDimensions={this.props.dimensions} disabled={this.props.disabled} />)}
    </div>
  }
}

Head.defaultProps = {
  dimensions: {top: 0, height: 0}
}

export default Head
