/**
 * Page containing components related to a single book
 * @module src/components/bookview
 * @author Joe Standring
 * @see src/App.jsx for where this module is imported
 */

import { Image, Typography, Row, Col, Button } from 'antd';
import ArrowLeftOutlined from '@ant-design/icons/ArrowLeftOutlined';
import BookInfo from './bookinfo'
import { Link } from 'react-router-dom';

const { Title, Paragraph } = Typography;

/**
 * Display contents of the bookview page
 * @returns {string} The HTML code to display elements
 */
function BookView(props) {
  return(
    <>
      <div style={ { padding: '2% 5%' } }>
        <Row gutter={ 32 }>
          <Col>
            <Image
              src="https://pictures.abebooks.com/isbn/9781906838881-uk.jpg"
            />
          </Col>
          
          <Col flex="auto">
            <Row>
              <Col flex="auto">
                <Title>Seconds</Title>
                <Title level={ 5 } type="secondary">Bryan Lee O'Malley</Title>
              </Col>
              
              <Col>
                <Link to="/books">
                  <Button type="primary" size="large">
                    <ArrowLeftOutlined />Back
                  </Button>
                </Link>
              </Col>
            </Row>
            
            <Row>
              <Paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Paragraph>
            </Row>
            
            <BookInfo />
          </Col>
        </Row>
      </div>
    </>
  );
}

/** Export the component to be rendered in App.jsx */
export default BookView;
