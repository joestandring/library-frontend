import React from 'react';
import { Card } from 'antd';
import ApiConf from '../apiconf';
import { status, json } from '../utilities/requestHandlers';

const { Meta } = Card

class RequestCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookInfo: [],
    }
  }
  
  componentDidMount() {
    fetch(ApiConf.host + '/books/' + this.props.bookID)
    .then(status)
    .then(json)
    .then(data => {
      this.setState({ bookInfo: data })
    })
    .catch(err => console.error(`Error fetching for book ${this.props.bookID}`, err));
  }
  
  render() {
    return(
      <Card
        hoverable
        cover={<img alt="test" src={ this.state.bookInfo.imgLink } style={ { height: "450px", "object-fit": "cover" } } /> }
        style={ { width: 300 } }
      >
        <Meta title={ this.state.bookInfo.title } description={ this.props.message } />
      </Card>
    )
  }
}

export default RequestCard;