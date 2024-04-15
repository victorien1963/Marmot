import React, { useContext } from 'react'
// import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import { Row, Button, DropdownButton, Image } from 'react-bootstrap'
import { AuthContext } from './ContextProvider'
import Avatar from '../daiComponents/Avatar'
import MenuCard from '../daiComponents/MeunCard'
import { logo_mar } from '../asset'
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
  const { setAuth } = useContext(AuthContext)

  return (
    <Row
      className="bg-mar w-100 h-100 d-flex flex-nowrap px-0"
      style={{ borderBottom: '1px solid #262d41' }}
      // ${
      //   location.pathname.includes('admin')
      //     ? 'bg-admin-marmot'
      //     : 'bg-user-marmot'
      // }`}
    >
      {location.pathname === '/' && (
        <div className="d-flex fw-bold text-start h-100">
          <Image src={logo_mar} height="32" className="my-auto me-3" />
          <h3 className="my-auto text-mar-linear">MARMOT</h3>
        </div>
      )}
      {location.pathname !== '/' && (
        <div className="my-auto fw-bold text-start h-100 px-0">
          {location.pathname.includes('admin') ? (
            <div className="d-flex h-100 ps-3 bg-mar text-mar-linear d-flex justify-content-center">
              <h5 className="my-auto">Advertisers Brands</h5>
              <div
                className="h-100 ms-auto"
                style={{
                  width: '3.5%',
                }}
              >
                <DropdownButton
                  id="dropdown-button-drop-end"
                  drop="end"
                  className="h-100 w-100 text-light"
                  title={
                    <div className="fw-bolder text-light">
                      <div
                        style={{
                          height: '30px',
                        }}
                      >
                        <Avatar />
                      </div>
                      {/* {auth.name} */}
                    </div>
                  }
                >
                  <MenuCard />
                </DropdownButton>
              </div>
              <div
                className="h-100 ms-1 d-flex"
                style={{
                  width: '6%',
                }}
              >
                <Button
                  onClick={() => {
                    document.cookie = `token=; Domain=${window.location.hostname}; Path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`
                    setAuth({
                      authed: false,
                    })
                    window.location.replace('/')
                  }}
                  className="my-auto"
                  variant="outline-light"
                  size="sm"
                >
                  Logout
                </Button>
              </div>
            </div>
          ) : (
            <div className="d-flex h-100 ps-3 pe-0 bg-mar text-mar-linear d-flex justify-content-center">
              <h5 className="my-auto">Creators Media Companies</h5>
              <div
                className="h-100 ms-auto"
                style={{
                  width: '3.5%',
                }}
              >
                <DropdownButton
                  id="dropdown-button-drop-end"
                  drop="end"
                  className="h-100 w-100 text-light"
                  title={
                    <div className="fw-bolder">
                      <div
                        style={{
                          height: '30px',
                        }}
                      >
                        <Avatar />
                      </div>
                      {/* {auth.name} */}
                    </div>
                  }
                >
                  <MenuCard />
                </DropdownButton>
              </div>
              <div
                className="h-100 ms-1 d-flex"
                style={{
                  width: '6%',
                }}
              >
                <Button
                  onClick={() => {
                    document.cookie = `token=; Domain=${window.location.hostname}; Path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`
                    setAuth({
                      authed: false,
                    })
                    window.location.replace('/')
                  }}
                  className="my-auto"
                  variant="mar"
                  size="sm"
                >
                  Logout
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </Row>
  )
}

export default TopBar
