/**
 * The navigation bar in the header containing links to different pages
 * @module src/components/nav
 * @author Joe Standring
 * @see src/components/headercontent.jsx for where this module is imported
 */

import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import UserContext from '../contexts/user';

/**
 * Display contents of the Nav component
 * @returns {string} The HTML code to display elements
 */
function Nav(props) {
  return (
    <UserContext.Consumer>
      {({logout}) => ( 
      <>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={ ['1'] }>
          <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/books">Books</Link></Menu.Item>
          <Menu.Item key="3"><Link to="/login">Log in</Link></Menu.Item>
          <Menu.Item key="4" onClick={ logout }><Link to="/">Log out</Link></Menu.Item>
        </Menu>
      </>
      )}
    </UserContext.Consumer>
  );
}

/** Export the component to be rendered in headercontent.jsx */
export default Nav
