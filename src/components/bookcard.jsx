/**
 * Card containing information and link to single book entry
 * @module src/components/bookcard
 * @author Joe Standring
 * @see src/components/bookgrid for where this module is imported
 */

import React from 'react';
import { Card } from 'antd';

const { Meta } = Card;

/**
 * Display contents of the BookCard component
 * @returns {string} The HTML code to display elements
 */
class BookCard extends React.Component {
  render() {
    return(
      <Card
        hoverable
        cover={<img alt="test" src={ this.props.imgLink } />}
        style={ { width: 240 } }
      >
        <Meta title={ this.props.title } description={ this.props.authorFirst + this.props.authorLast } />
      </Card>
    );
  }
}

/** Export the component to be rendered in bookgrid.jsx */
export default BookCard;
