/**
 * The default "Home" page, used when going to the website's base url or selecting the "Home" button
 * @module src/components/home
 * @author Joe Standring
 * @see src/App.jsx for where this module is imported
 * @see src/components/bookgrid for the component to display book cards
 */

import { Typography, Input } from 'antd';
import BookGrid from './bookgrid';

const { Title, Paragraph } = Typography;
const { Search } = Input;

/**
 * Display contents of the home page
 * @returns {string} The HTML code to display elements
 */
function Home(props) {
  return (
    <>
      <div style={ { padding: '2% 20%', textAlign: 'center' } }>
        <Title>Find the perfect book</Title>

        <Paragraph>
          Public Library lets you browse hundreds of books from users all across the UK. Find any book you're looking for from fiction to technical writing.
        </Paragraph>
      
        <Search placeholder="Search books"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={null}
        />
      </div>
      
      <div style={ { padding: '2% 10%', textAlign: 'center' } }>
        <Title level={ 2 }>Recent books</Title>
        
        <BookGrid />
      </div>
    </>
  );
}

/** Export the component to be rendered in index.js */
export default Home;
