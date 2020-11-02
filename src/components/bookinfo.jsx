/**
 * Displays information about a book
 * @module src/components/bookinfo
 * @author Joe Standring
 * @see src/components/bookview.jsx for where this module is imported
 */

import { List, Row, Col, Button, Avatar, Space } from 'antd';
import UserOutlined from '@ant-design/icons/UserOutlined';

/**
 * Display contents of the bookinfo component
 * @returns {string} The HTML code to display elements
 */
function BookInfo(props) {
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
            <Button size="large">
              <Space>
                <Avatar size="small" icon={ <UserOutlined /> } />
                USERNAME_HERE
              </Space>
            </Button>

            <Row justify="center" gutter={ 16 }>
              <Col>
                <Button disabled type="primary">
                  Available
                </Button>
              </Col>

              <Col>
                <Button type="primary">
                  Request
                </Button>
              </Col>
            </Row>
          </Space>
        </Col>
      </Row>
    </>
  );
}

/** Export the component to be rendered in bookview.jsx */
export default BookInfo;
