/**
 * Page containing components related to a user
 * @module src/components/user
 * @author Joe Standring
 * @see src/App.jsx for where this module is imported
 * @see src/components/bookgrid for the component to display book cards
 */

import React from 'react';
import { Avatar, Typography, Space } from 'antd';
import UserOutlined from '@ant-design/icons/UserOutlined';
import BookGridUser from './bookgriduser.jsx'
import ApiConf from '../apiconf';
import { status, json } from '../utilities/requestHandlers'
import UserContext from '../contexts/user';
import { withRouter } from 'react-router';

const { Title } = Typography;

/**
 * Display contents of the user page
 * @returns {string} The HTML code to display elements
 */
class User extends React.Component {
  static contextType = UserContext;
  
  // Initialize the state user information will be stored in
  constructor(props) {
    super(props);
    this.state = {
      userInfo: []
    }
  }
  
  // Triggered when React loads virtual DOM.
  componentDidMount() {  
    const username = this.context.user.username;
    const password = this.context.user.password;
    
    const id = this.props.match.params.id;
    
    fetch(ApiConf.host + `/users/${id}`, {
      headers: {
        "Authorization": "Basic " + btoa(username + ":" + password)
      },
    })
    .then(status)
    .then(json)
    .then(data => {
      this.setState({ userInfo: data })
    })
    .catch(err => console.error(`Error fetching for user ${this.state.userInfo.id}`, err));
  }
  
  render() {
    const userInfo = this.state.userInfo;
    
    return(
      <>
        <div style={ { padding: '2% 10%', textAlign: 'center' } }>
          <Space direction="vertical">
            <Avatar size={ 128 } icon={ <UserOutlined /> } />
            <Title level={ 4 }>{ userInfo.username }</Title>
            <Title level={ 2 }>Owned books</Title>
            <BookGridUser />
          </Space>
        </div>
      </>
    );
  }
}

/** Export the component to be rendered in App.jsx */
export default withRouter(User);
