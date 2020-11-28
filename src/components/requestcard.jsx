import React from 'react';
import { Card } from 'antd';
import ApiConf from '../apiconf';
import { status, json } from '../utilities/requestHandlers';
import { Link } from 'react-router-dom';

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
      <Link to={ "/requests/" + this.props.ID }>
        <Card
          hoverable
          cover={<img alt="test" src={ this.state.bookInfo.imgLink } style={ { height: "450px", "object-fit": "cover" } } /> }
          style={ { width: 300 } }
        >
          <Meta title={ this.state.bookInfo.title } description={ this.props.message } />
        </Card>
      </Link>
    )
  }
}

export default RequestCard;