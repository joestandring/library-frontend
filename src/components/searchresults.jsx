/**
 * Component containing search results for books
 * @module src/components/searchresults
 * @author Joe Standring
 * @see src/books.jsx for where this module is imported
 * @see src/components/bookgrid.jsx for the component used to display results
 * @see src/components/searchresults.jsx for the component used to control result order
 */

import { Typography, Space } from 'antd';
import BookGrid from './bookgrid'
import SearchControls from './searchcontrols'

const { Title } = Typography;

/**
 * Display contents of the searchresults page
 * @returns {string} The HTML code to display elements
 */
function SearchResults(props) {
  return(
    <>
      <div style={ { padding: '2% 10%', textAlign: 'center' } }>
        <Title level={ 2 }>Results for "SEARCH_QUERY"</Title>
        
        <Space direction="vertical">
        <SearchControls />

        <BookGrid />
        </Space>
      </div>
    </>
  );
}

/** Export the component to be rendered in books.jsx */
export default SearchResults;