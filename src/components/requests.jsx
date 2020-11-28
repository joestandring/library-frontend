/**
 * Page containing incoming and outgoing book requests
 * @module src/components/account
 * @author Joe Standring
 * @see src/App.jsx for where this module is imported
 */

import React from 'react';
import { Typography, Spin, Row } from 'antd';
import UserContext from '../contexts/user';
import ApiConf from '../apiconf';
import { status, json } from '../utilities/requestHandlers';
import RequestCard from './requestcard';

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
      outgoing: [],
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
  
  render() {
    if (!this.state.outgoing) {
      return <Spin />
    }
        
    /**
     * Card containing a single outgoing book request
     * @returns {string} JSX for the card
     */
    const messages = this.state.outgoing.map(request => {
      return(
        <RequestCard { ...request } />
      );
    });
    
    return(
      <>
        <div style={ { padding: '2% 10%', textAlign: 'center' } }>
          <Title>Your book requests</Title>
          <Title level={ 2 }>Outgoing</Title>
          <div style={ { padding: "10px" } }>
            <Row type="flex" justify="space-around">
              { messages }
            </Row>
          </div>
        </div>
      </>
    );
  }
}

/** Export the component to be rendered in App.jsx */
export default Requests;
