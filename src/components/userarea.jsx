/**
 * The user are in the header containing controls for the current user
 * @module src/components/userarea
 * @author Joe Standring
 * @see src/components/headercontent.jsx for where this module is imported
 */

import React from 'react';
import { useContext } from 'react';
import { Row, Col, Typography, Avatar, Badge } from 'antd';
import UserOutlined from '@ant-design/icons/UserOutlined';
import { Link } from 'react-router-dom';
import UserContext from '../contexts/user';

const { Paragraph } = Typography;

/**
 * Display contents of the userarea component
 * @returns {string} The HTML code to display elements
 */
function UserArea(props) {
  const context = useContext(UserContext);
  const loggedIn = context.user.loggedIn;
  
  // If the user a logged in, show user area
  if(loggedIn) {
    return (
      <>
        <Row gutter={ 8 }>
          <Col>
            <Paragraph style={ { color: "white" } }>{ context.user.username }</Paragraph>
          </Col>

          <Col>
            <Badge count={ 1 }>
              <Link to="/account">
                <Avatar 
                  size="large"
                  icon={ <UserOutlined /> }
                />
              </Link>
            </Badge>
          </Col>
        </Row>
      </>
    );
  } else {
    return(
      <>
      </>
    )
  }
}

/** Export the component to be rendered in headercontent.jsx */
export default UserArea;
