/**
 * The navigation bar in the header containing links to different pages
 * @module src/components/nav
 * @author Joe Standring
 * @see src/components/headercontent.jsx for where this module is imported
 */

import React from 'react';
import { useContext } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import UserContext from '../contexts/user';

/**
 * Display contents of the Nav component
 * @returns {string} The HTML code to display elements
 */
function Nav(props) {
  const context = useContext(UserContext);
  const loggedIn = context.user.loggedIn
  
  let LoginNav;
  // If the user is logged in
  if(!loggedIn) {
    LoginNav = (
      <>
        <Menu.Item key="3">
          <Link to="/login">Log in</Link>
        </Menu.Item>
      </>
    );
  } else {
    LoginNav = (
      <>
        <Menu.Item key="3" onClick={ context.logout }>
          <Link to="/">Log out</Link>
        </Menu.Item>
      </>
    );
  }
  
  return (
    <>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={ ['1'] }>
        <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
        <Menu.Item key="2"><Link to="/books">Books</Link></Menu.Item>
        { LoginNav }
      </Menu>
    </>
  );
}

/** Export the component to be rendered in headercontent.jsx */
export default Nav
