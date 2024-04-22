import React from 'react'
import { Button, Card, Col, Form, Image, Row } from 'react-bootstrap'
import { shopify } from '../../asset'

function EC() {
  const fields = [
    {
      label: '訂單',
    },
    {
      label: '日期',
    },
    {
      label: '顧客',
    },
    {
      label: '總計',
    },
    {
      label: '付款狀態',
    },
    {
      label: '出貨狀態',
    },
    {
      label: '品項',
    },
    {
      label: '標籤',
    },
    {
      label: '配送狀態',
    },
    {
      label: '收件地',
    },
  ]

  const datas = Array.from({ length: 10 }).map((a, index) => ({
    訂單: `#taster1687${index}`,
    日期: '2024-12-31 00:00:00',
    顧客: `顧客${index}`,
    總計: `$${parseInt(Math.random() * 10000, 10)}`,
    付款狀態: '已付款',
    出貨狀態: '未出貨',
    品項: parseInt(Math.random() * 10, 10),
    標籤: '綠界發票/上傳成功',
    配送狀態: '',
    收件地: 'TW 三民區',
  }))

  return (
    <div className="w-100 h-100 overflow-scroll">
      <Row
        className="w-100"
        style={{
          height: '18%',
        }}
      >
        <h4 className="text-secondary w-25 my-auto">E-commerce Orders</h4>
        <Image
          className="my-auto"
          src={shopify}
          style={{
            width: '15%',
            height: '80%',
          }}
        />
        <Button
          style={{
            width: '15%',
          }}
          variant="outline-dark"
          className="ms-auto my-auto"
        >
          Campaign report
        </Button>
        <Button
          style={{
            width: '15%',
          }}
          variant="outline-dark"
          className="ms-2 my-auto"
        >
          Synchronize orders
        </Button>
      </Row>
      <Row
        className="w-100 ps-3"
        style={{
          height: '82%',
        }}
      >
        <Card className="w-100 h-100 px-0">
          <Card.Body className="h-100 overflow-scroll">
            <Row className="flex-nowrap">
              <Col xs={1}>
                <Form.Check />
              </Col>
              {fields.map(({ label }) => (
                <Col key={label} xs={3}>
                  {label}
                </Col>
              ))}
            </Row>
            {datas.map((r, i) => (
              <Row className="flex-nowrap" key={i}>
                <Col className="border-top py-2" xs={1}>
                  <Form.Check />
                </Col>
                {fields.map(({ label }) => (
                  <Col className="d-flex border-top" key={label} xs={3}>
                    <p className="m-auto">{r[label]}</p>
                  </Col>
                ))}
              </Row>
            ))}
          </Card.Body>
        </Card>
      </Row>
    </div>
  )
}

export default EC
