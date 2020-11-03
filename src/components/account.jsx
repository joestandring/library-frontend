/**
 * Page containing components related to the user's account
 * @module src/components/account
 * @author Joe Standring
 * @see src/App.jsx for where this module is imported
 */

import { Avatar, Typography, Space } from 'antd';
import UserOutlined from '@ant-design/icons/UserOutlined';
import AccountInfo from './accountinfo'

const { Title, Paragraph } = Typography;

/**
 * Display contents of the Account page
 * @returns {string} The HTML code to display elements
 */
function Account(props) {
  return(
    <>
      <div style={ { padding: '2% 10%', textAlign: 'center' } }>
        <Space direction="vertical">
          <Avatar size={ 128 } icon={ <UserOutlined /> } />
          <Title level={ 4 }>USERNAME_HERE</Title>
          <Paragraph type="secondary">Joined 01/01/2020</Paragraph>
          
          <AccountInfo />
        </Space>
      </div>
    </>
  );
}

/** Export the component to be rendered in App.jsx */
export default Account;
