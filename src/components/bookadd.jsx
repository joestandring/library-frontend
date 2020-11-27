import React from 'react';
import { message, Typography, Form, Input, Button } from 'antd';
import MaskedInput from 'antd-mask-input';
import UserContext from '../contexts/user';
import ApiConf from '../apiconf';
import { status, json } from '../utilities/requestHandlers';
import { withRouter } from 'react-router-dom';

const { Title } = Typography;
const { TextArea } = Input;

const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 12 } },
};

const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 12, offset: 6 } },
};

const required = [
  { required: true, message: 'Please input a title' },
  { whitespace: true },
];

const noWhitespace = [
  { whitespace: true },
];

const imgRules = [
  { type: 'url', message: 'Please input a valid url' },
  { whitespace: true},
];

const isbnRules = [
  { required: true, message: 'Please input a valid ISBN number' },
  { pattern: /[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/, message: 'Please input a valid ISBN number' },
  { whitespace: true },
];

const yearRules = [
  { pattern: /[0-9][0-9][0-9][0-9]/, message: 'Please input a valid year' },
  { whitespace: true },
];

class BookAdd extends React.Component {
  static contextType = UserContext;
  
  constructor(props) {
    super(props);
    // Bind the onFinish method to this class
    this.onFinish = this.onFinish.bind(this);
  }
  
  onFinish = (values) => {
    const username = this.context.user.username;
    const password = this.context.user.password;
    
    // Attempt to POST the data in JSON format
    fetch(ApiConf.host + '/books', {
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
      message.success('Book added')
      this.props.history.push('/books');
    })
    // Return an error in JSON if failed
    .catch(error => {
      message.error('Book creation failed');
      console.log(error);
    });
  }
  
  render() {
    return(
      <div style={ { padding: '2% 20%', textAlign: 'center' } }>
        <Title>Add a new book</Title>
        
        <Form
          { ...formItemLayout }
          name="bookAdd"
          onFinish={ this.onFinish }
          scrollToFirstError
        >
          <Form.Item
            label="Title"
            name="title"
            rules={ required }
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Author first name"
            name="authorFirst"
            rules={ noWhitespace }
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Author last name"
            name="authorLast"
            rules={ noWhitespace }
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="ISBN"
            name="isbn"
            rules={ isbnRules }
          >
            <MaskedInput mask="1111111111" name="isbn" onChange={ this.onChange } />
          </Form.Item>

          <Form.Item
            label="Description"
            name="summary"
            rules={ noWhitespace }
          >
            <TextArea rows= { 1 } />
          </Form.Item>

          <Form.Item
            label="Image link"
            name="imgLink"
            rules={ imgRules }
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Genre"
            name="genre"
            rules={ noWhitespace }
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Publisher"
            name="publisher"
            rules={ noWhitespace }
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Year published"
            name="publishYear"
            rules={ yearRules }
          >
            <MaskedInput mask="1111" name="publishYear" onChange={ this.onChange } />
          </Form.Item>

          <Form.Item { ...tailFormItemLayout }>
            <Button type="primary" htmlType="submit">
              Add book
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default withRouter(BookAdd);