import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'

function Profile() {
  const [data, setdata] = useState([
    {
      label: 'Name',
      value: '',
    },
    {
      label: 'Email Address',
      value: '',
    },
    {
      label: 'User ID',
      value: '',
    },
    {
      label: 'Password',
      value: '',
    },
    {
      label: 'YouTube channel URL',
      value: '',
    },
    {
      label: 'Instagram handle',
      value: '',
    },
    {
      label: 'Language/Currency',
      value: '',
    },
  ])
  return (
    <div className="d-flex flex-column h-100 w-100 p-3">
      <h4 className="text-start ps-4">Profile Details</h4>
      <Row>
        {data.map(({ label, value }) => (
          <Col className="px-5 py-3" key={label} xs={6}>
            <Form.Label className="w-100 text-start">{label}*</Form.Label>
            <Form.Control
              value={value}
              onChange={(e) =>
                setdata(
                  data.map((d) =>
                    d.label === label ? { ...d, value: e.target.value } : d
                  )
                )
              }
            />
          </Col>
        ))}
      </Row>
      <Row className="p-5">
        <Button
          className="ms-auto"
          variant="secondary"
          style={{
            width: '15%',
          }}
          onClick={() => {}}
        >
          Reset
        </Button>
        <Button
          variant="mar2"
          className="ms-2"
          style={{
            width: '15%',
          }}
          onClick={() => {}}
        >
          Save
        </Button>
      </Row>
    </div>
  )
}

export default Profile
