/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import PropTypes from 'prop-types'
// Helpers
import {
  Col,
  Row,
  OverlayTrigger,
  Popover,
  Button,
  Form,
} from 'react-bootstrap'
import { ChannelBox, ChannelLogo } from 'planby'
import Planner from './Planner'

export function ChannelItem({ setting }) {
  const { isVerticalMode, channel } = setting
  const { position, logo } = channel

  return (
    <ChannelBox
      data-testid="sidebar-item"
      isVerticalMode={isVerticalMode}
      style={{
        border: '1px solid transparent',
        // borderBottomColor: '#7180961a',
        // borderRightColor: '#7180961a',
        borderBottomColor: '#ddd',
        borderRightColor: '#ddd',
        backgroundColor: '#fff',
      }}
      {...position}
    >
      <ChannelLogo src={logo} alt="Logo" />
    </ChannelBox>
  )
}

// ----- Please uncomment the following lines to see the custom components -----
// Import components
// import {
// CustomTimeline,
// ChannelItem,
// Line,
// LiveTime,
// Program,
// } from "./components";

function App() {
  const startDate = '2024-05-01'
  const endDate = '2024-05-31'

  return (
    <div className="p-0">
      <h4 className="text-secondary text-start py-3 ps-4 ms-2">
        Production and publishing schedule
      </h4>
      <Row className="px-5">
        <OverlayTrigger
          trigger="click"
          key="bottom"
          placement="bottom"
          overlay={
            <Popover id="popover-positioned-bottom">
              <Popover.Body>
                <Row className="text-center fs-6 fw-bold">
                  <Col />
                  <Col>Script</Col>
                  <Col>Filming</Col>
                  <Col>Editing</Col>
                </Row>
                <hr />
                <Row className="text-center fs-6">
                  <Col>Video 1</Col>
                  <Col>
                    <Form.Check type="checkbox" id="check-api-checkbox">
                      <Form.Check.Input type="checkbox" isValid checked />
                      <Form.Control.Feedback type="valid" />
                    </Form.Check>
                  </Col>
                  <Col>
                    <Form.Check type="checkbox" id="check-api-checkbox">
                      <Form.Check.Input type="checkbox" isValid checked />
                      <Form.Control.Feedback type="valid" />
                    </Form.Check>
                  </Col>
                  <Col>
                    <Form.Check type="checkbox" id="check-api-checkbox">
                      <Form.Check.Input type="checkbox" isValid checked />
                      <Form.Control.Feedback type="valid" />
                    </Form.Check>
                  </Col>
                </Row>
                <Row className="text-center pt-3 fs-6">
                  <Col>Video 2</Col>
                  <Col>
                    <Form.Check type="checkbox" id="check-api-checkbox">
                      <Form.Check.Input type="checkbox" isValid checked />
                      <Form.Control.Feedback type="valid" />
                    </Form.Check>
                  </Col>
                  <Col>
                    <Form.Check type="checkbox" id="check-api-checkbox">
                      <Form.Check.Input type="checkbox" isValid checked />
                      <Form.Control.Feedback type="valid" />
                    </Form.Check>
                  </Col>
                  <Col>
                    <Form.Check type="checkbox" id="check-api-checkbox">
                      <Form.Check.Input type="checkbox" />
                      <Form.Control.Feedback type="valid" />
                    </Form.Check>
                  </Col>
                </Row>
                <Row className="text-center pt-3 fs-6">
                  <Col>Video 3</Col>
                  <Col>
                    <Form.Check type="checkbox" id="check-api-checkbox">
                      <Form.Check.Input type="checkbox" isValid checked />
                      <Form.Control.Feedback type="valid" />
                    </Form.Check>
                  </Col>
                  <Col>
                    <Form.Check type="checkbox" id="check-api-checkbox">
                      <Form.Check.Input type="checkbox" />
                      <Form.Control.Feedback type="valid" />
                    </Form.Check>
                  </Col>
                  <Col>
                    <Form.Check type="checkbox" id="check-api-checkbox">
                      <Form.Check.Input type="checkbox" />
                      <Form.Control.Feedback type="valid" />
                    </Form.Check>
                  </Col>
                </Row>
                <Row className="text-center pt-3 fs-6">
                  <Col>Video 4</Col>
                  <Col>
                    <Form.Check type="checkbox" id="check-api-checkbox">
                      <Form.Check.Input type="checkbox" isValid checked />
                      <Form.Control.Feedback type="valid" />
                    </Form.Check>
                  </Col>
                  <Col>
                    <Form.Check type="checkbox" id="check-api-checkbox">
                      <Form.Check.Input type="checkbox" />
                      <Form.Control.Feedback type="valid" />
                    </Form.Check>
                  </Col>
                  <Col>
                    <Form.Check type="checkbox" id="check-api-checkbox">
                      <Form.Check.Input type="checkbox" />
                      <Form.Control.Feedback type="valid" />
                    </Form.Check>
                  </Col>
                </Row>
              </Popover.Body>
            </Popover>
          }
        >
          <Button
            variant="secondary"
            className="p-0"
            style={{ width: '49.85%', borderRadius: '0' }}
          >
            <div className="bg-secondary text-light h4 py-0">Q1</div>
          </Button>
        </OverlayTrigger>
        <OverlayTrigger
          trigger="click"
          key="bottom"
          placement="bottom"
          overlay={
            <Popover id="popover-positioned-bottom">
              <Popover.Body>
                <Row className="text-center fs-6 fw-bold">
                  <Col />
                  <Col>Script</Col>
                  <Col>Filming</Col>
                  <Col>Editing</Col>
                </Row>
                <hr />
                <Row className="text-center fs-6">
                  <Col>Video 1</Col>
                  <Col>
                    <Form.Check type="checkbox" id="check-api-checkbox">
                      <Form.Check.Input type="checkbox" isValid checked />
                      <Form.Control.Feedback type="valid" />
                    </Form.Check>
                  </Col>
                  <Col>
                    <Form.Check type="checkbox" id="check-api-checkbox">
                      <Form.Check.Input type="checkbox" isValid checked />
                      <Form.Control.Feedback type="valid" />
                    </Form.Check>
                  </Col>
                  <Col>
                    <Form.Check type="checkbox" id="check-api-checkbox">
                      <Form.Check.Input type="checkbox" isValid checked />
                      <Form.Control.Feedback type="valid" />
                    </Form.Check>
                  </Col>
                </Row>
                <Row className="text-center pt-3 fs-6">
                  <Col>Video 2</Col>
                  <Col>
                    <Form.Check type="checkbox" id="check-api-checkbox">
                      <Form.Check.Input type="checkbox" isValid checked />
                      <Form.Control.Feedback type="valid" />
                    </Form.Check>
                  </Col>
                  <Col>
                    <Form.Check type="checkbox" id="check-api-checkbox">
                      <Form.Check.Input type="checkbox" isValid checked />
                      <Form.Control.Feedback type="valid" />
                    </Form.Check>
                  </Col>
                  <Col>
                    <Form.Check type="checkbox" id="check-api-checkbox">
                      <Form.Check.Input type="checkbox" />
                      <Form.Control.Feedback type="valid" />
                    </Form.Check>
                  </Col>
                </Row>
                <Row className="text-center pt-3 fs-6">
                  <Col>Video 3</Col>
                  <Col>
                    <Form.Check type="checkbox" id="check-api-checkbox">
                      <Form.Check.Input type="checkbox" isValid checked />
                      <Form.Control.Feedback type="valid" />
                    </Form.Check>
                  </Col>
                  <Col>
                    <Form.Check type="checkbox" id="check-api-checkbox">
                      <Form.Check.Input type="checkbox" />
                      <Form.Control.Feedback type="valid" />
                    </Form.Check>
                  </Col>
                  <Col>
                    <Form.Check type="checkbox" id="check-api-checkbox">
                      <Form.Check.Input type="checkbox" />
                      <Form.Control.Feedback type="valid" />
                    </Form.Check>
                  </Col>
                </Row>
                <Row className="text-center pt-3 fs-6">
                  <Col>Video 4</Col>
                  <Col>
                    <Form.Check type="checkbox" id="check-api-checkbox">
                      <Form.Check.Input type="checkbox" isValid checked />
                      <Form.Control.Feedback type="valid" />
                    </Form.Check>
                  </Col>
                  <Col>
                    <Form.Check type="checkbox" id="check-api-checkbox">
                      <Form.Check.Input type="checkbox" />
                      <Form.Control.Feedback type="valid" />
                    </Form.Check>
                  </Col>
                  <Col>
                    <Form.Check type="checkbox" id="check-api-checkbox">
                      <Form.Check.Input type="checkbox" />
                      <Form.Control.Feedback type="valid" />
                    </Form.Check>
                  </Col>
                </Row>
              </Popover.Body>
            </Popover>
          }
        >
          <Button
            variant="secondary ms-auto"
            className="p-0"
            style={{ width: '49.85%', borderRadius: '0' }}
          >
            <div className="bg-secondary text-light h4 py-0">Q2</div>
          </Button>
        </OverlayTrigger>
      </Row>
      <Row className="px-5">
        <Col className="bg-user-marmot text-dark h6 py-0 fw-bold">January</Col>
        <Col className="bg-user-marmot text-dark h6 py-0 ms-1 fw-bold">
          February
        </Col>
        <Col className="bg-user-marmot text-dark h6 py-0 ms-1 fw-bold">
          March
        </Col>
        <Col className="bg-user-marmot text-dark h6 py-0 ms-1 fw-bold">
          April
        </Col>
        <Col className="bg-user-marmot text-dark h6 py-0 ms-1 fw-bold">May</Col>
        <Col className="bg-user-marmot text-dark h6 py-0 ms-1 fw-bold">
          June
        </Col>
      </Row>
      <Row>
        <div style={{ width: '3.5%' }}>
          <div
            className="bg-light2 text-light h5 upright"
            style={{ height: '36%' }}
          >
            Topic 1
          </div>
          <div
            className="bg-light3 text-light h5 upright"
            style={{ height: '36%' }}
          >
            Topic 2
          </div>
        </div>
        <div style={{ width: '96.5%' }}>
          <div
            style={{
              height: '600px',
              width: '100%',
            }}
          >
            <Planner
              setting={{
                startDate,
                endDate,
                projects: [
                  {
                    project_id: '1',
                    project_name: 'project eins',
                    tasks: [
                      {
                        task_id: '1',
                        task_name: 'task e',
                        startDate: '2024-05-02',
                        endDate: '2024-05-04',
                      },
                      {
                        task_id: '2',
                        task_name: 'task l',
                        startDate: '2024-05-05',
                        endDate: '2024-05-05',
                      },
                      {
                        task_id: '3',
                        task_name: 'task f',
                        startDate: '2024-05-06',
                        endDate: '2024-05-010',
                      },
                    ],
                  },
                  {
                    project_id: '2',
                    project_name: 'project zwei',
                    tasks: [
                      {
                        task_id: '1',
                        task_name: 'task e',
                        startDate: '2024-05-04',
                        endDate: '2024-05-05',
                      },
                      {
                        task_id: '2',
                        task_name: 'task l',
                        startDate: '2024-05-6',
                        endDate: '2024-05-12',
                      },
                      {
                        task_id: '3',
                        task_name: 'task f',
                        startDate: '2024-05-13',
                        endDate: '2024-05-015',
                      },
                    ],
                  },
                  {
                    project_id: '3',
                    project_name: 'project drei',
                    tasks: [
                      {
                        task_id: '1',
                        task_name: 'task e',
                        startDate: '2024-05-01',
                        endDate: '2024-05-03',
                      },
                      {
                        task_id: '2',
                        task_name: 'task l',
                        startDate: '2024-05-04',
                        endDate: '2024-05-04',
                      },
                    ],
                  },
                  {
                    project_id: '4',
                    project_name: 'project vier',
                    tasks: [
                      {
                        task_id: '1',
                        task_name: 'task e',
                        startDate: '2024-05-01',
                        endDate: '2024-05-02',
                      },
                      {
                        task_id: '2',
                        task_name: 'task l',
                        startDate: '2024-05-03',
                        endDate: '2024-05-06',
                      },
                      {
                        task_id: '3',
                        task_name: 'task f',
                        startDate: '2024-05-07',
                        endDate: '2024-05-07',
                      },
                    ],
                  },
                  {
                    project_id: '5',
                    project_name: 'project seminar',
                    tasks: [
                      {
                        task_id: '1',
                        task_name: 'task e',
                        startDate: '2024-05-01',
                        endDate: '2024-05-07',
                      },
                    ],
                  },
                  {
                    project_id: '6',
                    project_name: 'project distortion',
                    tasks: [
                      {
                        task_id: '1',
                        task_name: 'task e',
                        startDate: '2024-05-01',
                        endDate: '2024-05-01',
                      },
                      {
                        task_id: '2',
                        task_name: 'task l',
                        startDate: '2024-05-02',
                        endDate: '2024-05-02',
                      },
                      {
                        task_id: '3',
                        task_name: 'task f',
                        startDate: '2024-05-03',
                        endDate: '2024-05-03',
                      },
                    ],
                  },
                ],
              }}
            />
          </div>
        </div>
      </Row>
    </div>
  )
}

ChannelItem.propTypes = {
  setting: PropTypes.shape().isRequired,
}

export default App
