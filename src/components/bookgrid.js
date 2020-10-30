import { Card, Avatar, Row, Col, Space } from 'antd';
const { Meta } = Card;

function BookGrid(props) {
  return (
    <>
      <Space direction="vertical">
        <Row type="flex" justify="space-around">
          <Col span={ 5 }>
            <Card 
              hoverable
              cover={ <img alt="Seconds" src="https://pictures.abebooks.com/isbn/9781906838881-uk.jpg" /> }
            >
              <Meta
                title="Seconds"
                description="Bryan Lee O'Malley"
              />
            </Card>
          </Col>
          <Col span={ 5 }>
            <Card 
              hoverable
              cover={ <img alt="Seconds" src="https://pictures.abebooks.com/isbn/9781906838881-uk.jpg" /> }
            >
              <Meta
                title="Seconds"
                description="Bryan Lee O'Malley"
              />
            </Card>
          </Col>
          <Col span={ 5 }>
            <Card 
              hoverable
              cover={ <img alt="Seconds" src="https://pictures.abebooks.com/isbn/9781906838881-uk.jpg" /> }
            >
              <Meta
                title="Seconds"
                description="Bryan Lee O'Malley"
              />
            </Card>
          </Col>
          <Col span={ 5 }>
            <Card 
              hoverable
              cover={ <img alt="Seconds" src="https://pictures.abebooks.com/isbn/9781906838881-uk.jpg" /> }
            >
              <Meta
                title="Seconds"
                description="Bryan Lee O'Malley"
              />
            </Card>
          </Col>
        </Row>

        <Row type="flex" justify="space-around">
          <Col span={ 5 }>
            <Card 
              hoverable
              cover={ <img alt="Seconds" src="https://pictures.abebooks.com/isbn/9781906838881-uk.jpg" /> }
            >
              <Meta
                title="Seconds"
                description="Bryan Lee O'Malley"
              />
            </Card>
          </Col>
          <Col span={ 5 }>
            <Card 
              hoverable
              cover={ <img alt="Seconds" src="https://pictures.abebooks.com/isbn/9781906838881-uk.jpg" /> }
            >
              <Meta
                title="Seconds"
                description="Bryan Lee O'Malley"
              />
            </Card>
          </Col>
          <Col span={ 5 }>
            <Card 
              hoverable
              cover={ <img alt="Seconds" src="https://pictures.abebooks.com/isbn/9781906838881-uk.jpg" /> }
            >
              <Meta
                title="Seconds"
                description="Bryan Lee O'Malley"
              />
            </Card>
          </Col>
          <Col span={ 5 }>
            <Card 
              hoverable
              cover={ <img alt="Seconds" src="https://pictures.abebooks.com/isbn/9781906838881-uk.jpg" /> }
            >
              <Meta
                title="Seconds"
                description="Bryan Lee O'Malley"
              />
            </Card>
          </Col>
        </Row>
      </Space>
    </>
  );
}

export default BookGrid;
