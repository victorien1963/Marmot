import React from 'react'
import { Card, Image, Row } from 'react-bootstrap'

function Comparison() {
  return (
    <div className="w-100 h-100 p-3">
      <Row>
        <h4 className="text-start">Comparison</h4>
      </Row>
      <Card className="border">
        <Image src={Comparison} />
      </Card>
    </div>
  )
}

export default Comparison
