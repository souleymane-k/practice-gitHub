import React, {Component} from 'react';
//import './LoginForm.css';
import AuthContext from './contexts/AuthContext.js.js'
import AuthApiService from './services/auth-api-service'
import { withAppContext } from './contexts/AppContext';

  
class LoginForm extends Component {
  static contextType = AuthContext

  state = {
    error: null,
    email: '',
    password: ''
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({error: null})
    const {setLoading} = this.props.appContext
    try {
      setLoading(true)
      const {email, password} = this.state;
      const response = await AuthApiService.login(email, password)
      setLoading(false)

      this.context.login(response.authToken)
      this.context.setCurrentUser(response.user)
    } catch(err) {
      this.setState({error: err.message}, setLoading(false))
    }
  }

  componentWillUnmount() {
    this.setState({error: null})
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    })
  }
    
  render() {
    return (
      <form className='js-login-form' action='#' onSubmit={(e) => this.handleSubmit(e)}>
        <div className='error-msg'>{this.state.error}</div>

        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input id='email' name='email' type='text' value={this.state.email} onChange={this.handleChange}/>
        </div>

        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input id='password' name='password' type='password' value={this.state.password} onChange={this.handleChange}/>
        </div>

        <div className='form-controls'>
          <button className='button full outline' type='submit'>Login</button>
        </div>
      </form>
    )
  }
}

export default withAppContext(LoginForm);