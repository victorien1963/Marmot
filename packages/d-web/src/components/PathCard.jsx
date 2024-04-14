import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleRadiation } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from './ContextProvider'

function PathCard({ setting }) {
  const {
    title = 'Title',
    subTitle = 'subtitle',
    icon = faCircleRadiation,
    link = '/',
    type = 'user',
  } = setting
  const { auth } = useContext(AuthContext)
  console.log(auth)
  return (
    <Card
      className={`text-center h-100 p-0 border m-auto ${
        type === 'user' ? 'bg-user-marmot' : 'bg-admin-marmot'
      }`}
      style={{ width: '350px' }}
    >
      <Card.Body className="h-100 d-flex flex-column">
        <Row className="h-100">
          <Col className="d-flex" xs={2}>
            <FontAwesomeIcon className="fs-4 mx-auto mt-2" icon={icon} />
          </Col>
          <Col xs={10} className="d-flex flex-column">
            <Row>
              <h5 className="text-start">{title}</h5>
            </Row>
            <Row>
              <h6 className="text-start">{subTitle}</h6>
            </Row>
            <Row className="mt-auto">
              <Col xs={6}>
                <Link
                  to={link}
                  className="align-item-start d-flex w-100"
                  style={{
                    textDecoration: 'none',
                  }}
                >
                  <Button variant="marmot2 rounded-pill w-75 mx-auto">
                    預 覽
                  </Button>
                </Link>
              </Col>
              <Col xs={6}>
                <Link
                  to={link}
                  className="align-item-start d-flex w-100"
                  style={{
                    textDecoration: 'none',
                  }}
                >
                  <Button variant="marmot1 rounded-pill w-75 mx-auto">
                    進 入
                  </Button>
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

PathCard.propTypes = {
  setting: PropTypes.shape().isRequired,
}

export default PathCard
