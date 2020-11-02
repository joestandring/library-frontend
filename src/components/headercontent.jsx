/**
 * The content of the header displayed at the top of the app
 * @module src/components/headercontent
 * @author Joe Standring
 * @see src/home.jsx for where this module is used
 * @see src/components/nav.jsx for the navigation bar used in this component
 * @see src/components/userarea.jsx for the user area used in this component
 */

import { Row, Col } from 'antd';

import Nav from './nav';
import UserArea from './userarea';

/**
 * Display contents of the header component
 * @returns {string} The HTML code to display elements
 */
function HeaderContent(props) {
  return(
    <>
      <Row>
        <Col flex="auto">
          <Nav />
        </Col>
        <Col>
          <UserArea />          
        </Col>
      </Row>
    </>
  );
}

/** Export the component to be rendered in home.jsx */
export default HeaderContent;
