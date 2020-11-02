/**
 * Component to control search results
 * @module src/components/searchcontrols
 * @author Joe Standring
 * @see src/books.jsx for where this module is imported
 */

import { Menu, Dropdown, Button, Radio, Space } from 'antd';
import DownOutlined from '@ant-design/icons/DownOutlined';
import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined';
import BookOutlined from '@ant-design/icons/BookOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import CalendarOutlined from '@ant-design/icons/CalendarOutlined';
import ArrowUpOutlined from '@ant-design/icons/ArrowUpOutlined';
import ArrowDownOutlined from '@ant-design/icons/ArrowDownOutlined';

/**
 * Display contents of the SearchControls component
 * @returns {string} The HTML code to display elements
 */
function SearchControls(props) {
  const sortMenu = (
    <Menu>
      <Menu.Item>
        <ClockCircleOutlined />Date uploaded
      </Menu.Item>
      <Menu.Item>
        <BookOutlined />Title
      </Menu.Item>
      <Menu.Item>
        <UserOutlined />Author
      </Menu.Item>
      <Menu.Item>
        <CalendarOutlined />Publish year
      </Menu.Item>
    </Menu>
  )
  
  const directions = [
    { label: <ArrowUpOutlined />, value: 'Ascending' },
    { label: <ArrowDownOutlined />, value: 'Descending' },
  ];
  
  return(
    <>
      <Space size="small">
        <Dropdown overlay={ sortMenu }>
          <Button>
            Sort By<DownOutlined />
          </Button>
        </Dropdown>

        <Radio.Group
          options={ directions }
          optionType="button"
        />
      </Space>
    </>
  );
}

/** Export the component to be rendered in books.jsx */
export default SearchControls;

