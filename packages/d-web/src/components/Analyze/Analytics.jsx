import React from 'react'
import { Card, Col, Image, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { age, gender, time } from '../../asset'

function Analytics() {
  return (
    <div className="w-100 h-100 p-3">
      <Row>
        <h4 className="text-start">觀眾概覽</h4>
      </Row>
      <Row>
        <h5 className="text-start">觀眾客層</h5>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body className="d-flex">
              <Row className="d-flex w-100">
                <Col className="m-auto">
                  <Image src={gender} />
                  <p>
                    佔比：男性 <FontAwesomeIcon icon={faInfoCircle} />
                  </p>
                  <h3 className="fw-bold">86.2%</h3>
                  <p>佔據關鍵人數的比例</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body className="d-flex">
              <Row className="d-flex w-100">
                <Col className="m-auto">
                  <Image src={time} />
                  <p>
                    台灣觀看時間 <FontAwesomeIcon icon={faInfoCircle} />
                  </p>
                  <h3 className="fw-bold">86.2%</h3>
                  <p>佔據關鍵人數的比例</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body className="d-flex">
              <Row className="d-flex w-100">
                <Col className="m-auto">
                  <Image src={age} />
                  <p>
                    觀眾年齡分佈 <FontAwesomeIcon icon={faInfoCircle} />
                  </p>
                  <h3 className="fw-bold">25 - 34 歲</h3>
                  <p>佔所有年齡層的26.5%</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <h5 className="text-start">流量來源</h5>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body className="d-flex">
              <Row className="d-flex w-100">
                <Col className="m-auto">
                  <p>
                    瀏覽功能 <FontAwesomeIcon icon={faInfoCircle} />
                  </p>
                  <h6 className="fw-bold">觀看次數：</h6>
                  <h6 className="fw-bold">觀看時數：</h6>
                  <p>總計：</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body className="d-flex">
              <Row className="d-flex w-100">
                <Col className="m-auto">
                  <p>
                    推薦影片 <FontAwesomeIcon icon={faInfoCircle} />
                  </p>
                  <h6 className="fw-bold">觀看次數：</h6>
                  <h6 className="fw-bold">觀看時數：</h6>
                  <p>總計：</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body className="d-flex">
              <Row className="d-flex w-100">
                <Col className="m-auto">
                  <p>
                    搜尋結果 <FontAwesomeIcon icon={faInfoCircle} />
                  </p>
                  <h6 className="fw-bold">觀看次數：</h6>
                  <h6 className="fw-bold">觀看時數：</h6>
                  <p>總計： 1.88％</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Analytics
