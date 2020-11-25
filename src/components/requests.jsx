/**
 * Page containing incoming and outgoing book requests
 * @module src/components/account
 * @author Joe Standring
 * @see src/App.jsx for where this module is imported
 */

import React from 'react';
import { Typography, Spin } from 'antd';
import UserContext from '../contexts/user';
import ApiConf from '../apiconf';
import { status, json } from '../utilities/requestHandlers'

const { Title } = Typography;

/**
 * Display contents of the Account page
 * @returns {string} The HTML code to display elements
 */
class Requests extends React.Component {
  static contextType = UserContext;
  
  // Initialize the states request information will be stored in
  constructor(props) {
    super(props);
    this.state = {
      outgoing: []
    }
  }

  // Triggered when React loads virtual DOM. Gets outgoing and incoming requests
  componentDidMount() {
    const id = this.context.user.ID;
    const username = this.context.user.username;
    const password = this.context.user.password
    
    fetch(ApiConf.host + '/requests/user/' + id, {
      headers: {
        "Authorization": "Basic " + btoa(username + ":" + password)
      }
    })
    .then(status)
    .then(json)
    .then(data => {
      this.setState({ outgoing: data });
    })
    .catch(err => console.error('Error fetching outbound requests', err));
  }
  
  getBookInfo(bookID) {
    fetch(ApiConf.host + '/books/' + bookID)
    .then(status)
    .then(json)
    .then(data => {
      return data;
    })
  }
  
  render() {
    if (!this.state.outgoing) {
      return <Spin />
    }
    
    return(
      <>
        <div style={ { padding: '2% 20%', textAlign: 'center' } }>
          <Title>Your book requests</Title>
        </div>
      </>
    );
  }
}

/** Export the component to be rendered in App.jsx */
export default Requests;
