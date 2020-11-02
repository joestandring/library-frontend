/**
 * Page containing components related to books
 * @module src/components/books
 * @author Joe Standring
 * @see src/App.js for where this module is imported
 * @see src/components/searchresults for the search results component used here
 */

import { Typography, Input, Dropdown, Button, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons/DownOutlined';
import { ClockCircleOutlined } from '@ant-design/icons/ClockCircleOutlined';
import SearchResults from './searchresults';

const { Title } = Typography;
const { Search } = Input;

// Options used in order menu
const orderMenu = (
  <Menu>
    <Menu.Item key="1" icon={ <ClockCircleOutlined /> }>
      Date added
    </Menu.Item>
  </Menu>
);

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
        
        <Dropdown.Button>
          <Dropdown overlay={ orderMenu }>
            <Button>
              Button <DownOutlined />
            </Button>
          </Dropdown>
        </Dropdown.Button>
        
      </div>
      
      <SearchResults />
    </>
  );
}

/** Export the component to be rendered in App.js */
export default Books;
