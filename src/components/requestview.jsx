import React from 'react';
import { Typography, Comment, Avatar } from 'antd';
import ApiConf from '../apiconf';
import { status, json } from '../utilities/requestHandlers';
import UserContext from '../contexts/user';
import { withRouter } from 'react-router';
import UserOutlined from '@ant-design/icons/UserOutlined';
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
  
  render() {
    let accepted;
    if (this.state.request.accepted === 0) {
      accepted = (
        <Paragraph strong>This request has yet to be accepted</Paragraph>
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
                  icon=<UserOutlined />
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
        </div>
      </div>
    )
  }
}

export default withRouter(RequestView);