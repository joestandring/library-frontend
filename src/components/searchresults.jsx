/**
 * Component containing search results for books
 * @module src/components/searchresults
 * @author Joe Standring
 * @see src/books.js for where this module is imported
 * @see src/components/bookgrid for the component used to display results
 * 
 */

import { Typography } from 'antd';
import BookGrid from './bookgrid'

const { Title } = Typography;

/**
 * Display contents of the searchresults page
 * @returns {string} The HTML code to display elements
 */
function SearchResults(props) {
  return(
    <>
      <div style={ { padding: '2% 10%', textAlign: 'center' } }>
        <Title level={ 2 }>Recent results for "SEARCH_QUERY"</Title>

        <BookGrid />
      </div>
    </>
  );
}

/** Export the component to be rendered in books.js */
export default SearchResults;