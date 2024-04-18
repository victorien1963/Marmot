import {
  faAudioDescription,
  faVideoCamera,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Nav, Row } from 'react-bootstrap'

function Data() {
  const [page, setpage] = useState('標題/說明')
  const pages = {
    '標題/說明': <div />,
    影片縮圖: <div />,
  }
  const icons = {
    '標題/說明': faAudioDescription,
    影片縮圖: faVideoCamera,
  }
  return (
    <div className="w-100 h-100 overflow-scroll">
      <Row
        className="w-100"
        style={{
          height: '6%',
        }}
      >
        <Nav
          className="ms-auto pe-5 w-100 d-flex"
          // style={{ borderRight: '1px solid #fff' }}
        >
          {Object.keys(pages).map((key) => (
            <Nav.Link
              key={key}
              className="text-light"
              href=""
              onClick={() => setpage(key)}
            >
              <FontAwesomeIcon icon={icons[key]} />
              &ensp;{key}
            </Nav.Link>
          ))}
        </Nav>
      </Row>
      <Row
        className="w-100"
        style={{
          height: '94%',
        }}
      >
        {pages[page]}
      </Row>
    </div>
  )
}

export default Data
