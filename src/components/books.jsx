/**
 * Page containing components related to books
 * @module src/components/books
 * @author Joe Standring
 * @see src/App.jsx for where this module is imported
 */

import { useContext } from 'react';
import { Typography, Input, Button, Divider} from 'antd';
import SearchResults from './searchresults';
import UserContext from '../contexts/user';
import { Link } from 'react-router-dom';

const { Title, Paragraph } = Typography;
const { Search } = Input;

/**
 * Display contents of the books page
 * @returns {string} The HTML code to display elements
 */
function Books(props) {
  const context = useContext(UserContext);
  const loggedIn = context.user.loggedIn;
  
  let addBooks;
  if(loggedIn) {
    addBooks = (
      <div>
        <Button type="primary" style={ { marginRight: "5px" } }>
          <Link to="/books/new">
            Add book
          </Link>
        </Button>

        <Button type="primary">
          <Link to={ "/users/" + context.user.ID }>
            Your books
          </Link>
        </Button>
      </div>
    );
  } else {
    addBooks = (
      <Paragraph><Link to="/login">Log in</Link> to add books</Paragraph>
    );
  }
  
  return(
    <>
      <div style={ { padding: '2% 10%', textAlign: 'center' } }>
        <Title>Find the perfect book</Title>
        { addBooks }
        <Divider />
        <Title level={ 2 }>Search all books</Title>
         
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
