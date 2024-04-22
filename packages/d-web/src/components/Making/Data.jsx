import {
  faAudioDescription,
  faVideoCamera,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Button, Col, Form, Nav, Row } from 'react-bootstrap'

function Title() {
  return (
    <Row className="h-100 w-100">
      <Col className="text-start d-flex flex-column p-3 border-end">
        <h4>Video Metadata</h4>
        <Form.Label>Title</Form.Label>
        <Form.Control />
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={5} />
        <Form.Label>Tags</Form.Label>
        <Form.Control />
        <Row className="p-3">
          <Button variant="mar-outlined ms-auto" className="w-25">
            Confirm
          </Button>
          <Button variant="mar-outlined ms-2" className="w-25">
            Delete
          </Button>
        </Row>
      </Col>
      <Col className="text-start p-3 pt-5">
        <Row>
          <Col>
            <Form.Label>Select Language</Form.Label>
            <Form.Select />
          </Col>
          <Col>
            <Form.Label>Select translation Language</Form.Label>
            <Form.Select />
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
              variant="mar-outlined"
              key={topic}
              size="sm"
              className="rounded-pill"
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
  return <div />
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
