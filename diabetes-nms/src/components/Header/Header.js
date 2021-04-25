import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

class Header extends Component {
    render() {
  return (
    <div className='headerContainer'>
        <div className="navButton">
      <div className="mainTilte">
        <Link to='/'className='headerLink'><h2>Diabetes Managing System</h2></Link>
      </div>
      <div className='logInForm'>
          <Link to ='/LogInForm' className='logInForm' > Log In</Link>
      </div>
      <div className='signUpForm'>
          <Link to ='/SignUpForm' className='signUpForm' >Register</Link>
      </div>
      <div className='result'>
          <Link to ='/' className='signUpForm' >DEMO Page</Link>
      </div>
      </div>
    </div>
  );
}
}
 export default Header;