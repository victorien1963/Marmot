import React, { useEffect, useRef, useState } from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import LineChart from './LineChart'
import CrossChart from './CrossChart'
import PieChart from './PieChart'

function Trends() {
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

  return (
    <div className="w-100 h-100 p-3">
      <Row className="h-100 w-100">
        <Col xs={6} className="h-50 p-3">
          <Card className="h-100 w-100">
            <Card.Body className="d-flex flex-column">
              <h6 className="text-start text-grey py-2">Top Trends</h6>
              <div className="flex-fill" ref={ref}>
                <CrossChart
                  setting={{
                    ...svgSize,
                    showControl: false,
                    data,
                    selectedField: ['spend'],
                    barFields: ['f1', 'f2', 'f3'],
                  }}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} className="h-50 p-3">
          <Card className="h-100 w-100">
            <Card.Body className="d-flex flex-column">
              <h6 className="text-start text-grey py-2">Conversation</h6>
              <div className="flex-fill">
                <LineChart
                  setting={{
                    ...svgSize,
                    showControl: false,
                    data,
                    selectedField: ['spend'],
                  }}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} className="h-50 p-3">
          <Card className="h-100 w-100">
            <Card.Body className="d-flex flex-column">
              <h6 className="text-start text-grey py-2">Share of Voice</h6>
              <div className="flex-fill">
                <PieChart
                  setting={{
                    ...svgSize,
                    breakdowns: ['age', 'gender'],
                    labels: ['age', 'gender'],
                    datas: [data, data].map((a) => {
                      const percented = a.map((x) => ({
                        ...x,
                        pvalue: (x.spend / 2100) * 100,
                        percent: `${Math.round((x.spend / 2100) * 100)}%`,
                      }))
                      return percented
                        .filter((p) => p.pvalue > 2)
                        .concat([
                          percented
                            .filter((p) => p.pvalue <= 2)
                            .reduce(
                              (prev, cur) => ({
                                spend: prev.spend + cur.spend,
                                pvalue: prev.pvalue + cur.pvalue,
                                percent: `${Math.round(
                                  prev.pvalue + cur.pvalue
                                )}%`,
                              }),
                              { spend: 0, pvalue: 0, percent: '0%' }
                            ),
                        ])
                    }),
                    showControl: false,
                    selectedField: 'spend',
                    padding: 12,
                    donutThickness: 40,
                    color: [
                      '#FCBF49',
                      '#D62828',
                      '#247BA0',
                      '#59C3C3',
                      '#e88631',
                      '#B5AF8D',
                    ],
                  }}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} className="h-50 p-3">
          <Card className="h-100 w-100">
            <Card.Body className="d-flex flex-column">
              <h6 className="text-start text-grey py-2">Top Topics</h6>
              <div className="flex-fill" ref={ref}>
                <CrossChart
                  setting={{
                    ...svgSize,
                    showControl: false,
                    data,
                    selectedField: ['spend'],
                    barFields: ['f1', 'f2', 'f3'],
                  }}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Trends
