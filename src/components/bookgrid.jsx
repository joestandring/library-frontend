/**
 * Component containing multiple books
 * @module src/components/bookgrid
 * @author Joe Standring
 * @see src/components/books for where this module is imported
 */

import React from 'react';
import { Row, Col, Spin } from 'antd';
import { Link } from 'react-router-dom';
import BookCard from './bookcard';

/**
 * Display contents of the BookGrid component
 * @returns {string} The HTML code to display elements
 */
class BookGrid extends React.Component {
  // Initialize the state that books will be stored in
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }
  
  // Triggered when React loads virtual DOM.
  componentDidMount() {
    // State updated
    this.setState(
      {
        books: require('../data/books.json')
      }
    );
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
            <Link to={ "/books/" + book.id }>
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
export default BookGrid;
