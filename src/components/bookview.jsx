/**
 * Page containing components related to a single book
 * @module src/components/bookview
 * @author Joe Standring
 * @see src/App.jsx for where this module is imported
 */

import React from 'react';
import { Image, Typography, Row, Col, Button, List, Space, Avatar, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import UserOutlined from '@ant-design/icons/UserOutlined';
import ArrowLeftOutlined from '@ant-design/icons/ArrowLeftOutlined';
import ApiConf from '../apiconf';
import { status, json } from '../utilities/requestHandlers'
import UserContext from '../contexts/user';

const { Title, Paragraph } = Typography;

/**
 * Display contents of the bookview page
 * @returns {string} The HTML code to display elements
 */
class BookView extends React.Component {  
  static contextType = UserContext;
  
  // Initialize the state book information will be stored in
  constructor(props) {
    super(props);
    this.state = {
      bookInfo: [],
      ownerInfo: []
    }
  }
  
  // Triggered when React loads virtual DOM.
  componentDidMount() {  
    const id = this.props.match.params.id;
    
    fetch(ApiConf.host + `/books/${id}`)
    .then(status)
    .then(json)
    .then(data => {
      this.setState({ bookInfo: data })
      this.getOwnerInfo();
    })
    .catch(err => console.error(`Error fetching for book ${id}`, err));
  }
  
  // Gets the book owner's data. Used for linking to owner's account
  getOwnerInfo() {
    const username = this.context.user.username;
    const password = this.context.user.password;
    
    fetch(ApiConf.host + '/users/' + this.state.bookInfo.ownerID, {
      headers: {
        "Authorization": "Basic " + btoa(username + ":" + password)
      },
    })
    .then(status)
    .then(json)
    .then(data => {
      this.setState({ ownerInfo: data })
    })
    .catch(err => console.error(`Error fetching for user ${this.state.bookInfo.ownerID}`, err));
  }
  
  render() {
    if (!this.state.bookInfo) {
      return <Spin />
    }
    
    const bookInfo = this.state.bookInfo;
    const ownerInfo = this.state.ownerInfo;
    const loggedIn = this.context.user.loggedIn;
    
    const listItems = [
      {
        title: 'Description',
        description: bookInfo.summary,
      },
      {
        title: 'ISBN',
        description: bookInfo.isbn,
      },
      {
        title: 'Author',
        description: bookInfo.authorFirst + " " + bookInfo.authorLast,
      },
      {
        title: 'Genre',
        description: bookInfo.genre,
      },
      {
        title: 'Publisher',
        description: bookInfo.publisher,
      },
      {
        title: 'Year',
        description: bookInfo.publishYear,
      },
    ];
        
    let userArea;
    if (!loggedIn) {
      userArea = (
        <>
          <Paragraph><Link to="/login">Log in</Link> to view and contact this book's owner</Paragraph>
        </>
      );
    } else {
      if (ownerInfo.username !== this.context.user.username) {
        let buttonText;
        let disabled;
        if (bookInfo.available === 1) {
          buttonText = 'Request this book';
        } else {
          buttonText = 'Unavailable';
          disabled = true;
        }
        
        userArea = (
          <>
            <Space direction="vertical">
              <Link to={ "/users/" + bookInfo.ownerID }>
                <Button size="large" style={ { width: "100%" } }>
                  <Space>
                    <Avatar size="small" icon={ <UserOutlined /> } />
                    { ownerInfo.username }
                  </Space>
                </Button>
              </Link>

              <Row justify="center">
                <Button type="primary" disabled={ disabled }>
                  <Link to={ "/books/" + bookInfo.ID + "/request" }>
                    { buttonText }
                  </Link>
                </Button>
              </Row>
            </Space>
          </>
        );
      } else {
        userArea = (
          <>
            <Space direction="vertical">
              <Link to={ "/users/" + bookInfo.ownerID }>
                <Button size="large" style={ { width: "100%" } }>
                  <Space>
                    <Avatar size="small" icon={ <UserOutlined /> } />
                    Me
                  </Space>
                </Button>
              </Link>

              <Row justify="center">
                <Button type="primary">
                  <Link to={ "/books/" + this.props.match.params.id + "/edit" }>
                    Edit book
                  </Link>
                </Button>
              </Row>
            </Space>
          </>
        );
      }
    }

    return(
      <>
        <div style={ { padding: '2% 5%' } }>
          <Row gutter={ 32 }>
            <Col>
              <Image
                src={ bookInfo.imgLink }
              />
            </Col>

            <Col flex="auto">
              <Row>
                <Col flex="auto">
                  <Title>{ bookInfo.title }</Title>
                  <Title level={ 5 } type="secondary">{ bookInfo.authorFirst + " " + bookInfo.authorLast }</Title>
                </Col>

                <Col>
                  <Link to="/books">
                    <Button type="primary" size="large">
                      <ArrowLeftOutlined />Back
                    </Button>
                  </Link>
                </Col>
              </Row>

              <Row gutter={ 16 }>
                <Col flex="auto">
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
                      </List.Item>
                    )}
                  />
                </Col>

                <Col>
                  { userArea }
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

/** Export the component to be rendered in App.jsx */
export default withRouter(BookView);
