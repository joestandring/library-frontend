/**
 * Component containing multiple books owned by a user
 * @module src/components/bookgriduser
 * @author Joe Standring
 * @see src/components/user for where this module is imported
 */

import React from 'react';
import { Row, Col, Spin } from 'antd';
import { Link } from 'react-router-dom';
import BookCard from './bookcard';
import ApiConf from '../apiconf';
import { status, json } from '../utilities/requestHandlers'
import { withRouter } from 'react-router';

/**
 * Display contents of the BookGrid component
 * @returns {string} The HTML code to display elements
 */
class BookGridUser extends React.Component {
  // Initialize the state that books will be stored in
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }
  
  // Triggered when React loads virtual DOM.
  componentDidMount() {
    const id = this.props.match.params.id;
    
    fetch(ApiConf.host + '/books/user/' + id )
    .then(status)
    .then(json)
    .then(data => {
      console.log(data)
      this.setState({ books: data })
    })
    .catch(err => console.error("Error fetching books", err));
  }
  
  render() {
    // If posts havent loaded, display a loading message
    if (!this.state.books.length) {
      return(
        <Spin />
      );
    }
    
    const cardList = this.state.books.map(book => {
      return(
        // Assign key to each item and pass values to bookcard component
        <div key={book.id} style={ { padding: "10px" } }>
          <Col flex="auto">
            <Link to={ "/books/" + book.ID }>
              <BookCard { ...book } />
            </Link>
          </Col>
        </div>
      );
    });
    
    return (
      <Row type="flex" justify="space-around">
        {cardList}
      </Row>
    )
  }
}

/** Export the component to be rendered */
export default withRouter(BookGridUser);
