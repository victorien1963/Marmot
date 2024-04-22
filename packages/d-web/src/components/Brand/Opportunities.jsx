import React, { useState } from 'react'
import { DateRange } from 'react-date-range'
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  InputGroup,
  Row,
} from 'react-bootstrap'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import { suzuri, teespring, shopline, shopify } from '../../asset'

function Opportunities() {
  const fields = [
    {
      label: 'Brand',
    },
    {
      label: 'Campaign description',
    },
    {
      label: 'Duration',
    },
    {
      label: 'Budget range',
    },
    {
      label: 'Type',
    },
    {
      label: 'Details',
    },
  ]

  const brands = [suzuri, teespring, shopline, shopify]

  const datas = Array.from({ length: 10 }).map((a, index) => ({
    Brand: (
      <Image
        className="card"
        style={{ height: '30px', width: '80px' }}
        src={brands[index % 4]}
      />
    ),
    'Campaign description': 'This is a campaign about ..............',
    Duration: '20240311-20241231',
    'Budget range': `$${parseInt(Math.random() * 5000, 10)} - $${
      parseInt(Math.random() * 5000, 10) + 5000
    }`,
    Type: 'Type of ..........',
    Details: '......',
  }))

  const [showDate, setshowDate] = useState(false)
  const [date, setdate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  })
  const [data, setdata] = useState({
    originName: '',
    date: '',
    type: '',
  })

  const onDataChange = (e) =>
    setdata({ ...data, [e.target.name]: e.target.value })

  return (
    <div className="w-100 h-100 overflow-scroll">
      <Row
        className="w-100 py-0 d-flex flex-column text-start"
        style={{
          height: '10%',
        }}
      >
        <h4 className="text-secondary w-50 my-auto">
          Brand Campaign Opportunities
        </h4>
        <h6 className="text-secondary w-50 my-auto">
          Please select the campaigns you are interested to participate in
        </h6>
      </Row>
      <Row className="p-3">
        <Col xs={3} className="d-flex justifu-content-end">
          <Form.Select
            className="w-100 h-100"
            aria-label="Default select example"
          >
            <option value="" className="d-none">
              category...
            </option>
            {['category 1', 'category 2', 'category 3'].map((label, i) => (
              <option key={i} value={label}>
                {label}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col xs={3} className="d-flex justifu-content-end">
          <Form.Select
            className="w-100 h-100"
            aria-label="Default select example"
          >
            <option value="" className="d-none">
              category...
            </option>
            {['category 1', 'category 2', 'category 3'].map((label, i) => (
              <option key={i} value={label}>
                {label}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col>
          <InputGroup>
            <Form.Label className="px-2 my-auto">Date</Form.Label>
            <Form.Control
              // name={f.name}
              value={data.date || ''}
              // placeholder={f.placeholder}
              type="text"
              onFocus={() => setshowDate(!showDate)}
              readOnly
            />
            <div
              style={{
                height: showDate ? '100%' : '0%',
                transition: 'height .3s ease-in',
                position: 'absolute',
                zIndex: '999',
                top: '100%',
              }}
            >
              {showDate && (
                <DateRange
                  ranges={[date]}
                  editableDateInputs
                  onChange={({ selection }) => {
                    setdate(selection)
                    onDataChange({
                      target: {
                        name: 'date',
                        value: `${moment(selection.startDate).format(
                          'yyyy-MM-DD'
                        )}-${moment(selection.endDate).format('yyyy-MM-DD')}`,
                      },
                    })
                  }}
                  moveRangeOnFirstSelection={false}
                />
              )}
            </div>
            <Button
              variant="outline-dark"
              onClick={() => setshowDate(!showDate)}
            >
              <FontAwesomeIcon icon={faCalendarAlt} />
            </Button>
          </InputGroup>
        </Col>
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
                <Col key={label} xs={2}>
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
                  <Col className="d-flex border-top" key={label} xs={2}>
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

export default Opportunities
