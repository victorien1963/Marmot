import React from 'react'
// import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import { Row } from 'react-bootstrap'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {
//   faCirclePlus,
//   faRotateLeft,
//   faRotateRight,
// } from '@fortawesome/free-solid-svg-icons'
// import { SocketContext } from './ContextProvider'

function TopBar() {
  // const { sendMessage } = useContext(SocketContext)
  const location = useLocation()

  return (
    <Row
      className="bg-black w-100 h-100 d-flex flex-nowrap px-0"
      // ${
      //   location.pathname.includes('admin')
      //     ? 'bg-admin-marmot'
      //     : 'bg-user-marmot'
      // }`}
    >
      {location.pathname === '/' && (
        <div className="d-flex fw-bold text-start h-100">
          <h3 className="my-auto text-light">MARMOT</h3>
        </div>
      )}
      {location.pathname !== '/' && (
        <div className="my-auto fw-bold text-start h-100">
          {location.pathname.includes('admin') ? (
            <div className="bg-light d-flex flex-column justify-content-center">
              <h5>Advertisers</h5>
              <h5>&ensp; Brands</h5>
            </div>
          ) : (
            <div className="bg-light d-flex flex-column justify-content-center">
              <h5>&ensp;Creators</h5>
              <h5>Media Companies</h5>
            </div>
          )}
        </div>
      )}
    </Row>
  )
}

export default TopBar
