import React from 'react'
import { Card, Col, Image, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { age, gender, map01, preview02, preview03, time } from '../../asset'

function Analytics() {
  return (
    <div
      className="w-100 h-100 p-3"
      style={{ overflowY: 'auto', overflowX: 'hidden' }}
    >
      <Row>
        <h4 className="text-start">觀眾概覽</h4>
      </Row>
      <Row>
        <h6 className="text-start ps-4">觀眾客層</h6>
      </Row>
      <Row className="px-4 pb-4">
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
        <h6 className="text-start ps-4">流量來源</h6>
      </Row>
      <Row className="px-4">
        <Col>
          <Card>
            <Card.Body className="d-flex">
              <Row className="d-flex w-100">
                <Col className="m-auto">
                  <p>
                    瀏覽功能 <FontAwesomeIcon icon={faInfoCircle} />
                  </p>
                  <h6 className="fw-bold">觀看次數：1.9M</h6>
                  <h6 className="fw-bold">觀看時數：133.1K</h6>
                  <p>總計：46.67%</p>
                  <Image src={preview02} width="350px" />
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
                  <h6 className="fw-bold">觀看次數：414.3K</h6>
                  <h6 className="fw-bold">觀看時數：84.7K</h6>
                  <p>總計：10.26%</p>
                  <Image src={preview03} width="350px" />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="h-100">
            <Card.Body className="d-flex">
              <Row className="d-flex w-100 mb-auto">
                <Col className="m-auto">
                  <p>
                    搜尋結果 <FontAwesomeIcon icon={faInfoCircle} />
                  </p>
                  <h6 className="fw-bold">觀看次數：76.0K</h6>
                  <h6 className="fw-bold">觀看時數：4.0K</h6>
                  <p>總計： 1.88％</p>
                  <hr />
                  <h6 className="text-start">熱門搜尋字詞</h6>
                  <Row className="py-3">
                    <Col>泛科學</Col>
                    <Col>冷知識</Col>
                  </Row>
                  <Row>
                    <Col>學術研究</Col>
                    <Col>科學生</Col>
                  </Row>
                  <Row className="py-3">
                    <Col>泛科知識</Col>
                    <Col>常識</Col>
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="pt-4">
        <h4 className="text-start">Additional features</h4>
      </Row>
      <h6 className="text-start">Global Viewership</h6>
      <Image
        src={map01}
        width="1000px"
        style={{ cursor: 'pointer', borderRadius: '5px' }}
      />
    </div>
  )
}

export default Analytics
