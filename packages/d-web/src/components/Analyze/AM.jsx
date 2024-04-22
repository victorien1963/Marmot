import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'

function AM() {
  return (
    <div className="w-100 h-100 p-3">
      <Row className="h-50 p-3">
        <Card className="h-100 w-100 border-card-2">
          <Card.Body className="h-100 w-100 d-flex flex-column">
            <Row>
              <h4 className="text-start">Premuim Content View</h4>
            </Row>
            <Row className="flex-fill w-100 d-flex">
              {[
                {
                  label: 'Total',
                  number: 183,
                },
                {
                  label: 'Memberships',
                  number: 66,
                },
                {
                  label: 'Courses',
                  number: 97,
                },
                {
                  label: 'Super Thanks',
                  number: 102,
                },
                {
                  label: 'Super Chat & Super Sticks',
                  number: 99,
                },
              ].map(({ label, number }) => (
                <Col
                  className="d-flex flex-column justify-content-center"
                  key={label}
                >
                  <Row className="py-2">
                    <h3>${number}</h3>
                  </Row>
                  <Row className="text-start">
                    <h5 className="text-center">{label}</h5>
                  </Row>
                </Col>
              ))}
            </Row>
          </Card.Body>
        </Card>
      </Row>
      <Row className="h-50 p-3">
        <Card className="h-100 w-100 border-card-2">
          <Card.Body className="h-100 w-100 d-flex flex-column">
            <Row>
              <h4 className="text-start">Merchandise Overview</h4>
            </Row>
            <Row className="flex-fill w-100 d-flex">
              {[
                {
                  label: 'Total',
                  number: 183,
                },
                {
                  label: 'Shopify',
                  number: 66,
                },
                {
                  label: 'Shopline',
                  number: 97,
                },
                {
                  label: 'Merchandise shelf',
                  number: 102,
                },
                {
                  label: 'Livestream',
                  number: 99,
                },
              ].map(({ label, number }) => (
                <Col
                  className="d-flex flex-column justify-content-center"
                  key={label}
                >
                  <Row className="py-2">
                    <h3>${number}</h3>
                  </Row>
                  <Row className="text-start">
                    <h5 className="text-center">{label}</h5>
                  </Row>
                </Col>
              ))}
            </Row>
          </Card.Body>
        </Card>
      </Row>
    </div>
  )
}

export default AM
