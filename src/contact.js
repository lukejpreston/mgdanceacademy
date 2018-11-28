import React, { Component, createRef } from 'react'
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
      <input disabled={this.props.disabled} ref={this.controlRef} className='control-input' type='text' value={this.props.value} onFocus={() => this.focus()} onBlur={() => this.blur()} onChange={(evt) => this.change(evt.target.value)} onKeyDown={(evt) => { this.keydown(evt) }} name={this.props.name} />
      <span className={`control-message ${this.state.shake}-${this.state.shakeCount}`}>{this.props.message}</span>
    </div>
  }
}

class ControlTextArea extends Control {
  render () {
    return <div className={`control-container is-${this.props.valid ? 'valid' : 'invalid'}`}>
      <div className={`control ${this.state.active} ${this.state.filled} is-textarea`}>
        <label className='control-label'>{this.props.label}</label>
        <textarea disabled={this.props.disabled} ref={this.controlRef} className='control-input' type='text' value={this.props.value} onFocus={() => this.focus()} onBlur={() => this.blur()} onChange={(evt) => this.change(evt.target.value)} name={this.props.name} />
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
    this.formRef = createRef()
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
  submit (event) {
    if (typeof event !== 'undefined') {
      const state = this.state
      state.firstName = this.validate('firstName')
      state.lastName = this.validate('lastName')
      state.subject = this.validate('subject')
      state.message = this.validate('message')
      state.email = this.validateEmail()

      let submit = false
      if (!state.firstName.valid) state.firstName.focus = true
      else if (!state.lastName.valid) state.lastName.focus = true
      else if (!state.email.valid) state.email.focus = true
      else if (!state.subject.valid) state.subject.focus = true
      else if (!state.message.valid) state.message.focus = true
      else submit = true

      if (!submit) event.preventDefault()

      this.setState(state)
    }
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
    return <form
      onSubmit={(event) => {
        this.submit(event)
      }}
      ref={this.formRef}
      action='//formspree.io/melaniegpreston@gmail.com'
      method='post'
      className={`body-block ${this.props.active} contact`}
    >
      <input type='hidden' name='_next' value='https://mgdanceacademy.com/thanks' />
      <input type='text' name='_gotcha' style={{ display: 'none' }} />
      <h2>Send a Message</h2>
      <ControlText
        name='fname'
        disabled={this.props.disabled}
        label='First Name'
        onChange={value => this.change('firstName', value)}
        onEnter={() => this.submit()}
        {...this.state.firstName}
      />
      <ControlText
        name='lname'
        disabled={this.props.disabled}
        label='Last Name'
        onChange={value => this.change('lastName', value)}
        onEnter={() => this.submit()}
        {...this.state.lastName}
      />
      <ControlText
        name='_replyto'
        disabled={this.props.disabled}
        label='Email'
        onChange={value => this.change('email', value)}
        onEnter={() => this.submit()}
        {...this.state.email}
      />
      <ControlText
        name='_subject'
        disabled={this.props.disabled}
        label='Subject'
        onChange={value => this.change('subject', value)}
        onEnter={() => this.submit()}
        {...this.state.subject}
      />
      <ControlTextArea
        disabled={this.props.disabled}
        name='message'
        label='Message'
        onChange={value => this.change('message', value)}
        {...this.state.message}
      />
      <div className='control-buttons'>
        <input type='submit' value='Send' disabled={this.props.disabled} className='control-button is-send' />
        <button disabled={this.props.disabled} className='control-button is-reset' onClick={() => this.reset()}>RESET</button>
      </div>
      <p className='contact-warning'>
        {`Please do not send any sensitive information such as passwords or credit card details.

We may hold onto any information from this correspondence for future reference unless requested for it's removal.

All correspondance kept, will be removed when it is longer required.`}
      </p>
    </form>
  }
}
export default Contact
