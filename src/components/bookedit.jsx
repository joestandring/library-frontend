/**
 * Form for editing book information
 * @module src/components/bookedit
 * @author Joe Standring
 */

import React from 'react';
import { withRouter } from 'react-router-dom';
import { Typography, Row, Col, Button, Form, Input, Radio } from 'antd';
import UserContext from '../contexts/user';
import ApiConf from '../apiconf';
import { status, json } from '../utilities/requestHandlers'

const { Title } = Typography;
const { TextArea } = Input;

const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 4 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 24 } },
};

const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 12, offset: 12 } },
};

/**
 * Display contents of the BookEdit page
 * @returns {string} The HTML code to display elements
 */
class BookEdit extends React.Component {
  static contextType = UserContext;
  
  // Initialize the state book information will be stored in
  constructor(props) {
    super(props);
    this.state = {
      bookInfo: [],
      radioValue: 'yes'
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
      // Check if book is available
      if(this.state.bookInfo.available === 1) {
        this.setState({ radioValue: 'yes' });
      } else {
        this.setState({ radioValue: 'no' });
      }
    })
    .catch(err => console.error(`Error fetching for book ${id}`, err));
  }
  
  render() {
    const bookInfo = this.state.bookInfo
    const id = this.context.user.ID
    
    if (id === bookInfo.ownerID ) {
      return(
        <>
          <div style={ { padding: '2% 5%' } }>
            <Row gutter={ 32 }>
              <Col>
                <img
                  src={ bookInfo.imgLink }
                  alt={ bookInfo.title }
                />
              </Col>

              <Col flex="auto">
                <Row gutter={ 16 }>
                  <Col flex="auto">
                    <Form
                      { ...formItemLayout }
                      name="update"
                      scrollToFirstError
                    >
                      <Form.Item
                        label="Available"
                        name="available"
                      >
                        <Radio.Group defaultValue={ this.state.radioValue }>
                          <Radio.Button value="yes">Yes</Radio.Button>
                          <Radio.Button value="no">No</Radio.Button>
                        </Radio.Group>
                      </Form.Item>
                      
                      <Form.Item
                        label="Title"
                        name="title"
                      >
                        <Input placeholder={ bookInfo.title } />
                      </Form.Item>
                      
                      <Form.Item
                        label="Author first name"
                        name="authorFirst"
                      >
                        <Input placeholder={ bookInfo.authorFirst } />
                      </Form.Item>
                      
                      <Form.Item
                        label="Author last name"
                        name="authorLast"
                      >
                        <Input placeholder={ bookInfo.authorLast } />
                      </Form.Item>
                      
                      <Form.Item
                        label="ISBN"
                        name="isbn"
                      >
                        <Input placeholder={ bookInfo.isbn } />
                      </Form.Item>
                      
                      <Form.Item
                        label="Description"
                        name="summary"
                      >
                        <TextArea rows= { 1 } placeholder={ bookInfo.summary } />
                      </Form.Item>
                      
                      <Form.Item
                        label="Image link"
                        name="imgLink"
                      >
                        <Input placeholder={ bookInfo.imgLink } />
                      </Form.Item>
                      
                      <Form.Item
                        label="Genre"
                        name="genre"
                      >
                        <Input placeholder={ bookInfo.genre } />
                      </Form.Item>
                      
                      <Form.Item
                        label="Publisher"
                        name="publisher"
                      >
                        <Input placeholder={ bookInfo.publisher } />
                      </Form.Item>
                      
                      <Form.Item
                        label="Year published"
                        name="publishYear"
                      >
                        <Input placeholder={ bookInfo.publishYear } />
                      </Form.Item>

                      <Form.Item { ...tailFormItemLayout }>
                        <Button type="primary" htmlType="submit">
                          Update
                        </Button>
                      </Form.Item>
                    </Form>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </>
      );
    } else {
      return(
        <Title>You are not permitted to view this page.</Title>
      );
    }
  }
}

/** Export the component to be rendered in App.jsx */
export default withRouter(BookEdit);
