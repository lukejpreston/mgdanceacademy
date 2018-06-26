import React, {Component} from 'react'
import './contact.css'

class Control extends Component {
  constructor (props) {
    super(props)
    this.state = {
      active: 'is-inactive',
      filled: 'is-unfilled'
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
      filled: this.props.value === '' ? 'is-unfilled' : 'is-filled'
    })
  }
  change (value) {
    this.props.onChange(value)
  }
}

class ControlText extends Control {
  render () {
    return <div className={`control control-container ${this.state.active} ${this.state.filled} is-text is-${this.props.valid ? 'valid' : 'invalid'}`}>
      <label className='control-label'>{this.props.label}</label>
      <input className='control-input' type='text' value={this.props.value} onFocus={() => this.focus()} onBlur={() => this.blur()} onChange={(evt) => this.change(evt.target.value)} />
      <span className='control-message'>{this.props.message}</span>
    </div>
  }
}

class ControlTextArea extends Control {
  render () {
    return <div className='control-container'>
      <div className={`control ${this.state.active} ${this.state.filled} is-textarea is-${this.props.valid ? 'valid' : 'invalid'}`}>
        <label className='control-label'>{this.props.label}</label>
        <textarea className='control-input' type='text' value={this.props.value} onFocus={() => this.focus()} onBlur={() => this.blur()} onChange={(evt) => this.change(evt.target.value)} />
      </div>
      <span className='control-message'>{this.props.message}</span>
    </div>
  }
}

class Contact extends Component {
  constructor (props) {
    super(props)
    this.state = {
      firstName: {
        value: '',
        valid: true,
        message: '*Required'
      },
      lastName: {
        value: '',
        valid: true,
        message: '*Required'
      },
      email: {
        value: '',
        valid: true,
        message: '*Required'
      },
      subject: {
        value: '',
        valid: true,
        message: '*Required'
      },
      message: {
        value: '',
        valid: true,
        message: '*Required'
      }
    }
  }
  change (name, value) {
    const state = this.state
    state[name].value = value
    this.setState(state)
  }
  render () {
    return <div className={`body-block ${this.props.active} contact`}>
      <h2>Send a Message</h2>
      <ControlText label='First Name' value={this.state.firstName.value} onChange={value => this.change('firstName', value)} valid={this.state.firstName.valid} message={this.state.firstName.message} />
      <ControlText label='Last Name' value={this.state.lastName.value} onChange={value => this.change('lastName', value)} valid={this.state.lastName.valid} message={this.state.lastName.message} />
      <ControlText label='Email' value={this.state.email.value} onChange={value => this.change('email', value)} valid={this.state.email.valid} message={this.state.email.message} />
      <ControlText label='Subject' value={this.state.subject.value} onChange={value => this.change('subject', value)} valid={this.state.subject.valid} message={this.state.subject.message} />
      <ControlTextArea label='Message' value={this.state.message.value} onChange={value => this.change('message', value)} valid={this.state.message.valid} message={this.state.message.message} />
      <div className='control-buttons'>
        <button className='control-button is-send'>SEND</button>
        <button className='control-button is-reset'>RESET</button>
      </div>
    </div>
  }
}
export default Contact
