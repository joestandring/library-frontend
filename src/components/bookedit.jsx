/**
 * Form for editing book information
 * @module src/components/bookedit
 * @author Joe Standring
 */

import React from 'react';
import { withRouter } from 'react-router-dom';
import { Popconfirm, Typography, Row, Col, Button, Form, Input, Radio, message } from 'antd';
import UserContext from '../contexts/user';
import ApiConf from '../apiconf';
import { status, json } from '../utilities/requestHandlers';
import MaskedInput from 'antd-mask-input';

const { Title } = Typography;
const { TextArea } = Input;

const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 4 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 24 } },
};

const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 12, offset: 12 } },
};

const imgRules = [
  { type: 'url', message: 'Please input a valid url' },
  { whitespace: true },
];

const noWhitespace = [
  { whitespace: true },
];

const isbnRules = [
  { pattern: /[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/, message: 'Please input a valid ISBN number' },
  { whitespace: true },
];

const yearRules = [
  { pattern: /[0-9][0-9][0-9][0-9]/, message: 'Please input a valid year' },
  { whitespace: true },
];

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
      radioValue: ''
    }
    
    this.delete = this.delete.bind(this);
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
  
  onChange = e => {
    this.setState({ radioValue: e.target.value });
  }
  
  onFinish = (values) => {
    const username = this.context.user.username;
    const password = this.context.user.password;
    
    const keys = Object.keys(values);
    
    if(this.state.radioValue === 'yes') {
      values.available = 1;
    } else {
      values.available = 0;
    }

    // Change empty values to those stored in state
    for (let i = 0; i < keys.length; i++) {
      if (values[keys[i]] == null) {
        values[keys[i]] = this.state.bookInfo[keys[i]];
      }
    }
    
    fetch(ApiConf.host + '/books/' + this.state.bookInfo.ID, {
      method: 'PUT',
      body: JSON.stringify(values),
      headers: {
        "Authorization": "Basic " + btoa(username + ":" + password),
        "Content-Type": "application/json"
      }
    })
    .then(status)
    .then(json)
    .then(values => {
      message.success('Book updated');
      this.props.history.push('/books/' + this.props.match.params.id);
    })
    .catch(error => {
      message.error('Book update failed');
    })
  }
  
  delete() {
    const username = this.context.user.username;
    const password = this.context.user.password;
    
    fetch(ApiConf.host + '/books/' + this.state.bookInfo.ID, {
      method: 'DELETE',
      headers: {
        "Authorization": "Basic " + btoa(username + ":" + password)
      }
    })
    .then(status)
    .then(json)
    .then( data => {
      message.success('Book deleted');
      this.props.history.push('/books');
    })
    .catch( err => {
      message.error('Book deletion failed');
      console.log(err);
    })
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
                <Row>
                  <img
                    src={ bookInfo.imgLink }
                    alt={ bookInfo.title }
                  />
                </Row>
                <Row>
                  <div style={ { margin: "auto", marginTop: "10px" } }>
                    <Popconfirm
                      title="Are you sure you want to delete this book?"
                      onConfirm={ this.delete }
                      okText="Yes, delete this book"
                      cancelText="Never mind"
                    >
                      <Button danger>
                        Delete book
                      </Button>
                    </Popconfirm>
                  </div>
                </Row>
              </Col>

              <Col flex="auto">
                <Row gutter={ 16 }>
                  <Col flex="auto">
                    <Form
                      { ...formItemLayout }
                      name="update"
                      onFinish={ this.onFinish }
                      scrollToFirstError
                    >
                      <Form.Item
                        label="Available"
                        name="available"
                      >
                        <></>
                        <Radio.Group defaultValue={ this.state.radioValue } onChange={ this.onChange } value={ this.state.radioValue }>
                          <Radio.Button value="yes">Yes</Radio.Button>
                          <Radio.Button value="no">No</Radio.Button>
                        </Radio.Group>
                      </Form.Item>
                      
                      <Form.Item
                        label="Title"
                        name="title"
                        rules={ noWhitespace }
                      >
                        <Input placeholder={ bookInfo.title } />
                      </Form.Item>
                      
                      <Form.Item
                        label="Author first name"
                        name="authorFirst"
                        rules={ noWhitespace }
                      >
                        <Input placeholder={ bookInfo.authorFirst } />
                      </Form.Item>
                      
                      <Form.Item
                        label="Author last name"
                        name="authorLast"
                        rules={ noWhitespace }
                      >
                        <Input placeholder={ bookInfo.authorLast } />
                      </Form.Item>
                      
                      <Form.Item
                        label="ISBN"
                        name="isbn"
                        rules={ isbnRules }
                      >
                        <MaskedInput mask="1111111111" name="isbn" onChange={ this.onChange } placeholder={ bookInfo.isbn }/>
                      </Form.Item>
                      
                      <Form.Item
                        label="Description"
                        name="summary"
                        rules={ noWhitespace }
                      >
                        <TextArea rows= { 1 } placeholder={ bookInfo.summary } />
                      </Form.Item>
                      
                      <Form.Item
                        label="Image link"
                        name="imgLink"
                        rules={ imgRules }
                      >
                        <Input placeholder={ bookInfo.imgLink } />
                      </Form.Item>
                      
                      <Form.Item
                        label="Genre"
                        name="genre"
                        rules={ noWhitespace }
                      >
                        <Input placeholder={ bookInfo.genre } />
                      </Form.Item>
                      
                      <Form.Item
                        label="Publisher"
                        name="publisher"
                        rules={ yearRules }
                      >
                        <Input placeholder={ bookInfo.publisher } />
                      </Form.Item>
                      
                      <Form.Item
                        label="Year published"
                        name="publishYear"
                        rules={ noWhitespace }
                      >
                        <MaskedInput mask="1111" name="publishYear" onChange={ this.onChange } placeholder={ bookInfo.publishYear } />
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
