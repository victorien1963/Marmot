import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { Card, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleRadiation } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from './ContextProvider'

function PathSign({ setting }) {
  const {
    title = 'Title',
    subTitle = '',
    icon = faCircleRadiation,
    link = '/',
    type = 'user',
  } = setting
  const { auth } = useContext(AuthContext)
  const navigate = useNavigate()
  if (!auth) console.log('impossible')
  return (
    <Card
      className={`text-center h-100 p-5 border m-auto ${
        type === 'user' ? 'bg-user-marmot' : 'bg-admin-marmot'
      }`}
      onClick={() => navigate(link)}
      style={{ width: '350px', opacity: '.75', cursor: 'pointer' }}
    >
      <Card.Body className="h-100 d-flex flex-column">
        <Row className="h-100">
          <Col className="d-flex" xs={2}>
            <FontAwesomeIcon className="fs-4 m-auto" icon={icon} />
          </Col>
          <Col xs={10} className="d-flex flex-column justify-content-center">
            <Row>
              <h5 className="text-start m-0">{title}</h5>
            </Row>
            {subTitle && (
              <Row>
                <h6 className="text-start m-0">{subTitle}</h6>
              </Row>
            )}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

PathSign.propTypes = {
  setting: PropTypes.shape().isRequired,
}

export default PathSign
