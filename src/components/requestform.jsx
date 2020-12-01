import React from 'react';
import { Typography, Comment, Avatar, Input, Form, Button, message } from 'antd';
import ApiConf from '../apiconf';
import { status, json } from '../utilities/requestHandlers';
import UserContext from '../contexts/user';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import UserOutlined from '@ant-design/icons/UserOutlined';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

class RequestForm extends React.Component {
  static contextType = UserContext;
  
  constructor(props) {
    super(props);
    this.state = {
      bookInfo: [],
      bookOwner: []
    }
    
    this.onFinish = this.onFinish.bind(this);
  }
  
  componentDidMount() {  
    const id = this.props.match.params.id;
    
    fetch(ApiConf.host + `/books/${id}`)
    .then(status)
    .then(json)
    .then(data => {
      this.setState({ bookInfo: data })
      this.getOwner();
    })
    .catch(err => console.error(`Error fetching for book ${id}`, err));
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
  
  onFinish = (values) => {
    const username = this.context.user.username;
    const password = this.context.user.password;
    
    console.log(values);
    values.bookID = this.state.bookInfo.ID;
    
    // Attempt to POST the data in JSON format
    fetch(ApiConf.host + '/requests/', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        "Authorization": "Basic " + btoa(username + ":" + password),
        "Content-Type": "application/json"
      },
    })
    // Check if reponse successful
    .then(status)
    // Convert to JSON
    .then(json)
    // POST the data
    .then(data => {
      console.log(data);
      message.success('Request made')
      this.props.history.push('/requests');
    })
    // Return an error in JSON if failed
    .catch(error => {
      message.error('Request creation failed');
      console.log(error);
    });
  }
  
  render() {
    return(
      <div style={ { padding: '2% 10%' } }>
        <div style={ { textAlign: "center" } }>
          <Title>Request for: { this.state.bookInfo.title }</Title>
        </div>
        <div style={ { backgroundColor: "white", paddingLeft: "10px", paddingRight: "10px" } }>
          <Comment
            author={
              <>
                <Paragraph>
                  <Link to={ "/users/" + this.context.user.ID }>
                    { this.context.user.username + ' '}
                  </Link>
                  ➜
                  <Link to={ "/users/" + this.state.bookOwner.ID }>
                    { ' ' + this.state.bookOwner.username}
                  </Link>
                </Paragraph>
              </>
            }
            avatar={
              <Link to={ "/users/" + this.context.user.ID }>
                <Avatar
                  icon=<UserOutlined />
                />
              </Link>
            }
            content={
              <Form
                name="request"
                onFinish={ this.onFinish }
              >
                <Form.Item
                  name="message"
                >
                  <TextArea placeholder="Input message here" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Send request
                  </Button>
                </Form.Item>
              </Form>
            }
          />
        </div>
      </div>
    );
  }
}

export default withRouter(RequestForm);