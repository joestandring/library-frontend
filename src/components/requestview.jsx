import React from 'react';
import { Typography, Comment, Avatar, message, Popconfirm, Button } from 'antd';
import ApiConf from '../apiconf';
import { status, json } from '../utilities/requestHandlers';
import UserContext from '../contexts/user';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

const { Title, Paragraph } = Typography;

class RequestView extends React.Component {
  static contextType = UserContext;
  
  constructor(props) {
    super(props);
    this.state = {
      request: [],
      bookInfo: [],
      userInfo: [],
      bookOwner: []
    }
    
    this.delete = this.delete.bind(this);
    this.accept = this.accept.bind(this);
    this.makeBookUnavailable = this.makeBookUnavailable.bind(this);
  }

  componentDidMount() {
    const username = this.context.user.username;
    const password = this.context.user.password
    
    fetch(ApiConf.host + '/requests/' + this.props.match.params.id, {
      headers: {
        "Authorization": "Basic " + btoa(username + ":" + password)
      }
    })
    .then(status)
    .then(json)
    .then(data => {
      this.setState({ request: data });
      this.getBook();
    })
    .catch(err => console.error('Error fetching request', err));
  }
  
  getBook() {    
    fetch(ApiConf.host + `/books/${this.state.request.bookID}`)
    .then(status)
    .then(json)
    .then(data => {
      this.setState({ bookInfo: data });
      this.getUser();
    })
    .catch(err => console.error(`Error fetching for book ${this.state.request.bookID}`, err));
  }
  
  getUser() {
    const username = this.context.user.username;
    const password = this.context.user.password
    
    fetch(ApiConf.host + '/users/' + this.state.request.userID, {
      headers: {
        "Authorization": "Basic " + btoa(username + ":" + password)
      }
    })
    .then(status)
    .then(json)
    .then(data => {
      this.setState({ userInfo: data });
      this.getOwner();
    })
    .catch(err => console.error(`Error fetching for user ${this.state.request.userID}`, err));
  }
  
  getOwner() {
    const username = this.context.user.username;
    const password = this.context.user.password
    
    fetch(ApiConf.host + '/users/' + this.state.bookInfo.ownerID, {
      headers: {
        "Authorization": "Basic " + btoa(username + ":" + password)
      }
    })
    .then(status)
    .then(json)
    .then(data => {
      this.setState({ bookOwner: data });
    })
    .catch(err => console.error(`Error fetching for user ${this.state.bookInfo.ownerID}`, err));
  }
  
  delete() {
    const username = this.context.user.username;
    const password = this.context.user.password;
        
    fetch(ApiConf.host + '/requests/' + this.state.request.ID, {
      method: 'DELETE',
      headers: {
        "Authorization": "Basic " + btoa(username + ":" + password)
      }
    })
    .then(status)
    .then(json)
    .then(data => {
      message.success('Request deleted');
      this.props.history.push('/requests');
    })
    .catch(err => {
      message.error('Request deletion failed');
      console.log(err);
    })
  }
  
  accept() {
    const username = this.context.user.username;
    const password = this.context.user.password;

    fetch(ApiConf.host + '/requests/' + this.state.request.ID, {
      method: 'PUT',
      body: JSON.stringify({ 'accepted': 1 }),
      headers: {
        "Authorization": "Basic " + btoa(username + ":" + password),
        "Content-Type": "application/json"
      }
    })
    .then(status)
    .then(json)
    .then(data => {
      message.success('Request accepted');
      this.makeBookUnavailable();
    })
    .catch(err => {
      message.error('Request accept failed');
      console.log(err);
    })
  }
  
  makeBookUnavailable() {
    const username = this.context.user.username;
    const password = this.context.user.password;
    
    fetch(ApiConf.host + '/books/' + this.state.bookInfo.ID, {
      method: 'PUT',
      body: JSON.stringify({ 'available': 0 }),
      headers: {
        "Authorization": "Basic " + btoa(username + ":" + password),
        "Content-Type": "application/json"
      }
    })
    .then(status)
    .then(json)
    .then(data => {
      message.success('Book marked unavailable');
    })
    .catch(err => {
      console.error(err);
    })
  }
  
  render() {
    let accepted;
    if (this.state.request.accepted === 0) {
      accepted = (
        <Paragraph type="danger" strong>This request has yet to be accepted</Paragraph>
      );
    } else {
      accepted = (
        <Paragraph type="success" strong>This request has been accepted!</Paragraph>
      )
    }
    
    let button;
    if (this.context.user.username === this.state.bookOwner.username) {
      if (this.state.request.accepted === 0) {
        button = (
          <Popconfirm
            title="Are you sure you want to accept this request?"
            onConfirm={ this.accept }
            okText="Yes, accept this request"
            cancelText="Never mind"
          >
            <Button type="primary">
              Accept request
            </Button>
          </Popconfirm>
        );
      } else {
        button = (
          <Button disabled>
            Request accepted
          </Button>
        );
      }
    } else {
      button = (
        <Popconfirm
          title="Are you sure you want to delete this request?"
          onConfirm={ this.delete }
          okText="Yes, delete this request"
          cancelText="Never mind"
        >
          <Button danger>
            Delete request
          </Button>
        </Popconfirm>
      );
    }
    
    return(
      <div style={ { padding: '2% 10%' } }>
        <div style={ { textAlign: "center" } }>
          <Title>Request for: { this.state.bookInfo.title }</Title>
        </div>
        <div style={ { backgroundColor: "white", paddingLeft: "10px" } }>
          <Comment
            author={
              <>
                <Paragraph>
                  <Link to={ "/users/" + this.state.userInfo.ID }>
                    { this.state.userInfo.username + ' '}
                  </Link>
                  ➜
                  <Link to={ "/users/" + this.state.bookOwner.ID }>
                    { ' ' + this.state.bookOwner.username}
                  </Link>
                </Paragraph>
              </>
            }
            avatar={
              <Link to={ "/users/" + this.state.userInfo.ID }>
                <Avatar
                  src={ this.state.userInfo.avatar }
                />
              </Link>
            }
            content={
              <Paragraph>{ this.state.request.message }</Paragraph>
            }
          />
        </div>
        <div style={ { textAlign: "center", margin: "10px" } }>
          { accepted }
          { button }
        </div>
      </div>
    )
  }
}

export default withRouter(RequestView);