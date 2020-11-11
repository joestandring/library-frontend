/**
 * Displays a sign up form to send data to api
 * @module src/components/signupform
 * @author Joe Standring
 * @see src/components/login.jsx for where this module is imported
 */

import React from 'react'
import { Form, Input, Button } from 'antd';
// Used to create input masks for values (postcode)
import MaskedInput from 'antd-mask-input';
import ApiConf from '../apiconf';
import { status, json } from '../utilities/requestHandlers'

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

const emailRules = [
  { required: true, message: 'Please input an email address' },
  { type: 'email', message: 'Please input a valid email address' },
  { whitespace: true },
];

const passwordRules = [
  { required: true, message: 'Please input a password' },
  { whitespace: true },
];

// Check password and confirm match
const confirmRules = [
  { required: true, message: 'Please confirm your password' },
  { whitespace: true },
  /**
   * Check the password and confirm fields match
   * @param {object} rule The rule this function is a part offset
   * @param {string} value The current value of the components
   * @return {Promise} Resolves or rejects the input with a message
   */
  ({ getFieldValue }) => ({
    validator(rule, value) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve();
      }
      return Promise.reject('Please ensure your passwords match');
    }
  }),
];

const noWhitespace = [
  { whitespace: true },
];

const addressRules = [
  { required: true, message: 'Please input an address' },
  { whitespace: true },
];

const cityRules = [
  { required: true, message: 'Please input a city' },
  { whitespace: true },
];

const postcodeRules = [
  { required: true, message: 'Please input a postcode' },
  { pattern: /[A-Z][A-Z][0-9] [0-9][A-Z][A-Z]/, message: 'Please input a valid postcode (e.g. LO1 1AA)' },
  { whitespace: true },
];

/**
 * Display contents of the SignInForm component
 * @returns {string} The HTML code to display elements
 */
class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    // Bind the onFinish method to this class
    this.onFinish = this.onFinish.bind(this);
  }
  
  /**
   * Sends data in the form component to the API
   * @param {object} values The data to be sent
   */
  onFinish = (values) => {
    // Ignore confirm value
    const{ confirm, ...data } = values;
    // Attempt to POST the data in JSON format
    fetch(ApiConf.host + '/users', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    // Check if reponse successful
    .then(status)
    // Convert to JSON
    .then(json)
    // POST the data
    .then(data => {
      console.log(data);
      alert('User added, please sign in');
      // Return to home page
    })
    // Return an error in JSON if failed
    .catch(error => {
      alert(`Error:${JSON.stringify(error)}`);
    });
  }
  
  /**
   * Changes the state of the components value to the new value
   * @param e The component whos value will be changed
   */
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  
  render() {
    return(
      <Form
        { ...formItemLayout }
        name="signup"
        onFinish={ this.onFinish }
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
          label="Email"
          name="email"
          rules={ emailRules }
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
        
        <Form.Item
          label="Confirm password"
          dependencies={ ['password'] }
          name="confirm"
          rules={ confirmRules }
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="First Name"
          name="firstName"
          rules={ noWhitespace }
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={ noWhitespace }
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Address Line 1"
          name="address1"
          rules={ addressRules }
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Address Line 2"
          name="address2"
          rules={ noWhitespace }
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Address Line 3"
          name="address3"
          rules={ noWhitespace }
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="City"
          name="city"
          rules={ cityRules }
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Postcode"
          name="postcode"
          rules={ postcodeRules }
        >
          <MaskedInput mask="AA1 1AA" name="postcode" onChange={ this.onChange } />
        </Form.Item>

        <Form.Item { ...tailFormItemLayout }>
          <Button type="primary" htmlType="submit">
            Create account
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

/** Export the component to be rendered in login.jsx */
export default SignUpForm;
