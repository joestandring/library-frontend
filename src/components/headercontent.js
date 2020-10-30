import { Row, Col } from 'antd';

import Nav from './nav';
import UserArea from './userarea';

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

export default HeaderContent;
