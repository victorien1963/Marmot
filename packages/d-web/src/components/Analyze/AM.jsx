import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Col, Row } from 'react-bootstrap'
import SuperThanks from './SuperThanks'
import SuperChatAndSuperStickers from './SuperChatAndSuperStickers'

function AM() {
  const navigate = useNavigate()

  const [selected, setselected] = useState('')
  const handleBack = () => setselected('')
  const components = {
    SuperThanks: <SuperThanks setting={{ handleBack }} />,
    SuperChatAndSuperStickers: (
      <SuperChatAndSuperStickers setting={{ handleBack }} />
    ),
  }

  return selected ? (
    components[selected]
  ) : (
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
                  onClick: () =>
                    navigate('/user/paycontent/memberships', { replace: true }),
                },
                {
                  label: 'Courses',
                  number: 97,
                  onClick: () =>
                    navigate('/user/paycontent/courses', { replace: true }),
                },
                {
                  label: 'Super Thanks',
                  number: 102,
                  onClick: () => setselected('SuperThanks'),
                },
                {
                  label: 'Super Chat & Super Sticks',
                  number: 99,
                  onClick: () => setselected('SuperChatAndSuperStickers'),
                },
              ].map(({ label, number, onClick }) => (
                <Col
                  className="d-flex flex-column justify-content-center hoverCard"
                  key={label}
                  onClick={onClick}
                  style={{
                    cursor: onClick ? 'pointer' : 'auto',
                  }}
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
                  onClick: () =>
                    navigate('/user/product/insight', { replace: true }),
                },
              ].map(({ label, number, onClick }) => (
                <Col
                  className="d-flex flex-column justify-content-center hoverCard"
                  key={label}
                  onClick={onClick}
                  style={{
                    cursor: onClick ? 'pointer' : 'auto',
                  }}
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
