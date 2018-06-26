import React, {Component} from 'react'
import './contact.css'

class Control extends Component {
  constructor (props) {
    super(props)
    this.state = {
      active: 'is-inactive',
      filled: 'is-unfilled',
      value: ''
    }
  }
  focus () {
    this.setState({
      active: 'is-active'
    })
  }
  blur () {
    this.setState({
      active: 'is-inactive',
      filled: this.state.value === '' ? 'is-unfilled' : 'is-filled'
    })
  }
  change (value) {
    this.setState({
      value
    })
  }
}

class ControlText extends Control {
  render () {
    return <div className={`control ${this.state.active} ${this.state.filled} is-text`}>
      <label className='control-label'>{this.props.label}</label>
      <input className='control-input' type='text' value={this.state.value} onFocus={() => this.focus()} onBlur={() => this.blur()} onChange={(evt) => this.change(evt.target.value)} />
    </div>
  }
}

class ControlTextArea extends Control {
  render () {
    return <div className={`control ${this.state.active} ${this.state.filled} is-textarea`}>
      <label className='control-label'>{this.props.label}</label>
      <textarea className='control-input' type='text' value={this.state.value} onFocus={() => this.focus()} onBlur={() => this.blur()} onChange={(evt) => this.change(evt.target.value)} />
    </div>
  }
}

const Contact = ({active}) => <div className={`body-block ${active} contact`}>
  <h2>Send a Message</h2>
  <ControlText label='First Name' />
  <ControlText label='Last Name' />
  <ControlText label='Email' />
  <ControlText label='Subject' />
  <ControlTextArea label='Message' />
  <div className='control-buttons'>
    <button className='control-button is-send'>SEND</button>
    <button className='control-button is-reset'>RESET</button>
  </div>
</div>

export default Contact
