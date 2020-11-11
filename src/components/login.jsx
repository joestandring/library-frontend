/**
 * Container for login and signup forms
 * @module src/components/login
 * @author Joe Standring
 * @see src/components/App.jsx for where this module is imported
 * @see src/components/signunform.jsx for the sign up form
 */

import React from 'react';
import { Typography, Radio } from 'antd';
import SignUpForm from './signupform';
import LoginForm from './loginform';

const { Title } = Typography;

let form;

/**
 * Display contents of the Login component
 * @returns {string} The HTML code to display elements
 */
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      radioValue: 'signup'
    }
  }
  
  /**
   * Changes the value of radioValue in the state
   * @param {object} event The event that called this function
   */
  handleChange = (event) => {
    this.setState({ radioValue: event.target.value });
  }
  
  render() { 
    // Display component depending on radio values
    if(this.state.radioValue === 'signup') {
      form = <SignUpForm />;
    } else {
      form = <LoginForm />;
    }
    
    return(
      <>
        <div style={ { padding: '2% 20%', textAlign: 'center' } }>
          <Title>Borrow one of thousands of free books on Public Library</Title>

          <Radio.Group defaultValue={ this.state.radioValue } onChange={ this.handleChange }>
            <Radio.Button value="signup">Sign up</Radio.Button>
            <Radio.Button value="login">Log in</Radio.Button>
          </Radio.Group>
          <div style={ { padding: "16px" } }>
            { form }
          </div>
        </div>
      </>
    );
  }
}

/** Export the component to be rendered in App.jsx */
export default Login;
