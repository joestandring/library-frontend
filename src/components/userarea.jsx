/**
 * The user are in the header containing controls for the current user
 * @module src/components/userarea
 * @author Joe Standring
 * @see src/components/headercontent.jsx for where this module is imported
 */

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
  return (
    <>
      <Row gutter={ 16 }>
        <Col>
          <UserContext.Consumer>
            {
              ({ user }) => { console.log("Current user: ", user.username) }
              //({ user }) => { <Paragraph style={ { color: "white" } }>Good evening, { user.username }</Paragraph> } 
            }
          </UserContext.Consumer>
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
}

/** Export the component to be rendered in headercontent.jsx */
export default UserArea;
