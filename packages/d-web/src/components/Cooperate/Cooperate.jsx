import {
  faBars,
  faHeart,
  faInfoCircle,
  faMagnifyingGlass,
  faPen,
  faSliders,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Card, Col, Form, Row } from 'react-bootstrap'

function Cooperate() {
  const fields = [
    {
      label: '頻道名稱',
    },
    {
      label: '訂閱數',
    },
    {
      label: '觀看次數',
    },
    {
      label: '月平均觀看數',
    },
    {
      label: '季平均觀看數',
    },
    {
      label: '年平均觀看數',
    },
    {
      label: '參與次數',
    },
    {
      label: '更新頻率',
    },
  ]

  const datas = Array.from({ length: 10 }).map((a, index) => ({
    頻道名稱: `頻道${index}`,
    訂閱數: parseInt(Math.random() * 1000000, 10),
    觀看次數: parseInt(Math.random() * 1000000, 10),
    月平均觀看數: parseInt(Math.random() * 100, 10),
    季平均觀看數: parseInt(Math.random() * 10000, 10),
    年平均觀看數: parseInt(Math.random() * 1000000, 10),
    參與次數: parseInt(Math.random() * 1000, 10),
    更新頻率: parseFloat(Math.random() * 1, 10),
  }))

  return (
    <div className="w-100 h-100 overflow-scroll">
      <Row
        className="w-100"
        style={{
          height: '13%',
        }}
      >
        <h4 className="text-start text-grey pt-3">合作申請</h4>
        <h6 className="text-start text-grey">請提交案件包以申請廣告合作。</h6>
      </Row>
      <Row
        className="w-100 text-grey"
        style={{
          height: '5%',
        }}
      >
        <Col className="d-flex flex-fill" xs={1}>
          <p
            className="my-auto"
            style={{
              cursor: 'pointer',
            }}
          >
            ➊&ensp;選取創作者
          </p>
        </Col>
        <Col className="d-flex flex-fill" xs={3}>
          <hr className="w-100 my-auto" />
        </Col>
        <Col className="d-flex flex-fill" xs={1}>
          <p
            className="my-auto"
            style={{
              cursor: 'pointer',
            }}
          >
            ➋&ensp;選取案件包
          </p>
        </Col>
        <Col className="d-flex flex-fill" xs={3}>
          <hr className="w-100 my-auto" />
        </Col>
        <Col className="d-flex flex-fill" xs={1}>
          <p
            className="my-auto"
            style={{
              cursor: 'pointer',
            }}
          >
            ➌&ensp;申請合作
          </p>
        </Col>
      </Row>
      <Row
        className="w-100 ps-3"
        style={{
          height: '82%',
        }}
      >
        <Card className="w-100 h-100 px-0">
          <Card.Header
            className="w-100 bg-grey rounded-top"
            style={{
              height: '10%',
            }}
          >
            <Row className="w-100 h-100">
              <Col className="d-flex" xs={3}>
                <h6 className="m-auto">
                  可查看及選取創作者頻道&ensp;
                  <FontAwesomeIcon icon={faInfoCircle} />
                </h6>
              </Col>
              <Col xs={1} className="ms-auto d-flex">
                <FontAwesomeIcon
                  className="fs-4 m-auto"
                  icon={faMagnifyingGlass}
                />
              </Col>
              <Col xs={1} className="d-flex">
                <FontAwesomeIcon className="fs-4 m-auto" icon={faBars} />
              </Col>
              <Col xs={1} className="d-flex">
                <FontAwesomeIcon className="fs-4 m-auto" icon={faSliders} />
              </Col>
            </Row>
          </Card.Header>
          <Card.Body className="h-100 overflow-scroll">
            <Row className="flex-nowrap">
              <Col xs={1}>
                <Form.Check />
              </Col>
              <Col xs={1} />
              <Col xs={1}>操作</Col>
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
                <Col className="d-flex border-top" xs={1}>
                  <FontAwesomeIcon className="fs-5 m-auto" icon={faHeart} />
                </Col>
                <Col className="d-flex border-top" xs={1}>
                  <FontAwesomeIcon className="fs-5 m-auto" icon={faPen} />
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

export default Cooperate
