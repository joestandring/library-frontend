/**
 * Page containing components related to a user
 * @module src/components/user
 * @author Joe Standring
 * @see src/App.jsx for where this module is imported
 * @see src/components/bookgrid for the component to display book cards
 */

import { Avatar, Typography, Space } from 'antd';
import UserOutlined from '@ant-design/icons/UserOutlined';
import BookGrid from './bookgrid.jsx'

const { Title, Paragraph } = Typography;

/**
 * Display contents of the user page
 * @returns {string} The HTML code to display elements
 */
function User(props) {
  return(
    <>
      <div style={ { padding: '2% 10%', textAlign: 'center' } }>
        <Space direction="vertical">
          <Avatar size={ 128 } icon={ <UserOutlined /> } />
          <Title level={ 4 }>USERNAME_HERE</Title>
          <Paragraph type="secondary">Joined 01/01/2020</Paragraph>
          
          <Title level={ 2 }>Owned books</Title>
          <BookGrid />
        </Space>
      </div>
    </>
  );
}

/** Export the component to be rendered in App.jsx */
export default User;
