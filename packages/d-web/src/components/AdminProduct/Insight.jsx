import React from 'react'
import { Card, Col, Image, Row } from 'react-bootstrap'
import { suzuri, teespring, shopline, shopify } from '../../asset'

function Insight() {
  return (
    <div className="w-100 h-100 overflow-scroll p-3">
      <h4 className="text-grey text-start">產品銷售概覽</h4>
      <Card>
        <Card.Body>
          <Row>
            <Col>
              <h3>$ 100K</h3>
              <h4>總數</h4>
            </Col>
            <Col>
              <h3>$ 100K</h3>
              <h4>shopify</h4>
            </Col>
            <Col>
              <h3>$ 100K</h3>
              <h4>shopline</h4>
            </Col>
            <Col>
              <h3>$ 100K</h3>
              <h4>teespring</h4>
            </Col>
            <Col>
              <h3>$ 100K</h3>
              <h4>suzuri</h4>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <h4 className="text-grey text-start">整合電商</h4>
      <Row>
        <Col>
          <Image src={shopify} />
        </Col>
        <Col>
          <Image src={shopline} />
        </Col>
        <Col>
          <Image src={teespring} />
        </Col>
        <Col>
          <Image src={suzuri} />
        </Col>
      </Row>
    </div>
  )
}

export default Insight
