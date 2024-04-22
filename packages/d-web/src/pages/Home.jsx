import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
// import moment from 'moment'
import 'moment-timezone'
import {
  Form,
  InputGroup,
  Image,
  Container,
  Row,
  Col,
  Button,
  Modal,
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEye,
  faEyeSlash,
  faCircleExclamation,
  faCircleRadiation,
} from '@fortawesome/free-solid-svg-icons'
import { AuthContext, ToastContext } from '../components/ContextProvider'
import apiServices from '../services/apiServices'
import { LoadingButton, PathCard } from '../components'
import { logo_mar } from '../asset'
// import { logoFull } from '../asset'
// import bg_video from '../asset/images/AdobeStock_3989.mp4'

function Warn({ setting }) {
  const { size = 'md', show = false, handleClose } = setting

  return (
    <Modal
      style={{ zIndex: '1501' }}
      size={size}
      show={show !== false}
      onHide={() => handleClose(false)}
    >
      <Modal.Header
        className="AccFormModal justify-content-center text-center pt-4"
        closeButton
      >
        <Modal.Title>
          <h4>系統訊息</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex AccformCard">
        <div className="assPermis w-100">
          <FontAwesomeIcon
            icon={faCircleExclamation}
            style={{ height: '5rem' }}
            className="my-4"
          />
          {/* <Form className="px-2 Form-card flex-grow-1">
            <Form.Group className="px-5 lh-md text-center text-dai">

              <Form.Label className="w-100 fs-5 fw-bold text-center pb-4">
                確定要刪除
                {show && target
                  ? target.setting.name ||
                    `專案${target.setting.id || target.draft_id}`
                  : '專案'}
                嗎？
              </Form.Label>
            </Form.Group>
          </Form> */}
        </div>
      </Modal.Body>
      <Modal.Footer className="sendForm justify-content-center py-3">
        <Button variant="secondary" onClick={() => handleClose(false)}>
          取消
        </Button>
        <Button variant="dai" onClick={() => handleClose(show)}>
          確定
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

function Home() {
  const { auth, setAuth } = useContext(AuthContext)
  const { setToast } = useContext(ToastContext)
  const navigate = useNavigate()

  const [reveal, setReveal] = useState(false)
  const fields = [
    {
      label: 'account',
      type: 'text',
      name: 'email',
      placeholder: 'account',
    },
    {
      label: 'password',
      type: 'password',
      name: 'password',
      placeholder: 'password',
    },
  ]
  const [data, setData] = useState({
    email: '',
    password: '',
  })
  const onDataChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value })
  }
  const handleLogin = async () => {
    const { token } = await apiServices.login(data)
    if (!token) {
      setToast({ show: true, text: '登 入 失 敗' })
      return
    }
    document.cookie = `token=${token}; Domain=${window.location.hostname}; Path=/;`
    const { user } = await apiServices.me()
    setAuth({
      authed: true,
      ...user,
    })
  }

  const [showWarn, setshowWarn] = useState(false)

  const contents = {
    user: [
      {
        title: 'Planning',
        subTitle: 'Pre-production stage',
        icon: faCircleRadiation,
        link: '/user/content',
      },
      {
        title: 'Production',
        subTitle: 'AI Video Studio',
        icon: faCircleRadiation,
        link: '/user/making',
      },
      {
        title: 'Analytics',
        subTitle: 'Performance reports',
        icon: faCircleRadiation,
        link: '/user/analyze',
      },
      {
        title: 'Premium Content',
        subTitle: 'Membership + Courses',
        icon: faCircleRadiation,
        link: '/user/paycontent',
      },
      {
        title: 'Merchandise',
        subTitle: 'E-commerce',
        icon: faCircleRadiation,
        link: '/user/product/insight',
      },
      {
        title: 'Brand opportunities',
        subTitle: 'Sponsorships',
        icon: faCircleRadiation,
        link: '/user/brand',
      },
    ],
    admin: [
      {
        title: 'CRM / Customer analysis',
        subTitle: 'ORCA',
        icon: faCircleRadiation,
        link: '/',
      },
      {
        title: 'Ad placement',
        subTitle: 'LUCA + DCP Partner Sales',
        icon: faCircleRadiation,
        link: '/',
      },
      {
        title: 'Influencer collaboration',
        subTitle: 'Creator connect',
        icon: faCircleRadiation,
        link: '/admin/cooperate',
      },
      {
        title: 'Merchandise',
        subTitle: 'E-commerce',
        icon: faCircleRadiation,
        link: '/admin/product/insight',
      },
    ],
  }

  return (
    <Container
      id="home_bg"
      className="h-100 w-100 d-flex flex-column position-relative"
    >
      {auth.authed ? (
        <>
          {/* <video width="750" height="500" autoPlay muted loop>
            <source src={bg_video} type="video/mov" />
          </video> */}
          <Row className="h-50">
            <Col
              className="bg-light text-secondary d-flex flex-column justify-content-center pe-0"
              xs={2}
            >
              <h4>Creators</h4>
              <h4>Media Companies</h4>
            </Col>
            <Col xs={10}>
              <Row
                className="h-100 py-3 bg-light"
                style={{
                  borderLeft: '1px solid #262d41',
                }}
              >
                {contents.user.map((c) => (
                  <Col key={c.title} xs={4} className="p-3">
                    <PathCard
                      setting={{
                        ...c,
                        type: 'user',
                      }}
                    />
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
          <Row className="h-50">
            <Col
              className="bg-light text-secondary d-flex flex-column justify-content-center pe-0"
              xs={2}
              style={{
                borderTop: '1px solid #262d41',
              }}
            >
              <h4>Advertisers</h4>
              <h4>Brands</h4>
            </Col>
            <Col
              xs={10}
              style={{
                borderTop: '1px solid #262d41',
              }}
            >
              <Row
                className="h-100 py-3 bg-light"
                style={{
                  borderLeft: '1px solid #262d41',
                }}
              >
                {contents.admin.map((c) => (
                  <Col key={c.title} xs={4} className="p-3">
                    <PathCard
                      setting={{
                        ...c,
                        type: 'admin',
                      }}
                    />
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </>
      ) : (
        <>
          <div className="d-flex" style={{ height: '65%' }}>
            <p
              // style={{ fontSize: '36vh', textShadow: '#884ec5 5px 0 10px' }}
              style={{ fontSize: '36vh' }}
              className="text-mar-linear mt-auto mx-auto"
            >
              MARMOT
            </p>
            {/* <Image
              className="mt-auto mx-auto"
              src={logoFull}
              style={{ height: '25rem', width: 'auto' }}
            /> */}
          </div>
          <div className="d-flex w-100 mb-auto" style={{ height: '35%' }}>
            <Form className="py-3 px-5 mx-auto d-flex flex-column">
              <Row>
                <Col xs={2} className="d-flex">
                  <Image src={logo_mar} height="40" className="m-auto" />
                </Col>
                <Col xs={7} className="m-auto">
                  {fields.map((field) => (
                    <Form.Group key={field.name} className="d-flex mb-2">
                      {/* <Form.Label>{field.label}</Form.Label> */}
                      {field.type === 'password' ? (
                        <InputGroup
                          id="defaultBorder"
                          className="rounded input-group-transparent-addon w-100"
                        >
                          <Form.Control
                            size="sm"
                            name={field.name}
                            type={reveal ? 'text' : field.type}
                            onChange={onDataChange}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && !e.isComposing)
                                handleLogin()
                            }}
                            placeholder={field.placeholder}
                            style={{ opacity: '.65' }}
                          />
                          <InputGroup.Text>
                            <FontAwesomeIcon
                              className="fs-6"
                              style={{
                                right: '10',
                                top: '50',
                                bottom: '50',
                                cursor: 'pointer',
                              }}
                              title={
                                reveal ? '點擊以隱藏密碼' : '點擊以顯示密碼'
                              }
                              icon={reveal ? faEye : faEyeSlash}
                              onClick={() => setReveal(!reveal)}
                            />
                          </InputGroup.Text>
                        </InputGroup>
                      ) : (
                        <Form.Control
                          size="sm"
                          name={field.name}
                          type={field.type}
                          onChange={onDataChange}
                          placeholder={field.placeholder}
                          style={{ opacity: '.65' }}
                        />
                      )}
                    </Form.Group>
                  ))}
                </Col>
                <Col xs={3} className="m-auto">
                  <LoadingButton
                    className="mx-auto my-2"
                    variant="mar2"
                    onClick={handleLogin}
                    btnText="Login"
                  />
                </Col>
              </Row>
              <div className="d-flex">
                <span
                  className="w-100 mx-auto small text-secondary"
                  style={{
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                  onClick={() => navigate('/register')}
                  aria-hidden
                >
                  register
                </span>
              </div>
            </Form>
          </div>
        </>
      )}
      <Warn
        setting={{
          show: showWarn,
          handleClose: () => {
            setshowWarn(false)
          },
        }}
      />
    </Container>
  )
}

Warn.propTypes = {
  setting: PropTypes.shape().isRequired,
}

export default Home
