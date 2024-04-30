/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react'
import moment from 'moment'
import { DateRange } from 'react-date-range'
import {
  Card,
  Col,
  Image,
  Row,
  Form,
  InputGroup,
  Button,
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import {
  age,
  gender,
  map01,
  preview02,
  preview03,
  q01,
  time,
} from '../../asset'

function Analytics() {
  const [showDate, setshowDate] = useState(false)
  const [date, setdate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  })
  const [data, setdata] = useState({
    originName: '',
    date: '',
    type: '',
  })

  const onDataChange = (e) =>
    setdata({ ...data, [e.target.name]: e.target.value })

  return (
    <div
      className="w-100 h-100 p-3"
      style={{ overflowY: 'auto', overflowX: 'hidden' }}
    >
      <Row>
        <Col xs={8}>
          <h4 className="text-start">觀眾概覽</h4>
        </Col>
        <Col xs={4} className="d-flex px-4">
          <InputGroup>
            <Form.Label className="px-2 my-auto">Date</Form.Label>
            <Form.Control
              // name={f.name}
              value={data.date || ''}
              // placeholder={f.placeholder}
              type="text"
              onFocus={() => setshowDate(!showDate)}
              readOnly
            />
            <div
              style={{
                height: showDate ? '100%' : '0%',
                transition: 'height .3s ease-in',
                position: 'absolute',
                zIndex: '999',
                top: '100%',
              }}
            >
              {showDate && (
                <DateRange
                  ranges={[date]}
                  editableDateInputs
                  onChange={({ selection }) => {
                    setdate(selection)
                    onDataChange({
                      target: {
                        name: 'date',
                        value: `${moment(selection.startDate).format(
                          'yyyy-MM-DD'
                        )}-${moment(selection.endDate).format('yyyy-MM-DD')}`,
                      },
                    })
                  }}
                  moveRangeOnFirstSelection={false}
                />
              )}
            </div>
            <Button
              variant="outline-dark"
              onClick={() => setshowDate(!showDate)}
            >
              <FontAwesomeIcon icon={faCalendarAlt} />
            </Button>
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <h6 className="text-start ps-4">觀眾客層</h6>
      </Row>
      <Row className="px-4 pb-4">
        <Col>
          <Card className="h-100">
            <Card.Body className="d-flex">
              <Row className="d-flex w-100">
                <Col className="m-auto">
                  <Image src={gender} />
                  <p>
                    佔比：男性 <FontAwesomeIcon icon={faInfoCircle} />
                  </p>
                  <h3 className="fw-bold">86.2%</h3>
                  <p>佔據關鍵人數的比例</p>
                  <p>(2023-12-01 ~ 2024-01-01)</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="h-100 pt-5">
            <Card.Body className="d-flex">
              <Row className="d-flex w-100">
                <Col className="m-auto">
                  <Image src={time} />
                  <p>
                    台灣觀看時間 <FontAwesomeIcon icon={faInfoCircle} />
                  </p>
                  <h3 className="fw-bold" style={{ color: '#d846ef' }}>
                    86.2%
                  </h3>
                  <Image src={q01} width="300px" />
                  <p>(2023-12-01 ~ 2024-01-01)</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="h-100">
            <Card.Body className="d-flex">
              <Row className="d-flex w-100">
                <Col className="m-auto">
                  <Image src={age} />
                  <p>
                    觀眾年齡分佈 <FontAwesomeIcon icon={faInfoCircle} />
                  </p>
                  <h3 className="fw-bold" style={{ color: '#12b9a6' }}>
                    25 - 34 歲
                  </h3>
                  <p>佔所有年齡層的 26.5%</p>
                  <p>(2023-12-01 ~ 2024-01-01)</p>
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
                  <Image src={preview02} width="320px" />
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
                  <Image src={preview03} width="320px" />
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
