/**
 * Page containing components related to books
 * @module src/components/books
 * @author Joe Standring
 * @see src/App.jsx for where this module is imported
 */

import { Typography, Input } from 'antd';
import SearchResults from './searchresults';

const { Title } = Typography;
const { Search } = Input;

/**
 * Display contents of the books page
 * @returns {string} The HTML code to display elements
 */
function Books(props) {
  return(
    <>
      <div style={ { padding: '2% 10%', textAlign: 'center' } }>
        <Title>Search all books</Title>
         
        <Search placeholder="Search books"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={null}
        />
      </div>

      <SearchResults />
    </>
  );
}

/** Export the component to be rendered in App.jsx */
export default Books;
