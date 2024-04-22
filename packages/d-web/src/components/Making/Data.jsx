import {
  faAudioDescription,
  faVideoCamera,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Button, Card, Col, Form, Image, Nav, Row } from 'react-bootstrap'
import {
  colour_bar,
  func01,
  func02,
  func03,
  func04,
  preview01,
  preview02,
  preview03,
  thumbnail01,
  type01,
  type02,
  type03,
  type04,
} from '../../asset'

function Title() {
  return (
    <Row className="h-100 w-100">
      <Col className="text-start d-flex flex-column p-3 border-end">
        <h4>Video Metadata</h4>
        <Form.Label>Title</Form.Label>
        <Form.Control
          className="mb-3"
          value="太陽能板底下能養魚嗎？ ft. 經濟部能源署"
        />
        <Form.Label>Description</Form.Label>
        <Form.Control
          className="mb-3"
          as="textarea"
          rows={5}
          value="想和我們有更多互動嗎？加入會員 ► https://lihi1.com/BWeoe


建議開啟cc字幕，獲得最佳觀看體驗
00:00 氣候變遷下的漁業挑戰
01:54 淺坪式漁塭養殖
04:15 文蛤為什麼會暴斃？"
        />
        <Form.Label>Tags</Form.Label>
        <Form.Control />
        <Row className="p-3">
          <Button variant="outline-secondary" className="w-25 ms-auto">
            Delete
          </Button>
          <Button variant="outline-success" className="w-25 ms-2">
            Confirm
          </Button>
        </Row>
      </Col>
      <Col className="text-start p-3 pt-5">
        <Row>
          <Col>
            <Form.Label>Select Language</Form.Label>
            <Form.Select>
              <option value="" className="d-none">
                Chinese
              </option>
            </Form.Select>
          </Col>
          <Col>
            <Form.Label>Select translation Language</Form.Label>
            <Form.Select>
              <option value="" className="d-none">
                English
              </option>
            </Form.Select>
          </Col>
        </Row>
        <Row className="mt-3">
          <h5>Suggested Keywords</h5>
        </Row>
        <Row className="mt-2">
          {['永續魚類養殖', '環保', '藍色食物', '氣候變遷'].map((topic) => (
            <div className="w-25 rounded-pill px-3 mb-2">
              <Button
                variant="secondary"
                key={topic}
                size="sm"
                className="rounded-pill w-100"
                onClick={() => {}}
              >
                {topic}
              </Button>
            </div>
          ))}
        </Row>
        <Row className="mt-3">
          <h5>Similar Titles</h5>
          <Form.Label>不只種電... 太陽能板下種菜 年產值3千萬</Form.Label>
          <Form.Label>太陽光潛「能」無窮 綠色發電還能養魚</Form.Label>
          <Form.Label>最大海上光電廠 環保憂浮動太陽能板“壓死”潮間帶</Form.Label>
          <Form.Label>太陽能板底下有魚！一湖兩用飄來「綠色金條」</Form.Label>
        </Row>
        <Row className="mt-3">
          <h5>Suggested Tags</h5>
        </Row>
        <Row>
          {[
            '能源',
            '水產養殖方法',
            '補魚機械',
            '亞洲的永續分區實踐',
            '評估養魚效率',
            '養殖漁業',
            '企業永續',
            'ＥＳＧ',
            '生態循環',
          ].map((topic) => (
            // <div className="rounded-pill px-3 mb-2">
            <Button
              variant="secondary"
              key={topic}
              size="sm"
              className="rounded-pill mt-1 ms-3"
              style={{
                minWidth: '10%',
                maxWidth: '30%',
              }}
              onClick={() => {}}
            >
              + {topic}
            </Button>
            // </div>
          ))}
        </Row>
      </Col>
    </Row>
  )
}

function Thumbnail() {
  return (
    <>
      <Row style={{ height: '6%' }}>
        <Col className="text-start d-flex flex-column p-3">
          <h4>Thumbnail</h4>
        </Col>
      </Row>
      <Row style={{ height: '94%' }}>
        <Col xs={6}>
          <Nav variant="tabs" className="pt-3" defaultActiveKey="/new">
            <Nav.Item>
              <Nav.Link href="/new">New</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-1" disabled>
                Upload
              </Nav.Link>
            </Nav.Item>
            <div className="py-1 ms-auto">
              <Button variant="outline-secondary" size="sm" className="ms-auto">
                Delete
              </Button>
              <Button variant="outline-success" size="sm" className="ms-2">
                Confirm
              </Button>
            </div>
          </Nav>
          <Row className="pt-3">
            <Image
              src={thumbnail01}
              className="m-auto"
              style={{ width: '300px' }}
            />
          </Row>
          <hr />
          <Row>
            <Col xs={6} className="d-flex">
              <Image
                src={type01}
                style={{ height: '110px', cursor: 'pointer' }}
                className="ms-auto"
              />
            </Col>
            <Col xs={6} className="d-flex">
              <Image
                src={type02}
                style={{ height: '110px', cursor: 'pointer' }}
                className="me-auto"
              />
            </Col>
          </Row>
          <Row className="pt-3">
            <Col xs={6} className="d-flex">
              <Image
                src={type03}
                style={{ height: '110px', cursor: 'pointer' }}
                className="ms-auto"
              />
            </Col>
            <Col xs={6} className="d-flex">
              <Image
                src={type04}
                style={{ height: '110px', cursor: 'pointer' }}
                className="me-auto"
              />
            </Col>
          </Row>
          <Row className="p-3">
            <Col xs={7} className="d-flex">
              <Image
                src={func01}
                style={{ width: '50px', height: '50px', cursor: 'pointer' }}
                className="m-auto"
              />
              <Image
                src={func02}
                style={{ width: '50px', cursor: 'pointer' }}
                className="m-auto"
              />
              <Image
                src={func03}
                style={{ width: '50px', cursor: 'pointer' }}
                className="m-auto"
              />
              <Image
                src={func04}
                style={{ width: '50px', cursor: 'pointer' }}
                className="m-auto"
              />
            </Col>
            <Col xs={5}>
              <Image
                src={colour_bar}
                style={{ width: '200px', cursor: 'pointer' }}
                className="ms-auto py-3"
              />
            </Col>
          </Row>
        </Col>
        <Col xs={6} className="mt-5 pt-2">
          <Card style={{ height: '75%' }}>
            <Row>
              <Col xs={8} className="pt-2 ps-5 py-2 text-start">
                Thumbnail A/B testing
              </Col>
              <Col xs={4} className="py-1 py-2 ms-auto">
                <Button
                  variant="outline-secondary"
                  size="sm"
                  className="ms-auto"
                >
                  Select
                </Button>
                <Button variant="outline-secondary" size="sm" className="ms-2">
                  Select All
                </Button>
              </Col>
            </Row>
            <Row className="py-4">
              <Col xs={6}>
                <div className="d-flex">
                  <Form.Check type="checkbox" className="ms-auto" />
                  <Image
                    src={preview01}
                    style={{ height: '110px', cursor: 'pointer' }}
                    className="m-auto"
                  />
                </div>
                <h6 className="mx-auto ps-5">thumbnail_image_01 </h6>
              </Col>
              <Col xs={6}>
                <div className="d-flex">
                  <Form.Check type="checkbox" className="ms-auto" />
                  <Image
                    src={preview02}
                    style={{ height: '110px', cursor: 'pointer' }}
                    className="m-auto"
                  />
                </div>
                <h6 className="mx-auto ps-5">thumbnail_image_02 </h6>
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <div className="d-flex">
                  <Form.Check type="checkbox" className="ms-auto" />
                  <Image
                    src={preview03}
                    style={{ height: '110px', cursor: 'pointer' }}
                    className="m-auto"
                  />
                </div>
                <h6 className="mx-auto ps-5">thumbnail_image_03 </h6>
              </Col>
              <Col xs={6} />
            </Row>
            <Row className="ms-auto mt-auto p-3">
              <Col>
                <Button variant="success" size="sm" className="ms-2">
                  Edit
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  )
}

function Data() {
  const [page, setpage] = useState('Title')
  const pages = {
    Title: <Title />,
    thumbnail: <Thumbnail />,
  }
  const icons = {
    Title: faAudioDescription,
    thumbnail: faVideoCamera,
  }
  return (
    <div className="w-100 h-100 overflow-scroll">
      <Row
        style={{
          height: '6%',
          backgroundColor: '#eee',
        }}
      >
        <Nav
          className="ms-auto pe-5 w-100 d-flex"
          // style={{ borderRight: '1px solid #fff' }}
        >
          {Object.keys(pages).map((key) => (
            <Nav.Link
              key={key}
              className="text-secondary fs-5"
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
