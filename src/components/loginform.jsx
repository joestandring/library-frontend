/**
 * Displays a login form to send login data to api
 * @module src/components/loginform
 * @author Joe Standring
 * @see src/components/login.jsx for where this module is imported
 */

import React from 'react'
import { message, Form, Input, Button } from 'antd';
import ApiConf from '../apiconf';
import { status, json } from '../utilities/requestHandlers';
import UserContext from '../contexts/user';
import { withRouter } from 'react-router-dom';

const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 12 } },
};

const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 12, offset: 6 } },
};

// Form validation rules
const usernameRules = [
  { required: true, message: 'Please input a username' },
  { whitespace: true },
];

const passwordRules = [
  { required: true, message: 'Please input a password' },
  { whitespace: true },
];

/**
 * Display contents of the loginForm component
 * @returns {string} The HTML code to display elements
 */
class LoginForm extends React.Component {
  static contextType = UserContext;
  
  constructor(props) {
    super(props);
    // Bind the onFinish method to this class
    this.login = this.login.bind(this);
  }
    
  login(values) {
    const { username, password } = values;
    console.log(`logging in user: ${username}`)
    fetch(ApiConf.host + '/users/login', {
      method: 'POST',
      headers: {
        "Authorization": "Basic " + btoa(username + ":" + password)
      },
    })
    .then(status)
    .then(json)
    .then(user => {
      console.log('Login successful');
      console.log(user);
      this.context.login(user, password);
      message.success('Logged in successfully')
      this.props.history.push('/');
    })
    .catch(error => {
      message.error('Login failed')
      console.error(error);
    })
  }
  
  render() {
    return(
      <Form
        { ...formItemLayout }
        name="login"
        onFinish={ this.login }
        scrollToFirstError
      >
        <Form.Item
          label="Username"
          name="username"
          rules={ usernameRules }
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          label="Password"
          name="password"
          rules={ passwordRules }
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item { ...tailFormItemLayout }>
          <Button type="primary" htmlType="submit">
            Log in
          </Button>
        </Form.Item>
      </Form>
    );
  };
};

/** Export the component to be rendered in login.jsx */
export default withRouter(LoginForm);
