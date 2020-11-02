/**
 * The navigation bar in the header containing links to different pages
 * @module src/components/nav
 * @author Joe Standring
 * @see src/components/headercontent.jsx for where this module is imported
 */

import { Menu } from 'antd';

/**
 * Display contents of the nav component
 * @returns {string} The HTML code to display elements
 */
function Nav(props) {
  return (
    <>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={ ['1'] }>
        <Menu.Item key="1">Home</Menu.Item>
        <Menu.Item key="2">Books</Menu.Item>
        <Menu.Item key="3">Users</Menu.Item>
      </Menu>
    </>
  );
}

/** Export the component to be rendered in headercontent.jsx */
export default Nav
