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
      books: [],
      incoming: []
    }
    
    this.getUserBooks = this.getUserBooks.bind(this);
    this.getIncoming = this.getIncoming.bind(this);
  }

  // Triggered when React loads virtual DOM. Gets outgoing and incoming requests
  componentDidMount() {
    const id = this.context.user.ID;
    const username = this.context.user.username;
    const password = this.context.user.password;
    
    fetch(ApiConf.host + '/requests/user/' + id, {
      headers: {
        "Authorization": "Basic " + btoa(username + ":" + password)
      }
    })
    .then(status)
    .then(json)
    .then(data => {
      this.setState({ outgoing: data });
      this.getUserBooks();
    })
    .catch(err => console.error('Error fetching outbound requests', err));
  }
  
  // Triggered when React loads virtual DOM.
  getUserBooks() {
    const id = this.context.user.ID;
    
    fetch(ApiConf.host + '/books/user/' + id )
    .then(status)
    .then(json)
    .then(data => {
      this.setState({ books: data });
      this.getIncoming();
    })
    .catch(err => console.error("Error fetching books", err));
  }
  
  getIncoming() {
    const username = this.context.user.username;
    const password = this.context.user.password
    
    console.log(this.state.books);
    for (let i = 0; i < this.state.books.length; i += 1) {
      fetch(ApiConf.host + '/requests/book/' + this.state.books[i].ID, {
        headers: {
          "Authorization": "Basic " + btoa(username + ":" + password)
        }
      })
      .then(status)
      .then(json)
      .then(data => {
        this.setState({ incoming: this.state.incoming.concat(data) });
      })
      .catch(err => console.error("No requests for book", err))
    }
  }
  
  render() {
    if (!this.state.books) {
      return <Spin />
    }
    
    /**
     * Card containing a single outgoing book request
     * @returns {string} JSX for the card
     */
    const outgoing = this.state.outgoing.map(request => {
      return(
        <RequestCard { ...request } />
      );
    });
    
    /**
     * Card containing a single incoming book request
     * @returns {string} JSX for the card
     */
    const incoming = this.state.incoming.map(request => {
      return(
        <RequestCard { ...request } />
      );
    });
    
    return(
      <>
        <div style={ { padding: '2% 10%', textAlign: 'center' } }>
          <Title>Your book requests</Title>
          <Title level={ 2 }>Not yet accepted</Title>
          <div style={ { padding: "10px" } }>
            <Row type="flex" justify="space-around">
              { outgoing }
            </Row>
          </div>
          <Title level={ 2 }>Incoming requests</Title>
          <div style={ { padding: "10px" } }>
            <Row type="flex" justify="space-around">
              { incoming }
            </Row>
          </div>
        </div>
      </>
    );
  }
}

/** Export the component to be rendered in App.jsx */
export default Requests;
