import React from 'react'
import { Card, Col, Image, Row } from 'react-bootstrap'
import {
  Topsuperthanks,
  Topvideos01,
  Topvideos02,
  Topvideos03,
  Topvideos04,
} from '../../asset'

function SuperThanks() {
  return (
    <div
      className="w-100 h-100 p-3"
      style={{ overflowY: 'auto', overflowX: 'hidden' }}
    >
      <Row>
        <h4 className="text-start">Super Thanks</h4>
      </Row>
      <Row>
        <h6 className="text-start pt-3">Top videos</h6>
      </Row>
      <Row>
        <Col xs={3}>
          <Card className="h-100">
            <Card.Body className="d-flex">
              <Row className="d-flex w-100">
                <Col className="m-auto">
                  <Image src={Topvideos01} width="250px" />
                  <h5 className="text-start pt-2">
                    為什麼不多蓋點水庫？台灣缺水問題有解嗎？ft. 水利署署長
                  </h5>
                  <div className="text-center">
                    <h4>30</h4>
                    <h5>Watch Hours</h5>
                    <h4 className="pt-2">30,000</h4>
                    <h5>Total views</h5>
                    <h4 className="pt-2">$200.00</h4>
                    <h5>Super Thanks</h5>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={3}>
          <Card className="h-100">
            <Card.Body className="d-flex">
              <Row className="d-flex w-100">
                <Col className="m-auto">
                  <Image src={Topvideos02} width="250px" />
                  <h5 className="text-start pt-2">
                    一片烏雲就能讓太陽能系統崩潰？太陽能發電其實不簡單？ft.經濟部能源署
                  </h5>
                  <div className="text-center">
                    <h4>30</h4>
                    <h5>Watch Hours</h5>
                    <h4 className="pt-2">30,000</h4>
                    <h5>Total views</h5>
                    <h4 className="pt-2">$200.00</h4>
                    <h5>Super Thanks</h5>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={3}>
          <Card className="h-100">
            <Card.Body className="d-flex">
              <Row className="d-flex w-100">
                <Col className="m-auto">
                  <Image src={Topvideos03} width="250px" />
                  <h5 className="text-start pt-2">
                    台灣每天受到超過2000萬次網路攻擊，境外假訊息攻擊世界第一多...
                  </h5>
                  <div className="text-center">
                    <h4>30</h4>
                    <h5>Watch Hours</h5>
                    <h4 className="pt-2">30,000</h4>
                    <h5>Total views</h5>
                    <h4 className="pt-2">$200.00</h4>
                    <h5>Super Thanks</h5>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={3}>
          <Card className="h-100">
            <Card.Body className="d-flex">
              <Row className="d-flex w-100">
                <Col className="m-auto">
                  <Image src={Topvideos04} width="250px" />
                  <h5 className="text-start pt-2">
                    沒扇葉的風車為何還能發電？都市也能發展風力發電嗎？
                  </h5>
                  <div className="text-center">
                    <h4>30</h4>
                    <h5>Watch Hours</h5>
                    <h4 className="pt-2">30,000</h4>
                    <h5>Total views</h5>
                    <h4 className="pt-2">$200.00</h4>
                    <h5>Super Thanks</h5>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="pt-4">
        <h4 className="text-start">Top Super Thanks</h4>
        <div className="px-3">
          <Card className="border">
            <Image src={Topsuperthanks} />
          </Card>
        </div>
      </Row>
    </div>
  )
}

export default SuperThanks
