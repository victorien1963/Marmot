import React from 'react'
import { Card, Image, Row } from 'react-bootstrap'
import { Comparison as image } from '../../asset'

function Comparison() {
  return (
    <div className="w-100 h-100 p-3">
      <Row>
        <h4 className="text-start">Comparison</h4>
      </Row>
      <Card className="borde mt-4">
        <Image src={image} width="1200px" />
      </Card>
    </div>
  )
}

export default Comparison
