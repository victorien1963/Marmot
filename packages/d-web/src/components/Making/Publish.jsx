import React from 'react'
import { Row } from 'react-bootstrap'

function Publish() {
  return (
    <div className="w-100 h-100 overflow-scroll">
      <Row
        className="w-100"
        style={{
          height: '6%',
        }}
      >
        <h4 className="text-start text-grey py-4">發佈平台</h4>
      </Row>
      <Row
        className="w-100"
        style={{
          height: '94%',
        }}
      />
    </div>
  )
}

export default Publish
