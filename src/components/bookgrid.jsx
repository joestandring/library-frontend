/**
 * Component containing multiple books
 * @module src/components/bookgrid
 * @author Joe Standring
 * @see src/components/books for where this module is imported
 */

import { Card, Row, Col, Space } from 'antd';
import { Link } from 'react-router-dom';

const { Meta } = Card;

/**
 * Display contents of the BookGrid component
 * @returns {string} The HTML code to display elements
 */
function BookGrid(props) {
  return (
    <>
      <Space direction="vertical" size="large">
        <Row type="flex" justify="space-around">
          <Col span={ 5 }>
            <Link to="/books/1">
              <Card 
                hoverable
                cover={ <img alt="Seconds" src="https://pictures.abebooks.com/isbn/9781906838881-uk.jpg" /> }
              >
                <Meta
                  title="Seconds"
                  description="Bryan Lee O'Malley"
                />
              </Card>
            </Link>
          </Col>
          <Col span={ 5 }>
            <Link to="/books/2">
              <Card 
                hoverable
                cover={ <img alt="Seconds" src="https://pictures.abebooks.com/isbn/9781906838881-uk.jpg" /> }
              >
                <Meta
                  title="Seconds"
                  description="Bryan Lee O'Malley"
                />
              </Card>
            </Link>
          </Col>
          <Col span={ 5 }>
            <Link to="/books/3">
              <Card 
                hoverable
                cover={ <img alt="Seconds" src="https://pictures.abebooks.com/isbn/9781906838881-uk.jpg" /> }
              >
                <Meta
                  title="Seconds"
                  description="Bryan Lee O'Malley"
                />
              </Card>
            </Link>
          </Col>
          <Col span={ 5 }>
            <Link to="/books/4">
              <Card 
                hoverable
                cover={ <img alt="Seconds" src="https://pictures.abebooks.com/isbn/9781906838881-uk.jpg" /> }
              >
                <Meta
                  title="Seconds"
                  description="Bryan Lee O'Malley"
                />
              </Card>
            </Link>
          </Col>
        </Row>

        <Row type="flex" justify="space-around">
          <Col span={ 5 }>
            <Link to="/books/5">
              <Card 
                hoverable
                cover={ <img alt="Seconds" src="https://pictures.abebooks.com/isbn/9781906838881-uk.jpg" /> }
              >
                <Meta
                  title="Seconds"
                  description="Bryan Lee O'Malley"
                />
              </Card>
            </Link>
          </Col>
          <Col span={ 5 }>
            <Link to="/books/6">
              <Card 
                hoverable
                cover={ <img alt="Seconds" src="https://pictures.abebooks.com/isbn/9781906838881-uk.jpg" /> }
              >
                <Meta
                  title="Seconds"
                  description="Bryan Lee O'Malley"
                />
              </Card>
            </Link>
          </Col>
          <Col span={ 5 }>
            <Link to="/books/7">
              <Card 
                hoverable
                cover={ <img alt="Seconds" src="https://pictures.abebooks.com/isbn/9781906838881-uk.jpg" /> }
              >
                <Meta
                  title="Seconds"
                  description="Bryan Lee O'Malley"
                />
              </Card>
            </Link>
          </Col>
          <Col span={ 5 }>
            <Link to="/books/8">
              <Card 
                hoverable
                cover={ <img alt="Seconds" src="https://pictures.abebooks.com/isbn/9781906838881-uk.jpg" /> }
              >
                <Meta
                  title="Seconds"
                  description="Bryan Lee O'Malley"
                />
              </Card>
            </Link>
          </Col>
        </Row>
        
        <Row type="flex" justify="space-around">
          <Col span={ 5 }>
            <Link to="/books/9">
              <Card 
                hoverable
                cover={ <img alt="Seconds" src="https://pictures.abebooks.com/isbn/9781906838881-uk.jpg" /> }
              >
                <Meta
                  title="Seconds"
                  description="Bryan Lee O'Malley"
                />
              </Card>
            </Link>
          </Col>
          <Col span={ 5 }>
            <Link to="/books/10">
              <Card 
                hoverable
                cover={ <img alt="Seconds" src="https://pictures.abebooks.com/isbn/9781906838881-uk.jpg" /> }
              >
                <Meta
                  title="Seconds"
                  description="Bryan Lee O'Malley"
                />
              </Card>
            </Link>
          </Col>
          <Col span={ 5 }>
            <Link to="/books/11">
              <Card 
                hoverable
                cover={ <img alt="Seconds" src="https://pictures.abebooks.com/isbn/9781906838881-uk.jpg" /> }
              >
                <Meta
                  title="Seconds"
                  description="Bryan Lee O'Malley"
                />
              </Card>
            </Link>
          </Col>
          <Col span={ 5 }>
            <Link to="/books/12">
              <Card 
                hoverable
                cover={ <img alt="Seconds" src="https://pictures.abebooks.com/isbn/9781906838881-uk.jpg" /> }
              >
                <Meta
                  title="Seconds"
                  description="Bryan Lee O'Malley"
                />
              </Card>
            </Link>
          </Col>
        </Row>
      </Space>
    </>
  );
}

/** Export the component to be rendered */
export default BookGrid;
