import { Row, Col, Typography, Avatar, Badge } from 'antd';
import UserOutlined from '@ant-design/icons/UserOutlined';

const { Paragraph } = Typography;

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

export default UserArea;
