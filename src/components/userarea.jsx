/**
 * The user are in the header containing controls for the current user
 * @module src/components/userarea
 * @author Joe Standring
 * @see src/components/headercontent.jsx for where this module is imported
 */

import { Row, Col, Typography, Avatar, Badge } from 'antd';
import UserOutlined from '@ant-design/icons/UserOutlined';

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
          <Paragraph style={ { color: "white" } }>Good evening, User</Paragraph>
        </Col>
        
        <Col>
          <Badge count={ 1 }>
            <Avatar 
              size="large"
              icon={ <UserOutlined /> }
            />
          </Badge>
        </Col>
      </Row>
    </>
  );
}

/** Export the component to be rendered in headercontent.jsx */
export default UserArea;
