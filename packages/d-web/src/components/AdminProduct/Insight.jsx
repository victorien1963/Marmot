import React from 'react'
import { Card, Col, Image, Row } from 'react-bootstrap'
import { suzuri, teespring, shopline, shopify } from '../../asset'

function Insight() {
  return (
    <div className="w-100 h-100 overflow-scroll p-3">
      <h4 className="text-secondary text-start pt-3">Sales Overview</h4>
      <Card style={{ height: '150px' }}>
        <Card.Body className="d-flex">
          <Row className="d-flex w-100">
            <Col className="m-auto">
              <h2 className="fw-bolder text-dai-light">$ 263K</h2>
              <h4>Total</h4>
            </Col>
            <Col className="m-auto">
              <h2 className="fw-bolder text-dai-light">$ 100K</h2>
              <h4>shopify</h4>
            </Col>
            <Col className="m-auto">
              <h2 className="fw-bolder text-dai-light">$ 80K</h2>
              <h4>shopline</h4>
            </Col>
            <Col className="m-auto">
              <h2 className="fw-bolder text-dai-light">$ 21K</h2>
              <h4>teespring</h4>
            </Col>
            <Col className="m-auto">
              <h2 className="fw-bolder text-dai-light">$ 62K</h2>
              <h4>suzuri</h4>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <h4 className="text-secondary text-start pt-5">E-commerce platforms</h4>
      <Row>
        <Col className="px-3">
          <Image
            className="card"
            style={{ height: '150px', width: '230px' }}
            src={shopify}
          />
        </Col>
        <Col className="px-3">
          <Image
            className="card"
            style={{ height: '150px', width: '230px' }}
            src={shopline}
          />
        </Col>
        <Col className="px-3">
          <Image
            className="card"
            style={{ height: '150px', width: '230px' }}
            src={teespring}
          />
        </Col>
        <Col className="px-3">
          <Image
            className="card"
            style={{ height: '150px', width: '230px' }}
            src={suzuri}
          />
        </Col>
      </Row>
    </div>
  )
}

export default Insight
