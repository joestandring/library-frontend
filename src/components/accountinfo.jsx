/**
 * Page containing user account details to edit
 * @module src/components/accountinfo
 * @author Joe Standring
 * @see src/account.jsx for where this module is imported
 */

import { List, Button } from 'antd';

/**
 * Display contents of the AccountInfo component
 * @returns {string} The HTML code to display elements
 */
function AccountInfo(props) {
  const listItems = [
    {
      title: 'Username',
      description: 'USERNAME',
    },
    {
      title: 'Email',
      description: "EMAIL",
    },
    {
      title: 'Password',
      description: 'PASSWORD',
    },
    {
      title: 'First Name',
      description: 'FIRSTNAME',
    },
    {
      title: 'Last Name',
      description: 'LASTNAME',
    },
    {
      title: 'Address',
      description: 'ADDRESS',
    },
  ]
  
  return(
    <>
      <List
        bordered
        size="small"
        dataSource={ listItems }
        renderItem={ item => (
          <List.Item>
            <List.Item.Meta
              title={ item.title }
              description={ item.description }
            />
            <div>
              <Button type="primary">
                Edit
              </Button>
            </div>
          </List.Item>
        )}
      />
    </>
  );
}

/** Export the component to be rendered in account.jsx */
export default AccountInfo;

