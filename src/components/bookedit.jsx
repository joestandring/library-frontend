/**
 * Form for editing book information
 * @module src/components/bookedit
 * @author Joe Standring
 */

import React from 'react';
import { withRouter } from 'react-router-dom';

/**
 * Display contents of the BookEdit page
 * @returns {string} The HTML code to display elements
 */
class BookEdit extends React.Component {
  render() {
    return(
      <p>test</p>
    );
  }
}

/** Export the component to be rendered in App.jsx */
export default withRouter(BookEdit);
