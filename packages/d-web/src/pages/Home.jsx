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
import { logoFull } from '../asset'

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
      label: '帳號',
      type: 'text',
      name: 'email',
      placeholder: '帳號',
    },
    {
      label: '密碼',
      type: 'password',
      name: 'password',
      placeholder: '密碼',
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
        title: '內容規劃',
        subTitle: '前期計畫 + 製作',
        icon: faCircleRadiation,
        link: '/user/content',
      },
      {
        title: '製作',
        subTitle: 'AI影片剪輯',
        icon: faCircleRadiation,
        link: '/user/making',
      },
      {
        title: '數據分析',
        subTitle: '報表 + 成效報告',
        icon: faCircleRadiation,
        link: '/user/analyze',
      },
      {
        title: '收費內容',
        subTitle: '頻道會員 + 課程',
        icon: faCircleRadiation,
        link: '/user/paycontent',
      },
      {
        title: '產品',
        subTitle: '電商整合',
        icon: faCircleRadiation,
        link: '/user/product',
      },
      {
        title: '品牌合作',
        subTitle: '業配商案',
        icon: faCircleRadiation,
        link: '/user/brand',
      },
    ],
    admin: [
      {
        title: '行銷數據洞察',
        subTitle: 'ORCA',
        icon: faCircleRadiation,
        link: '/',
      },
      {
        title: '行銷資源整合',
        subTitle: 'LUCA + DCP Partner Sales',
        icon: faCircleRadiation,
        link: '/',
      },
      {
        title: '廣告合作',
        subTitle: '網紅商案媒合',
        icon: faCircleRadiation,
        link: '/admin/cooperate',
      },
      {
        title: '產品',
        subTitle: '電商整合',
        icon: faCircleRadiation,
        link: '/admin/product',
      },
    ],
  }

  return (
    <Container className="bg-dots-light h-100 w-100 d-flex flex-column position-relative">
      {auth.authed ? (
        <>
          <Row className="h-50">
            <Col
              className="bg-user-marmot d-flex flex-column justify-content-center"
              xs={2}
            >
              <h3>創作者</h3>
              <h3>媒體公司</h3>
            </Col>
            <Col xs={10}>
              <Row className="h-100 py-3">
                {contents.user.map((c) => (
                  <Col key={c.title} xs={4} className="p-3 border-end">
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
              className="bg-admin-marmot d-flex flex-column justify-content-center"
              xs={2}
            >
              <h3>廣告商</h3>
              <h3>品牌</h3>
            </Col>
            <Col xs={10}>
              <Row className="h-100 py-3">
                {contents.admin.map((c) => (
                  <Col key={c.title} xs={4} className="p-3 border-end">
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
          </Row>{' '}
        </>
      ) : (
        <>
          <div className="d-flex" style={{ height: '65%' }}>
            <Image
              className="mt-auto mx-auto"
              src={logoFull}
              style={{ height: '25rem', width: 'auto' }}
            />
          </div>
          <div className="d-flex w-100 mb-auto" style={{ height: '35%' }}>
            <Form className="py-3 px-5 mx-auto d-flex flex-column">
              {fields.map((field) => (
                <Form.Group key={field.name} className="d-flex mb-2">
                  {/* <Form.Label>{field.label}</Form.Label> */}
                  {field.type === 'password' ? (
                    <InputGroup
                      id="defaultBorder"
                      className="rounded input-group-transparent-addon w-100"
                    >
                      <Form.Control
                        name={field.name}
                        type={reveal ? 'text' : field.type}
                        onChange={onDataChange}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.isComposing) handleLogin()
                        }}
                        placeholder={field.placeholder}
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
                          title={reveal ? '點擊以隱藏密碼' : '點擊以顯示密碼'}
                          icon={reveal ? faEye : faEyeSlash}
                          onClick={() => setReveal(!reveal)}
                        />
                      </InputGroup.Text>
                    </InputGroup>
                  ) : (
                    <Form.Control
                      name={field.name}
                      type={field.type}
                      onChange={onDataChange}
                      placeholder={field.placeholder}
                    />
                  )}
                </Form.Group>
              ))}
              <LoadingButton
                className="mx-auto my-2"
                variant="outline-dai"
                onClick={handleLogin}
                btnText="登入"
              />
              <div className="d-flex">
                <span
                  className="w-100 mx-auto small"
                  style={{
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                  onClick={() => navigate('/register')}
                  aria-hidden
                >
                  註冊
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
