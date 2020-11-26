/**
 * Page containing components related to the user's account
 * @module src/components/accountedit
 * @author Joe Standring
 * @see src/App.jsx for where this module is imported
 */

import React from 'react';
import { Avatar, Typography, Form, Button, Spin, Input } from 'antd';
import UserOutlined from '@ant-design/icons/UserOutlined';
import ApiConf from '../apiconf';
import { status, json } from '../utilities/requestHandlers'
import UserContext from '../contexts/user';
import MaskedInput from 'antd-mask-input';
import { withRouter } from 'react-router-dom';

const { Title } = Typography;

const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 12 } },
};

const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 12, offset: 6 } },
};

// Form validation rules
const emailRules = [
  { type: 'email', message: 'Please input a valid email address' }
];

const postcodeRules = [
  { pattern: /[A-Z][A-Z][0-9] [0-9][A-Z][A-Z]/, message: 'Please input a valid postcode (e.g. LO1 1AA)' }
];

/**
 * Display contents of the AccountEdit page
 * @returns {string} The HTML code to display elements
 */
class AccountEdit extends React.Component {
  static contextType = UserContext;
  
  // Initialize the state account information will be stored in
  constructor(props) {
    super(props);
    this.state = {
      accountInfo: []
    }
  }
  
  // Triggered when React loads virtual DOM.
  componentDidMount() {
    const username = this.context.user.username;
    const password = this.context.user.password;
    
    fetch(ApiConf.host + `/users/${username}`, {
      headers: {
        "Authorization": "Basic " + btoa(username + ":" + password)
      },
    })
    .then(status)
    .then(json)
    .then(data => {
      this.setState({ accountInfo: data })
    })
    .catch(err => console.error(`Error fetching for user ${username}`, err));
    
  }
  
  /**
   * Sends modified fields in PUT request
   * @param {object} values The values of the form
   */
  onFinish = (values) => {
    const username = this.context.user.username;
    const password = this.context.user.password;
    
    const keys = Object.keys(values);
    
    if(values.address2 == null) {
      delete values.address2;
      keys.splice(keys.indexOf('address2'), 1);
    }
    if(values.address3 == null) {
      delete values.address3;
      keys.splice(keys.indexOf('address3'), 1);
    }
        
    // Change empty values to those stored in state
    for (let i = 0; i < keys.length; i++) {
      if (values[keys[i]] == null) {
        values[keys[i]] = this.state.accountInfo[keys[i]];
      }
    }
    
    if(values.password == null) {
      values.password = password;
    }
        
    fetch(ApiConf.host + '/users/' + this.state.accountInfo.ID, {
      method: 'PUT',
      body: JSON.stringify(values),
      headers: {
        "Authorization": "Basic " + btoa(username + ":" + password),
        "Content-Type": "application/json"
      }
    })
    .then(status)
    .then(json)
    .then(values => {
      this.props.history.push('/account');
    })
    .catch(error => {
      console.log(error);
    })
  }
  
  render() {
    if (!this.state.accountInfo) {
      return <Spin />
    }
    
    const accountInfo = this.state.accountInfo;
    console.log(accountInfo);

    return(
      <>
        <div style={ { padding: '2% 10%', textAlign: 'center' } }>       
          <UserContext.Consumer>
            {({user}) => (
              <>
                <Avatar size={ 128 } icon={ <UserOutlined /> } />
                <Title level={ 4 }>{ user.username }</Title>
              </>
            )}
          </UserContext.Consumer>

          <Form
            { ...formItemLayout }
            name="update"
            onFinish={ this.onFinish }
            scrollToFirstError
          >
            <Form.Item
              label="Username"
              name="username"
            >
              <Input placeholder={ accountInfo.username } defaultValue={ accountInfo.username } />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={ emailRules }
            >
              <Input placeholder={ accountInfo.email } />
            </Form.Item>
            
            <Form.Item
              label="Password"
              name="password"
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="First Name"
              name="firstName"
            >
              <Input placeholder={ accountInfo.firstName } />
            </Form.Item>

            <Form.Item
              label="Last Name"
              name="lastName"
            >
              <Input placeholder={ accountInfo.lastName } />
            </Form.Item>

            <Form.Item
              label="Address Line 1"
              name="address1"
            >
              <Input placeholder={ accountInfo.address1 } />
            </Form.Item>

            <Form.Item
              label="Address Line 2"
              name="address2"
            >
              <Input placeholder={ accountInfo.address2 } />
            </Form.Item>

            <Form.Item
              label="Address Line 3"
              name="address3"
            >
              <Input placeholder={ accountInfo.address3 } />
            </Form.Item>

            <Form.Item
              label="City"
              name="city"
            >
              <Input placeholder={ accountInfo.city } />
            </Form.Item>

            <Form.Item
              label="Postcode"
              name="postcode"
              rules={ postcodeRules }
            >
              <MaskedInput mask="AA1 1AA" name="postcode" onChange={ this.onChange } placeholder={ accountInfo.postcode }/>
            </Form.Item>

            <Form.Item { ...tailFormItemLayout }>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Form.Item>
          </Form>
        </div>
      </>
    );
  }
}

/** Export the component to be rendered in App.jsx */
export default withRouter(AccountEdit);
