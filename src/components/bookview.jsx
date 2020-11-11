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

const { Title } = Typography;

/**
 * Display contents of the bookview page
 * @returns {string} The HTML code to display elements
 */
class BookView extends React.Component {  
  // Initialize the state book information will be stored in
  constructor(props) {
    super(props);
    this.state = {
      bookInfo: []
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
    })
    .catch(err => console.error(`Error fetching for book ${id}`, err));
  }
  
  render() {
    if (!this.state.bookInfo) {
      return <Spin />
    }
    
    const bookInfo = this.state.bookInfo;
    
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
                  <Space direction="vertical">
                    <Link to="/user">
                      <Button size="large" style={ { width: "100%" } }>
                        <Space>
                          <Avatar size="small" icon={ <UserOutlined /> } />
                          { bookInfo.ownerID }
                        </Space>
                      </Button>
                    </Link>

                    <Row justify="center" gutter={ 16 }>
                      <Col>
                        <Button type="primary">
                          Available
                        </Button>
                      </Col>

                      <Col>
                        <Button type="primary">
                          Message
                        </Button>
                      </Col>
                    </Row>
                  </Space>
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
