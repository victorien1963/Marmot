import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Card,
  Col,
  Image,
  Modal,
  Row,
  Tab,
  Tabs,
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleArrowDown,
  faCircleArrowUp,
} from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import {
  emojis,
  exclusivevideos,
  member1,
  member2,
  member3,
  perks,
  posts,
} from '../../asset'
import LineChart from '../Content/LineChart'

function PerkModal({ setting }) {
  const { show, handleClose } = setting
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closebutton>Basic Tier</Modal.Header>
      <Modal.Body>
        <Row className="px-3">
          <Button size="sm" variant="outline-dark" className="w-25">
            Add Perks
          </Button>
        </Row>
        <Row>
          <Image className="m-auto" width="100%" height="auto" src={perks} />
        </Row>
      </Modal.Body>
    </Modal>
  )
}

function Memberships() {
  const [show, setshow] = useState(false)
  const navigate = useNavigate()
  const handleClose = () => setshow(false)
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
    <div className="w-100 h-100 p-3 overflow-scroll">
      <Row className="p-3 pb-5 h-100">
        <h4 className="text-start">Memberships Overview</h4>
        <Col className="h-100 p-4" xs={6}>
          <Row>Current Tiers</Row>
          <Row className="py-2">
            <Button size="sm" variant="secondary" className="w-25 rounded-pill">
              BASIC $1.99
            </Button>
            <span className="w-50" onClick={() => setshow(true)} aria-hidden>
              View / Add Perks
            </span>
          </Row>
          <Row className="py-2">
            <Button size="sm" variant="secondary" className="w-25 rounded-pill">
              PREMIUM $5.99
            </Button>
            <span className="w-50" onClick={() => setshow(true)} aria-hidden>
              View / Change Perks
            </span>
          </Row>
          <Row className="py-2">
            <Button size="sm" variant="secondary" className="w-25 rounded-pill">
              VIP $14.99
            </Button>
            <span className="w-50" onClick={() => setshow(true)} aria-hidden>
              View / Change Perks
            </span>
          </Row>
          <Row className="pt-5" style={{ height: '75%' }}>
            <Card className="w-100 h-100">
              <Card.Body className="w-100 h-100">
                <h4 className="text-start">Top members</h4>
                <Row className="pt-4">
                  <Col xs={4}>
                    <Image className="w-100" src={member1} />
                  </Col>
                  <Col xs={4}>
                    <Image className="w-100" src={member2} />
                  </Col>
                  <Col xs={4}>
                    <Image className="w-100" src={member3} />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Row>
        </Col>
        <Col className="h-100" xs={6}>
          <Card className="h-100 w-100 border-card-2">
            <Card.Body className="h-100 w-100">
              <Row className="h-50 w-100 d-flex flex-column">
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
        </Col>
      </Row>
      <Row className="p-3 pb-5 h-100">
        <h4>Manage Perks</h4>
        {[
          {
            label: 'Exclusive Videos',
            src: exclusivevideos,
          },
          {
            label: 'Community Posts',
            src: posts,
          },
          {
            label: 'Badges',
            src: emojis,
          },
          {
            label: 'Emojis',
            src: emojis,
          },
        ].map(({ label, src }) => (
          <Col key={label} className="h-50 pb-3" xs={6}>
            <Card className="h-100 d-flex flex-column">
              <Card.Header
                className="text-start border-0"
                style={{
                  backgroundColor: '#fff',
                }}
              >
                {label}
              </Card.Header>
              <Card.Body
                className="d-flex"
                style={{
                  height: '65%',
                }}
              >
                <Image
                  className="m-auto"
                  width="auto"
                  height="100%"
                  src={src}
                />
              </Card.Body>
              <Card.Footer
                className="d-flex justify-content-end border-0"
                style={{
                  backgroundColor: '#fff',
                }}
              >
                <Button variant="outline-dark" onClick={() => handleClose()}>
                  Manage
                </Button>
                <Button
                  className="ms-2"
                  variant="mar2"
                  onClick={() =>
                    navigate('/user/paycontent/badgeEditor', { replace: true })
                  }
                >
                  Add new
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
      <PerkModal setting={{ show, handleClose }} />
    </div>
  )
}

PerkModal.propTypes = {
  setting: PropTypes.shape().isRequired,
}

export default Memberships
