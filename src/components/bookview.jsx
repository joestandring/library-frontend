/**
 * Page containing components related to a single book
 * @module src/components/bookview
 * @author Joe Standring
 * @see src/App.jsx for where this module is imported
 */

import { Image, Typography, Row, Col, Button, List, Space, Avatar } from 'antd';
import { useParams, Link } from 'react-router-dom';
import UserOutlined from '@ant-design/icons/UserOutlined';
import ArrowLeftOutlined from '@ant-design/icons/ArrowLeftOutlined';
import ApiConf from '../apiconf';
import { status, json } from '../utilities/requestHandlers'

const { Title, Paragraph } = Typography;

/**
 * Display contents of the bookview page
 * @returns {string} The HTML code to display elements
 */
function BookView(props) {
  const { id } = useParams();
  
  const listItems = [
    {
      title: 'ISBN',
      description: '1234567890123',
    },
    {
      title: 'Author',
      description: "Bryan Lee O'Malley",
    },
    {
      title: 'Genre',
      description: 'Graphic Novel',
    },
    {
      title: 'Publisher',
      description: 'Ballantine Books',
    },
    {
      title: 'Year',
      description: '2014',
    },
  ]
  
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

            <Row gutter={ 16 }>
              <Col flex="auto">
                <List
                  bordered
                  size="small"
                  dataSource={ listItems }
                  renderItem={ item => (
                    <List.Item>
                      <List.Item.Meta
                        title={ item.title }
                        description={ item.description }
                      />
                    </List.Item>
                  )}
                />
              </Col>

              <Col>
                <Space direction="vertical">
                  <Link to="/user">
                    <Button size="large">
                      <Space>
                        <Avatar size="small" icon={ <UserOutlined /> } />
                        USERNAME_HERE
                      </Space>
                    </Button>
                  </Link>

                  <Row justify="center" gutter={ 16 }>
                    <Col>
                      <Button type="primary">
                        Available
                      </Button>
                    </Col>

                    <Col>
                      <Button type="primary">
                        Message
                      </Button>
                    </Col>
                  </Row>
                </Space>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
}

/** Export the component to be rendered in App.jsx */
export default BookView;
