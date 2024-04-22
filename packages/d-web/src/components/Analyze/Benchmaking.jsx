import { faCheckCircle, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Col,
  Form,
  InputGroup,
  ListGroupItem,
  Row,
} from 'react-bootstrap'

function AutoComplete({ setting }) {
  const { text, options, placeholder, show, onFocus, handleSelect } = setting
  const [search, setsearch] = useState('')
  const selected = useMemo(
    () => options.filter(({ checked }) => checked),
    [options]
  )

  return (
    <div
      className="w-100 pe-3 position-relative mb-2"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
      aria-hidden
    >
      <div className="d-flex flex-column w-100">
        <div className="d-flex px-2 py-3">
          <Form.Label className="my-auto text-nowrap">{text}</Form.Label>
        </div>
        <div className="flex-fill">
          <div className="input-container">
            {selected.map((s) => (
              <div className="input-tag d-flex">
                <span>{s.label}</span>
                <FontAwesomeIcon
                  className="ms-2 fs-7 my-auto"
                  style={{
                    cursor: 'pointer',
                  }}
                  icon={faTimes}
                  onClick={() => handleSelect(s.value)}
                />
              </div>
            ))}
            <Form.Control
              className="p-0"
              onFocus={onFocus}
              placeholder={show || selected.length ? '' : placeholder}
            />
          </div>
        </div>
      </div>
      <div
        className="position-absolute w-100 border"
        style={{
          top: '100%',
          height: '500px',
          display: show ? 'block' : 'none',
          zIndex: '999999',
          backgroundColor: 'white',
        }}
      >
        <div className="mb-2 p-2 w-100 d-flex flex-column">
          <InputGroup
            style={{ borderRadius: '.25rem' }}
            className="border rounded-lg"
            size="sm"
          >
            <Form.Control
              type="text"
              placeholder="Search..."
              aria-label="Search..."
              aria-describedby="btnGroupAddon"
              title="輸 入 關 鍵 字 搜 尋"
              value={search}
              onChange={(e) => setsearch(e.target.value)}
            />
          </InputGroup>
          <hr />
          <div
            className="scrollbarShow"
            style={{ maxHeight: '25rem', overflowY: 'auto' }}
          >
            {options
              .filter(({ label }) => !search || label.includes(search))
              .map(({ label, value, checked }) => (
                <>
                  <ListGroupItem
                    title={label}
                    className="px-3 py-0 d-flex"
                    key={value}
                    href=""
                    onClick={() => handleSelect(value)}
                  >
                    <span>{label}</span>
                    {checked && (
                      <FontAwesomeIcon
                        className="ms-auto my-auto"
                        icon={faCheckCircle}
                      />
                    )}
                  </ListGroupItem>
                  <hr />
                </>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Benchmaking() {
  const initOptions = {
    channel: [
      { label: 'tag1', value: 'tag1' },
      { label: 'tag2', value: 'tag2' },
      { label: 'tag3', value: 'tag3' },
    ],
    activity: [
      { label: 'tag1', value: 'tag1' },
      { label: 'tag2', value: 'tag2' },
      { label: 'tag3', value: 'tag3' },
    ],
    event: [
      { label: 'tag1', value: 'tag1' },
      { label: 'tag2', value: 'tag2' },
      { label: 'tag3', value: 'tag3' },
    ],
    people: [
      { label: 'tag1', value: 'tag1' },
      { label: 'tag2', value: 'tag2' },
      { label: 'tag3', value: 'tag3' },
    ],
    tags: [
      { label: 'tag1', value: 'tag1' },
      { label: 'tag2', value: 'tag2' },
      { label: 'tag3', value: 'tag3' },
    ],
    clip: [
      { label: 'tag1', value: 'tag1' },
      { label: 'tag2', value: 'tag2' },
      { label: 'tag3', value: 'tag3' },
    ],
  }
  const [fakeOptions, setfakeOptions] = useState(initOptions)
  const handleSelect = (key, e) => {
    setfakeOptions({
      ...fakeOptions,
      [key]: fakeOptions[key].map(({ label, value, checked }) =>
        value === e
          ? { label, value, checked: !checked }
          : { label, value, checked }
      ),
    })
  }

  const initFocus = {
    channel: false,
    activity: false,
    event: false,
    people: false,
    tags: false,
    clip: false,
  }
  const [focus, setfocus] = useState(initFocus)
  return (
    <div
      className="w-100 h-100 p-3"
      onClick={() => setfocus(initFocus)}
      aria-hidden
    >
      <Row>
        <h4 className="text-start">Select Type of channel to benchmark</h4>
      </Row>
      <Row className="h-75 ps-3">
        <Col className="h-75 d-flex flex-column justify-content-center">
          <Row className="py-2">
            <Button size="sm" className="w-75 mx-auto rounded-pill">
              ALL
            </Button>
          </Row>
          <Row className="py-2">
            <Button size="sm" className="w-75 mx-auto rounded-pill">
              Knowledge
            </Button>
          </Row>
          <Row className="py-2">
            <Button size="sm" className="w-75 mx-auto rounded-pill">
              Mardarin
            </Button>
          </Row>
        </Col>
        <Col className="h-75 d-flex flex-column justify-content-center" xs={8}>
          <Row>
            <Col>
              <AutoComplete
                setting={{
                  text: 'Filter by location',
                  placeholder: 'location(s)...',
                  options: fakeOptions.channel,
                  handleSelect: (e) => handleSelect('channel', e),
                  show: focus.channel,
                  onFocus: () =>
                    setfocus({
                      ...focus,
                      channel: true,
                    }),
                }}
              />
            </Col>
            <Col>
              <AutoComplete
                setting={{
                  text: 'Filter by subscribers',
                  placeholder: 'subscriber(s)...',
                  options: fakeOptions.activity,
                  handleSelect: (e) => handleSelect('activity', e),
                  show: focus.activity,
                  onFocus: () =>
                    setfocus({
                      ...focus,
                      activity: true,
                    }),
                }}
              />
            </Col>
          </Row>
          <hr className="mt-1 mb-2" />
          <Row>
            <Col>
              <AutoComplete
                setting={{
                  text: 'Filter by audience',
                  placeholder: 'audience...',
                  options: fakeOptions.event,
                  handleSelect: (e) => handleSelect('event', e),
                  show: focus.event,
                  onFocus: () =>
                    setfocus({
                      ...focus,
                      event: true,
                    }),
                }}
              />
            </Col>
            <Col>
              <AutoComplete
                setting={{
                  text: 'Filter by views',
                  placeholder: 'view...',
                  options: fakeOptions.people,
                  handleSelect: (e) => handleSelect('people', e),
                  show: focus.people,
                  onFocus: () =>
                    setfocus({
                      ...focus,
                      people: true,
                    }),
                }}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Button variant="mar-outlined" size="sm" className="w-25 ms-auto me-2">
          Generate
        </Button>
      </Row>
    </div>
  )
}

AutoComplete.propTypes = {
  setting: PropTypes.shape().isRequired,
}

export default Benchmaking
