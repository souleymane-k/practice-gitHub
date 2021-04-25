import React, {Component} from 'react';
import './RegistrationForm.css';
import Validator from '../Validator/Validator'
import AuthContext from '../../contexts/AuthContext'
import AuthApiService from '../../services/auth-api-service'
import { withAppContext } from '../../contexts/AppContext';
  
class RegistrationForm extends Component {
  static contextType = AuthContext

  state = {
    username: '', username_valid: false,
    email: '', emailValid: false,
    password: '', passwordValid: false,
    formValid: false,
    error: null,
    validationError: {},
  }

  
  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({error: null})
    const {username, email,password} = this.state
    const newUser = {username, email, password}
    const {setLoading} = this.props.appContext
    try {
      setLoading(true)
      const savedUser = await AuthApiService.createUser(newUser)
      this.context.login(savedUser.authToken)
      delete savedUser.authToken
      this.context.setCurrentUser(savedUser)
      setLoading(true)
      // this will load /workouts which will then re-direct to /new-cycle as there are no workouts
    } catch(err) {
      this.setState({error: err.message}, setLoading(false))
    }
  }

  componentWillUnmount() {
    this.setState({error: null})
  }

  handleChange = ({target: {name, value}}) => {
    this.setState({
      [name]: value
    }, name === 'password' ? this.validatePassword : null)
  }

  validateForm = () => {
    const {username_valid, emailValid, passwordValid} = this.state
    this.setState({
      formValid: username_valid && emailValid && passwordValid
    })
  }

  validateUsername = () => {
    let username_valid = true;
    const validationError = {...this.state.validationError}
    const {username} = this.state

    if (username.startsWith(' ') || username.endsWith(' ')) {
      username_valid = false
      validationError.full_name = 'cannot begin or end with spaces'
    } else if (username.length < 3 || username.length > 72) {
      username_valid = false
      validationError.full_name = 'must be between 3 and 72 characters'
    } else if (username.trim().indexOf(' ') === -1) {
      username_valid = false
      validationError.username = 'must contain a space separating first and last'
    }

    this.setState({username_valid, validationError}, this.validateForm)
  }

  validateEmail = () => {
    let emailValid = true
    const validationError = {...this.state.validationError}
    const {email} = this.state

    if (email.startsWith(' ') || email.endsWith(' ')) {
      emailValid = false
      validationError.email = 'cannot begin or end with spaces'
    } else if (!email.length) {
      emailValid = false
      validationError.email = 'is required'
    } else if (!/\S+@\S+/.test(email)) {
      emailValid = false
      validationError.email = 'invalid format'
    }

    this.setState({emailValid, validationError}, this.validateForm)
  }

  validatePassword = () => {
    let passwordValid = true
    const validationError = {...this.state.validationError}
    const {password} = this.state

    if (password.startsWith(' ') || password.endsWith(' ')) {
      passwordValid = false
      validationError.password = 'cannot begin or end with spaces'
    } else if (password.length < 6 || password.length > 72) {
      passwordValid = false
      validationError.password = 'must be between 6 and 72 characters'
    }

    this.setState({passwordValid, validationError}, this.validateForm)
  }

  render() {
    const {validationError, username_valid, emailValid, passwordValid, formValid} = this.state

    return (
      <form className='js-registration-form' action='#' onSubmit={this.handleSubmit}>
        <div className='error-msg'>{this.state.error}</div>

        <div className='form-group'>
          <label htmlFor='full_name'>Username</label>
          < Validator isValid={username_valid} msg={validationError.full_name} />
          <input type='text' id='full_name' name='full_name' value={this.state.full_name} onChange={this.handleChange} onBlur={this.validateFullName}/>
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          < Validator isValid={emailValid} msg={validationError.email} />
          <input type='text' id='email' name='email' value={this.state.email} onChange={this.handleChange} onBlur={this.validateEmail}  />
        </div>

        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          < Validator isValid={passwordValid} msg={validationError.password} />
          <input type='password' id='password' name='password' value={this.state.password} onChange={this.handleChange}/>
        </div>

        <div className='form-controls'>
          <button disabled={!formValid} type='submit' className='button full outline'>Create Account</button>
        </div>
      </form>
    )
  }
}

// export default RegistrationForm;

export default withAppContext(RegistrationForm);