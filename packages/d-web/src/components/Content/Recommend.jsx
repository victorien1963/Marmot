import React, { useState } from 'react'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
  Card,
  Image,
} from 'react-bootstrap'
import video01 from '../../asset/images/video01.png'
import video02 from '../../asset/images/video02.png'
import video03 from '../../asset/images/video03.png'
import bar_a1 from '../../asset/images/bar_a1.png'
import Predict from './Predict'

function Recommend() {
  const topics = [
    'Sustainable fish farming',
    'Semiconductor production',
    'E-bike technology',
    'mRNA vaccine science',
    'Subscription businesses',
  ]

  const [selected, setselected] = useState('')

  return selected ? (
    <div className="w-100 h-100 p-3" style={{ overflow: 'auto' }}>
      <h4 className="text-start text-secondary py-4">Recommentation</h4>
      <Row style={{ height: '60%' }}>
        <Col xs={3} className="px-3 h-100">
          <Card className="h-100 w-100 border-card-1">
            <Card.Body className="d-flex flex-column h-100">
              <h6 className="text-start text-secondary py-2">Topic</h6>
              <Button
                variant="secondary"
                size="sm"
                className="rounded-pill me-auto"
                // onClick={() => setselected(topic)}
              >
                {selected}
              </Button>
              <h6 className="text-start text-secondary pb-2 pt-4">
                Sub topics
              </h6>
              {topics.map((topic) => (
                <Button
                  variant="secondary"
                  key={topic}
                  size="sm"
                  className="rounded-pill me-auto mb-2"
                  onClick={() => setselected(topic)}
                >
                  {topic}
                </Button>
              ))}
            </Card.Body>
          </Card>
        </Col>
        <Col className="px-3 h-100">
          <Card className="h-100 w-100 border-card-1">
            <Card.Body className="h-100">
              <h6 className="text-start text-secondary py-2">Topic</h6>
              <Row className="d-flex w-100">
                <Col>
                  <Image src={video01} width="200" className="rounded" />
                  <h6 className="text-dark py-2">Animation</h6>
                </Col>
                <Col>
                  <Image src={video02} width="200" className="rounded" />
                  <h6 className="text-dark py-2">Talking head</h6>
                </Col>
                <Col>
                  <Image src={video03} width="200" className="rounded" />
                  <h6 className="text-dark py-2">Explainer</h6>
                </Col>
              </Row>
              <h6 className="text-start text-secondary pb-2 pt-5">
                Optimal length and duration
              </h6>
              <Row>
                <Image src={bar_a1} />
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <div style={{ width: '3.5%', height: '50%' }} />
      </Row>
      <Predict />
    </div>
  ) : (
    <div className="w-100 h-100">
      <h4 className="text-start text-secondary py-4">Recommentation</h4>
      <h6 className="text-start text-secondary py-2">Topics</h6>
      <Row className="pe-5">
        {topics.map((topic) => (
          <Col key={topic}>
            <Button
              variant="secondary"
              size="sm"
              className="rounded-pill"
              onClick={() => setselected(topic)}
            >
              {topic}
            </Button>
          </Col>
        ))}
      </Row>
      <Row className="mt-4">
        <Col className="d-flex">
          <InputGroup className="px-3 py-1 searchBar w-50">
            <FormControl
              size="sm"
              // style={{ opacity: '.75' }}
              placeholder="Enter Topic"
              // value={search}
              // onChange={(event) => setSearch(event.target.value)}
              // onFocus={() => setFocus(true)}
              // onBlur={() => setFocus(false)}
              // onKeyDown={(event) => {
              //   if (
              //     event.key === 'Enter' &&
              //     !event.nativeEvent.isComposing &&
              //     focus
              //   ) {
              //     setSearch('')
              //     method(search)
              //   }
              // }}
            />
            <Button size="sm" onClick={() => {}} variant="outline-dark">
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </InputGroup>
          <Button size="sm" variant="dark" className=" my-auto">
            compare
          </Button>
        </Col>
      </Row>
    </div>
  )
}

export default Recommend
