/**
 * The user are in the header containing controls for the current user
 * @module src/components/userarea
 * @author Joe Standring
 * @see src/components/headercontent.jsx for where this module is imported
 */

import React from 'react';
import { Row, Col, Typography, Avatar, Spin } from 'antd';
import { Link } from 'react-router-dom';
import UserContext from '../contexts/user';
import ApiConf from '../apiconf';
import { status, json } from '../utilities/requestHandlers'

const { Paragraph } = Typography;

/**
 * Display contents of the userarea component
 * @returns {string} The HTML code to display elements
 */
class UserArea extends React.Component {
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
    
    const id = this.context.user.ID;
    
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
    if (Object.keys(this.state.userInfo).length === 0) {
      return <Spin />
    } else {
      console.log(this.state.userInfo);
      return(
        <>
          <Row gutter={ 8 }>
            <Col>
              <Paragraph style={ { color: "white" } }>{ this.context.user.username }</Paragraph>
            </Col>

            <Col>
              <Link to="/account">
                <Avatar 
                  size="large"
                  src={ this.state.userInfo.avatar }
                />
              </Link>
            </Col>
          </Row>
        </>
      );
    }
  }
}

/** Export the component to be rendered in headercontent.jsx */
export default UserArea;
