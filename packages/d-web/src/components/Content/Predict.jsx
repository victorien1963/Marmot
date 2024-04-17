import {
  faCircleArrowDown,
  faCircleArrowUp,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import { Row, Col, Tabs, Tab, Card } from 'react-bootstrap'
import LineChart from './LineChart'
import {
  dailymotion,
  facebook,
  predictvideo,
  tictok,
  vimeo,
  youtube,
} from '../../asset'

function Predict() {
  const data = [
    {
      spend: 100,
      f1: 15,
      f2: 5,
      f3: 150,
      date: '2023-09-01',
    },
    {
      spend: 200,
      f1: 15,
      f2: 5,
      f3: 150,
      date: '2023-09-02',
    },
    {
      spend: 600,
      f1: 15,
      f2: 5,
      f3: 150,
      date: '2023-09-03',
    },
    {
      spend: 500,
      f1: 15,
      f2: 5,
      f3: 150,
      date: '2023-09-04',
    },
    {
      spend: 700,
      f1: 15,
      f2: 5,
      f3: 150,
      date: '2023-09-05',
    },
  ]

  // svg size
  const ref = useRef(null)
  const [svgSize, setsvgSize] = useState(false)
  const getSize = () => {
    if (ref.current) {
      const style = getComputedStyle(ref.current)
      const height =
        ref.current.clientHeight -
        parseFloat(style.paddingTop) -
        parseFloat(style.paddingBottom)
      const width = ref.current.clientWidth
      return { width, height }
    }
    return false
  }
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      const size = getSize()
      if (size.width !== svgSize.width || size.height !== svgSize.height)
        setsvgSize(size)
    })
    observer.observe(ref.current)
    return () => ref.current && observer.unobserve(ref.current)
  }, [])

  const icons = {
    Facebook: facebook,
    TikTok: tictok,
    YouTube: youtube,
    Vimeo: vimeo,
    Dailymotion: dailymotion,
  }

  return (
    <Row
      style={{ height: '80vh', borderTop: '1px solid #262d41' }}
      className="mt-4 w-100 pe-3"
    >
      <Col className="px-3 h-100">
        <Card className="h-75 w-100">
          <Card.Body className="h-100 w-100">
            <Row className="h-50 w-100 d-flex flex-column">
              <h4 className="text-start text-grey py-4 px-3">
                Predictive performance
              </h4>
              <Tabs className="w-100 d-flex" justify>
                {[
                  {
                    label: 'Views',
                    number: 183,
                    usual: 130,
                  },
                  {
                    label: 'Watch time (hours)',
                    number: 6.4,
                    usual: 3,
                  },
                  {
                    label: 'Clicks',
                    number: 97,
                    usual: 58,
                  },
                  {
                    label: 'Frequency',
                    number: 1.8,
                    usual: 0.6,
                  },
                ].map(({ label, number, usual }) => (
                  <Tab
                    key={label}
                    title={
                      <>
                        <Row className="text-start">
                          <h4>{label}</h4>
                        </Row>
                        <Row>
                          <h4>
                            {number}
                            &ensp;
                            <FontAwesomeIcon
                              className="my-auto"
                              icon={
                                number > usual
                                  ? faCircleArrowUp
                                  : faCircleArrowDown
                              }
                            />
                          </h4>
                        </Row>
                        <Row>
                          {number > usual
                            ? `${(number - usual).toFixed(1)} more `
                            : `${(usual - number).toFixed(1)} less `}
                          than usual
                        </Row>
                      </>
                    }
                  />
                ))}
              </Tabs>
            </Row>
            <Row className="h-50 w-100">
              <div className="h-1-- w-100" ref={ref}>
                <LineChart
                  setting={{
                    ...svgSize,
                    showControl: false,
                    data,
                    selectedField: ['spend'],
                  }}
                />
              </div>
            </Row>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Row className="h-50 w-100 d-flex flex-column">
              <h4 className="text-start text-grey py-4 px-3">
                Recommended Distribution platform
              </h4>
            </Row>
            <Row>
              {['Facebook', 'TikTok', 'YouTube', 'Vimeo', 'Dailymotion'].map(
                (icon) => (
                  <Col key={icon}>
                    <img src={icons[icon]} alt="" />
                    <h5>{icon}</h5>
                  </Col>
                )
              )}
            </Row>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Row className="h-50 w-100 d-flex flex-column">
              <h4 className="text-start text-grey py-4 px-3">
                Socil Listening tools + Google/Youtube trend + CMS intenal data
              </h4>
            </Row>
            <Row>
              {['1', '2', '3', '4'].map((icon) => (
                <Col key={icon} className="d-flex" xs={6}>
                  <Row>
                    <Col>
                      <img src={predictvideo} alt="" />
                    </Col>
                    <Col>
                      <h5>title {icon}</h5>
                      <h5>content</h5>
                    </Col>
                  </Row>
                </Col>
              ))}
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default Predict
