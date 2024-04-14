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
      className={`w-100 h-100 d-flex flex-nowrap py-2 ${
        location.pathname.includes('admin')
          ? 'bg-admin-marmot'
          : 'bg-user-marmot'
      }`}
    >
      {location.pathname === '/' && (
        <div className="d-flex fw-bold text-start h-100">
          <h4 className="my-auto">儀表板</h4>
        </div>
      )}
      {location.pathname !== '/' && (
        <div className="my-auto fw-bold text-start h-100">
          {location.pathname.includes('admin') ? (
            <div className="bg-admin-marmot d-flex flex-column justify-content-center">
              <h5>廣告商</h5>
              <h5>&ensp;品牌</h5>
            </div>
          ) : (
            <div className="bg-user-marmot d-flex flex-column justify-content-center">
              <h5>&ensp;創作者</h5>
              <h5>媒體公司</h5>
            </div>
          )}
        </div>
      )}
    </Row>
  )
}

export default TopBar
