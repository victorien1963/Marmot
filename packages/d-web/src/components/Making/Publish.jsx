import React from 'react'
import { Card, Image, Row } from 'react-bootstrap'
import platforms from '../../asset/images/platforms.png'

function Publish() {
  return (
    <div className="w-100 h-100 overflow-scroll">
      <Row
        className="w-100"
        style={{
          height: '10%',
        }}
      >
        <h4 className="text-start text-secondary py-4 ps-4">
          Publishing Platform
        </h4>
      </Row>
      <Row
        className="w-100"
        style={{
          height: '90%',
        }}
      >
        <Card
          className="bg-light m-auto"
          style={{ width: '95%', height: '95%' }}
        >
          <h5 className="mx-auto py-3">Select a Connection</h5>
          <Image
            src={platforms}
            className="m-auto pb-4"
            style={{
              width: 'auto',
              height: '85%',
              cursor: 'pointer',
              opacity: '.9',
            }}
          />
        </Card>
      </Row>
    </div>
  )
}

export default Publish
