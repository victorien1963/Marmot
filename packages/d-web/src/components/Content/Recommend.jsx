import React, { useState } from 'react'
import {
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
  Card,
} from 'react-bootstrap'

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
    <div className="w-100 h-100 p-3">
      <Row>
        <Col xs={5}>
          <h5 className="text-start text-grey py-4">Recommentation</h5>
          <Card>
            <Card.Body className="d-flex flex-column">
              <h6 className="text-start text-grey py-2">Topic</h6>
              <Button
                size="sm"
                className="rounded-pill me-auto"
                // onClick={() => setselected(topic)}
              >
                {selected}
              </Button>
              <h6 className="text-start text-grey py-2">Sub topics</h6>
              {topics.map((topic) => (
                <Button
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
        <Col xs={7}>
          <Card className="h-100">
            <Card.Body>
              <h6 className="text-start text-grey py-2">Topic</h6>
              <h6 className="text-start text-grey py-2">
                Optimal length and duration
              </h6>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  ) : (
    <div className="w-100 h-100">
      <h5 className="text-start text-grey py-4">Recommentation</h5>
      <h6 className="text-start text-grey py-2">Topics</h6>
      <Row>
        {topics.map((topic) => (
          <Col key={topic}>
            <Button
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
        <Col>
          <InputGroup className="px-0 py-1 searchBar">
            <FormControl
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
            <Button
              // title="搜 尋"
              onClick={() => {}}
            >
              generate
              {/* {action || <FontAwesomeIcon icon={faSearch} />} */}
            </Button>
          </InputGroup>
        </Col>
        <Col className="d-flex">
          <Button size="sm" className="rounded-pill btn-mar my-auto">
            compare
          </Button>
        </Col>
      </Row>
    </div>
  )
}

export default Recommend
