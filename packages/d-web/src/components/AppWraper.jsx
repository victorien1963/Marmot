import React, { useEffect, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-bootstrap'
import SideNavBar from './SideNavBar'
import TopBar from './TopBar'
// import GPTHelper from '../daiComponents/GPTHelper'
import { AuthContext } from './ContextProvider'

function AppWrapper({ children }) {
  const { auth } = useContext(AuthContext)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!auth.authed && location.pathname !== '/') {
      navigate('/')
    }
  }, [auth, location])

  return auth.authed ? (
    <div
      className="d-flex flex-column position-relative overflow-hidden"
      style={{
        height: '100vh',
        width: '100vw',
      }}
    >
      <Row className="ps-4" style={{ minHeight: '8%', maxHeight: '8%' }}>
        <TopBar />
      </Row>
      <Row className="flex-fill" style={{ height: '87vh' }}>
        {location.pathname !== '/' && (
          <Col xs="2">
            <SideNavBar setting={{}} />
          </Col>
        )}
        <Col
          xs={location.pathname !== '/' ? 10 : 12}
          className="d-flex flex-column px-0 bg-mar"
        >
          <Row
            className="p-0 overflow-hidden position-relative bg-mar"
            style={{
              height: '100%',
            }}
          >
            {children}
          </Row>
        </Col>
      </Row>
      {/* <Row className="bg-mar text-grey" style={{ height: '5vh' }}>
        <div className="small fw-bold py-2">
          Copyright © 2024 Wavenet. all rights reserved.
        </div>
      </Row> */}
      {/* <GPTHelper setting={{}} /> */}
    </div>
  ) : (
    <div
      className="d-flex position-relative"
      style={{
        height: '100vh',
        width: '100vw',
      }}
    >
      <Col xs={12} className="d-flex flex-column">
        <Row className="flex-fill">{children}</Row>
      </Col>
    </div>
  )
}

AppWrapper.propTypes = {
  children: PropTypes.shape().isRequired,
  //   setting: PropTypes.shape().isRequired,
}

export default AppWrapper
