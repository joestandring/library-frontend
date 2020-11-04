/**
 * Displays a sign up form
 * @module src/components/signupform
 * @author Joe Standring
 * @see src/components/login.jsx for where this module is imported
 */

import React from 'react'
import { Form, Input, Button } from 'antd';

const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 12 } },
};

/**
 * Display contents of the SignInForm component
 * @returns {string} The HTML code to display elements
 */
class SignUpForm extends React.Component {
  render(){
    return(
      <>
        <Form
          { ...formItemLayout }
          name="signup"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={ [ { required: true, message: 'Cannot leave username empty' } ] }
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={ [ { required: true, message: 'Cannot leave email empty' } ] }
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={ [ { required: true, message: 'Cannot leave password empty' } ] }
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="First Name"
            name="firstName"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Address Line 1"
            name="address1"
            rules={ [ { required: true, message: 'Cannot leave last name empty' } ] }
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Address Line 2"
            name="address2"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Address Line 3"
            name="address3"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="City"
            name="city"
            rules={ [ { required: true, message: 'Cannot leave city empty' } ] }
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Postcode"
            name="postcode"
            rules={ [ { required: true, message: 'Cannot leave postcode' } ] }
          >
            <Input />
          </Form.Item>
        </Form>

        <Button type="primary" htmlType="submit">
          Create account
        </Button>
      </>
    );
  }
}

/** Export the component to be rendered in login.jsx */
export default SignUpForm;
