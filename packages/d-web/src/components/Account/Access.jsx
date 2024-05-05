import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  faFacebookSquare,
  faInstagram,
  faTiktok,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons'
import {
  Button,
  Col,
  Modal,
  Nav,
  Row,
  Form,
  InputGroup,
  Card,
  Image,
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  arcstudio,
  assemble,
  azure,
  bonito,
  celtx,
  clipchamp,
  monday,
  plaky,
  runway,
  stickermaker,
  streamlabs,
  tubular,
  unitedmasters,
  veed,
  viewstats,
} from '../../asset'

function SocialMediaModal({ setting }) {
  const { show, handleClose } = setting
  return (
    <Modal
      style={{ zIndex: '1501' }}
      show={show}
      size="lg"
      onHide={() => handleClose()}
      className="py-2 px-4"
    >
      <Modal.Header closeButton />
      <Modal.Body className="p-4 d-flex flex-column">
        <Form.Label>
          You’ve authorized access to your MARMOT Account for the platforms and
          apps listed below.
        </Form.Label>
        {['YouTube', 'Orca', 'Luca'].map((key) => (
          <Card className="my-2" key={key}>
            <Card.Body>
              <Row>
                <Col xs={8}>
                  <p>{key}</p>
                  <p>ID (UCuHHKbwC0TWjeqxbqdO-N_g) data access</p>
                  <p>Authorization date: January 01, 2022</p>
                </Col>
                <Col xs={4}>
                  <Button
                    variant="outlined"
                    size="sm"
                    onClick={() => handleClose(false)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="ms-2"
                    variant="secondary"
                    size="sm"
                    onClick={() => handleClose(show)}
                  >
                    Remove
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))}
      </Modal.Body>
    </Modal>
  )
}

function SocialMedia() {
  const [data, setdata] = useState([
    {
      label: 'YouTube channel URL',
      icon: faYoutube,
      value: '',
    },
    {
      label: 'Facebook ID',
      icon: faFacebookSquare,
      value: '',
    },
    {
      label: 'Instagram handle',
      icon: faInstagram,
      value: '',
    },
    {
      label: 'Tik Tok username',
      icon: faTiktok,
      value: '',
    },
  ])

  const [show, setshow] = useState(false)
  const handleClose = () => setshow(false)

  return (
    <>
      <Row className="py-5">
        {data.map(({ label, icon, value }) => (
          <Col className="px-5 py-3" key={label} xs={6}>
            <Form.Label className="w-100 text-start d-flex">
              <FontAwesomeIcon className="fs-5 mx-2 my-auto" icon={icon} />
              {label}*
            </Form.Label>
            <InputGroup className="px-0 py-1">
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
              <Button
                variant="outline-dai"
                id="button-addon2"
                title="搜 尋"
                onClick={() => {}}
              >
                Grant Access
              </Button>
            </InputGroup>
          </Col>
        ))}
        <div className="p-5 d-flex">
          <Button
            variant="mar2"
            className="ms-auto"
            style={{
              height: '40px',
              width: '20%',
            }}
            onClick={() => setshow(true)}
          >
            Edit / Remove Access
          </Button>
        </div>
      </Row>

      <SocialMediaModal
        setting={{
          show,
          handleClose,
        }}
      />
    </>
  )
}
function Inhouselatforms() {
  const [data, setdata] = useState([
    {
      label: 'ORCA user ID',
      icon: faYoutube,
      value: '',
    },
    {
      label: 'LUCA user ID',
      icon: faFacebookSquare,
      value: '',
    },
  ])

  const [show, setshow] = useState(false)
  const handleClose = () => setshow(false)

  return (
    <>
      <Row className="py-5">
        {data.map(({ label, icon, value }) => (
          <Col className="px-5 py-3" key={label} xs={6}>
            <Form.Label className="w-100 text-start d-flex">
              <FontAwesomeIcon className="fs-5 mx-2 my-auto" icon={icon} />
              {label}*
            </Form.Label>
            <InputGroup className="px-0 py-1">
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
              <Button
                variant="outline-dai"
                id="button-addon2"
                title="搜 尋"
                onClick={() => {}}
              >
                Grant Access
              </Button>
            </InputGroup>
          </Col>
        ))}
        <div className="p-5 d-flex">
          <Button
            variant="mar2"
            className="ms-auto"
            style={{
              height: '40px',
              width: '20%',
            }}
            onClick={() => setshow(true)}
          >
            Edit / Remove Access
          </Button>
        </div>
      </Row>

      <SocialMediaModal
        setting={{
          show,
          handleClose,
        }}
      />
    </>
  )
}
function EcommercePlatforms() {
  const [data, setdata] = useState([
    {
      label: 'Shopify user ID',
      icon: faYoutube,
      value: '',
    },
    {
      label: 'Shopline user ID',
      icon: faFacebookSquare,
      value: '',
    },
  ])

  const [show, setshow] = useState(false)
  const handleClose = () => setshow(false)

  return (
    <>
      <Row className="py-5">
        {data.map(({ label, icon, value }) => (
          <Col className="px-5 py-3" key={label} xs={6}>
            <Form.Label className="w-100 text-start d-flex">
              <FontAwesomeIcon className="fs-5 mx-2 my-auto" icon={icon} />
              {label}*
            </Form.Label>
            <InputGroup className="px-0 py-1">
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
              <Button
                variant="outline-dai"
                id="button-addon2"
                title="搜 尋"
                onClick={() => {}}
              >
                Grant Access
              </Button>
            </InputGroup>
          </Col>
        ))}
        <div className="p-5 d-flex">
          <Button
            variant="mar2"
            className="ms-auto"
            style={{
              height: '40px',
              width: '20%',
            }}
            onClick={() => setshow(true)}
          >
            Edit / Remove Access
          </Button>
        </div>
      </Row>

      <SocialMediaModal
        setting={{
          show,
          handleClose,
        }}
      />
    </>
  )
}
function ThirdPartyApps() {
  const [data, setdata] = useState([
    {
      label: 'Arc Studio',
      icon: arcstudio,
      value: '',
    },
    {
      label: 'Assemble',
      icon: assemble,
      value: '',
    },
    {
      label: 'Azure',
      icon: azure,
      value: '',
    },
    {
      label: 'Bonito',
      icon: bonito,
      value: '',
    },
    {
      label: 'celtx',
      icon: celtx,
      value: '',
    },
    {
      label: 'Clipchamp',
      icon: clipchamp,
      value: '',
    },
    {
      label: 'monday.com',
      icon: monday,
      value: '',
    },
    {
      label: 'Plaky',
      icon: plaky,
      value: '',
    },
    {
      label: 'Runway',
      icon: runway,
      value: '',
    },
    {
      label: 'Sticker Maker Studio',
      icon: stickermaker,
      value: '',
    },
    {
      label: 'Streamlabs',
      icon: streamlabs,
      value: '',
    },
    {
      label: 'Tubular Labs',
      icon: tubular,
      value: '',
    },
    {
      label: 'UnitedMasters',
      icon: unitedmasters,
      value: '',
    },
    {
      label: 'VEED',
      icon: veed,
      value: '',
    },
    {
      label: 'ViewStats',
      icon: viewstats,
      value: '',
    },
  ])
  if (false) console.log(setdata)

  const [show, setshow] = useState(false)
  const handleClose = () => setshow(false)

  return (
    <div className="d-flex flex-column">
      <h4
        className="pt-4 px-5 text-start"
        style={{
          height: '10%',
        }}
      >
        3rd party apps
      </h4>
      <Row
        style={{
          height: '10%',
        }}
      >
        <Col xs={2}>
          <Button
            variant="outline-dai"
            id="button-addon2"
            title="搜 尋"
            onClick={() => {}}
          >
            Select
          </Button>
        </Col>
        <Col xs={2}>
          <Button
            variant="outline-dai"
            id="button-addon2"
            title="搜 尋"
            onClick={() => {}}
          >
            Select All
          </Button>
        </Col>
        <Col xs={2} className="ms-auto px-2">
          <Button
            variant="outline-dai"
            id="button-addon2"
            title="搜 尋"
            onClick={() => {}}
          >
            Grant Access
          </Button>
        </Col>
        <Col xs={2} className="ps-2">
          <Button
            variant="mar2"
            className="ms-auto text-nowrap"
            onClick={() => setshow(true)}
          >
            Edit / Remove Access
          </Button>
        </Col>
      </Row>
      <Row className="py-5 flex-fill">
        {data.map(({ label, icon }, index) => (
          <Col className="d-flex flex-nowrap" key={label} xs={3}>
            <div className="pt-2 ps-3">
              <Form.Check />
            </div>
            <div
              className="h-100 overflow-hidden position-relative"
              style={{
                width: '80px',
              }}
            >
              <Image
                src={icon}
                height="auto"
                width="240px"
                style={{
                  position: 'absolute',
                  bottom: index > 7 && index < 12 ? '25px' : '5px',
                  left: '-17px',
                }}
              />
            </div>
            <Form.Label className="w-50 text-start d-flex pt-2 ps-2">
              <FontAwesomeIcon className="fs-5 mx-2 my-auto" icon={icon} />
              {label}*
            </Form.Label>
          </Col>
        ))}
      </Row>

      <SocialMediaModal
        setting={{
          show,
          handleClose,
        }}
      />
    </div>
  )
}

function Access() {
  const pages = [
    {
      label: 'Social Media',
      value: 'SocialMedia',
    },
    {
      label: 'In-house platforms',
      value: 'Inhouselatforms',
    },
    {
      label: 'E-commerce platforms',
      value: 'EcommercePlatforms',
    },
    {
      label: '3rd party apps',
      value: 'ThirdPartyApps',
    },
  ]
  const [page, setpage] = useState('SocialMedia')

  const components = {
    SocialMedia: <SocialMedia />,
    Inhouselatforms: <Inhouselatforms />,
    EcommercePlatforms: <EcommercePlatforms />,
    ThirdPartyApps: <ThirdPartyApps />,
  }

  return (
    <div className="d-flex flex-column w-100 h-100">
      <Row
        style={{
          height: '6%',
          backgroundColor: '#eee',
        }}
      >
        <Nav
          className="ms-auto w-100 d-flex"
          // style={{ borderRight: '1px solid #fff' }}
        >
          {pages.map(({ label, value }) => (
            <Nav.Link
              key={label}
              className="text-secondary fw-bold"
              href=""
              onClick={() => setpage(value)}
            >
              {/* <FontAwesomeIcon icon={icons[key]} /> */}
              &ensp;{label}
            </Nav.Link>
          ))}
        </Nav>
      </Row>
      <Row className="flex-fill">{components[page]}</Row>
    </div>
  )
}

SocialMediaModal.propTypes = {
  setting: PropTypes.shape().isRequired,
}

export default Access
