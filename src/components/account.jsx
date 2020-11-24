/**
 * Page containing components related to the user's account
 * @module src/components/account
 * @author Joe Standring
 * @see src/App.jsx for where this module is imported
 */

import React from 'react';
import { Avatar, Typography, List, Button, Spin } from 'antd';
import UserOutlined from '@ant-design/icons/UserOutlined';
import ApiConf from '../apiconf';
import { status, json } from '../utilities/requestHandlers'
import UserContext from '../contexts/user';

const { Title } = Typography;

/**
 * Display contents of the Account page
 * @returns {string} The HTML code to display elements
 */
class Account extends React.Component {
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
  
  render() {
    if (!this.state.accountInfo) {
      return <Spin />
    }
    
    const accountInfo = this.state.accountInfo;
    console.log(accountInfo);
    
    if(accountInfo.address2 === null) {
      accountInfo.address2 = '';
    }
    
    if(accountInfo.address3 === null) {
      accountInfo.address3 = '';
    }
    
    const address = accountInfo.address1 + accountInfo.address2 + '\n' + accountInfo.address3 + '\n' + accountInfo.city + '\n' + accountInfo.postcode;
    
    const listItems = [
      {
        title: 'Username',
        description: accountInfo.username,
      },
      {
        title: 'Email',
        description: accountInfo.username,
      },
      {
        title: 'First Name',
        description: accountInfo.firstName,
      },
      {
        title: 'Last Name',
        description: accountInfo.lastName,
      },
      {
        title: 'Address',
        description: address,
      },
    ];
    
    return(
      <>
        <div style={ { padding: '2% 10%' } }>
          <div style={ { textAlign: 'center' } }>
            <UserContext.Consumer>
              {({user}) => (
                <>
                  <Avatar size={ 128 } icon={ <UserOutlined /> } />
                  <Title level={ 4 }>{ user.username }</Title>
                </>
              )}
            </UserContext.Consumer>
          </div>

          <List
            bordered
            size="small"
            dataSource={ listItems }
            renderItem={ item => (
              <List.Item>
                <List.Item.Meta
                  title={ item.title }
                  description={ item.description }
                />
                <div>
                  <Button type="primary">
                    Edit
                  </Button>
                </div>
              </List.Item>
            )}
          />
        </div>
      </>
    );
  }
}

/** Export the component to be rendered in App.jsx */
export default Account;
