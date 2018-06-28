import React, {Component, createRef} from 'react'
import './contact.css'

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g

class Control extends Component {
  constructor (props) {
    super(props)
    this.state = {
      active: 'is-inactive',
      filled: 'is-unfilled',
      shakeCount: 0,
      shake: 'noshake'
    }
    this.controlRef = createRef()
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
  keydown (evt) {
    if (evt.key === 'Enter') this.props.onEnter()
  }
  componentWillReceiveProps (props) {
    if (props.focus) this.controlRef.current.focus()

    let shakeCount = this.state.shakeCount
    if (this.props.message !== props.message) shakeCount = (this.state.shakeCount + 1) % 2

    this.setState({
      filled: props.value === '' ? 'is-unfilled' : 'is-filled',
      shakeCount,
      shake: props.valid ? 'noshake' : 'shake'
    })
  }
}

class ControlText extends Control {
  render () {
    return <div className={`control control-container ${this.state.active} ${this.state.filled} is-text is-${this.props.valid ? 'valid' : 'invalid'}`}>
      <label className='control-label'>{this.props.label}</label>
      <input disabled={this.props.disabled} ref={this.controlRef} className='control-input' type='text' value={this.props.value} onFocus={() => this.focus()} onBlur={() => this.blur()} onChange={(evt) => this.change(evt.target.value)} onKeyDown={(evt) => { this.keydown(evt) }} />
      <span className={`control-message ${this.state.shake}-${this.state.shakeCount}`}>{this.props.message}</span>
    </div>
  }
}

class ControlTextArea extends Control {
  render () {
    return <div className={`control-container is-${this.props.valid ? 'valid' : 'invalid'}`}>
      <div className={`control ${this.state.active} ${this.state.filled} is-textarea`}>
        <label className='control-label'>{this.props.label}</label>
        <textarea disabled={this.props.disabled} ref={this.controlRef} className='control-input' type='text' value={this.props.value} onFocus={() => this.focus()} onBlur={() => this.blur()} onChange={(evt) => this.change(evt.target.value)} />
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
        focus: false,
        message: ''
      },
      lastName: {
        value: '',
        valid: true,
        focus: false,
        message: ''
      },
      email: {
        value: '',
        valid: true,
        focus: false,
        message: ''
      },
      subject: {
        value: '',
        valid: true,
        focus: false,
        message: ''
      },
      message: {
        value: '',
        valid: true,
        focus: false,
        message: ''
      }
    }
  }
  change (name, value) {
    const state = this.state
    state[name] = this.validate(name, value)
    this.setState(state)
  }
  validate (key, value) {
    const field = this.state[key]
    value = typeof value === 'undefined' ? field.value : value
    let name = key
    name = name[0].toUpperCase() + name.replace('Name', ' Name').slice(1, name.length + 1)
    field.value = value
    field.focus = false
    if (value === '') {
      field.valid = false
      field.message = `${name} is required`
    } else {
      field.valid = true
      field.message = ''
    }
    return field
  }
  validateEmail () {
    const email = this.validate('email')
    const value = email.value
    if (value !== '' && value.match(emailRegex) === null) {
      email.valid = false
      email.message = `${value} is not a valid email`
    }
    return email
  }
  submit () {
    const state = this.state
    state.firstName = this.validate('firstName')
    state.lastName = this.validate('lastName')
    state.subject = this.validate('subject')
    state.message = this.validate('message')
    state.email = this.validateEmail()

    if (!state.firstName.valid) state.firstName.focus = true
    else if (!state.lastName.valid) state.lastName.focus = true
    else if (!state.email.valid) state.email.focus = true
    else if (!state.subject.valid) state.subject.focus = true
    else if (!state.message.valid) state.message.focus = true
    else console.log('SEND THE MESSAGE')

    this.setState(state)
  }
  reset () {
    this.setState({
      firstName: {
        value: '',
        valid: true,
        focus: false,
        message: ''
      },
      lastName: {
        value: '',
        valid: true,
        focus: false,
        message: ''
      },
      email: {
        value: '',
        valid: true,
        focus: false,
        message: ''
      },
      subject: {
        value: '',
        valid: true,
        focus: false,
        message: ''
      },
      message: {
        value: '',
        valid: true,
        focus: false,
        message: ''
      }
    })
  }
  render () {
    return <div className={`body-block ${this.props.active} contact`}>
      <h2>Send a Message</h2>
      <ControlText
        disabled={this.props.disabled}
        label='First Name'
        onChange={value => this.change('firstName', value)}
        onEnter={() => this.submit()}
        {...this.state.firstName}
      />
      <ControlText
        disabled={this.props.disabled}
        label='Last Name'
        onChange={value => this.change('lastName', value)}
        onEnter={() => this.submit()}
        {...this.state.lastName}
      />
      <ControlText
        disabled={this.props.disabled}
        label='Email'
        onChange={value => this.change('email', value)}
        onEnter={() => this.submit()}
        {...this.state.email}
      />
      <ControlText
        disabled={this.props.disabled}
        label='Subject'
        onChange={value => this.change('subject', value)}
        onEnter={() => this.submit()}
        {...this.state.subject}
      />
      <ControlTextArea
        disabled={this.props.disabled}
        label='Message'
        onChange={value => this.change('message', value)}
        {...this.state.message}
      />
      <div className='control-buttons'>
        <button disabled={this.props.disabled} className='control-button is-send' onClick={() => this.submit()}>SEND</button>
        <button disabled={this.props.disabled} className='control-button is-reset' onClick={() => this.reset()}>RESET</button>
      </div>
      <p className='contact-warning'>
        {`Please do not send any sensitive information such as passwords or credit card details.

We may hold onto any information from this correspondence for future reference unless requested for it's removal.

All correspondance kept, will be removed when it is longer required.`}
      </p>
    </div>
  }
}
export default Contact
