/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleExclamation,
  faCirclePlus,
  faDownload,
  faPenToSquare,
  faSearch,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons'
import { DateRange } from 'react-date-range'
import {
  Row,
  Col,
  Button,
  ListGroup,
  ListGroupItem,
  Form,
  Modal,
  InputGroup,
  Container,
  Image,
} from 'react-bootstrap'
// import apiServices from '../services/apiServices'
// import { video_sm } from '../assets'
import { UploaderContext } from './CheloniaContextProvider'
// import { architecture } from '../../assets'
// import { nenerabi } from '../../assets'

function DeleteModal({ setting }) {
  const { show, name, handleClose } = setting

  return (
    <Modal
      style={{ zIndex: '1501' }}
      show={show}
      onHide={() => handleClose()}
      className="py-2 px-4"
    >
      <Modal.Header closeButton />
      <Modal.Body className="p-4">
        <div className="d-flex">
          <FontAwesomeIcon
            className="px-0 m-auto text-chelonia text-center"
            style={{
              height: '100px',
            }}
            icon={faCircleExclamation}
          />
        </div>
        <h5 className="text-center lh-lg text-chelonia">
          <br />
          刪除後無法復原，
          <br />
          仍要刪除
          <span className="text-danger">{`「${name}」素材`}</span>
          嗎？
        </h5>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button
          className="ms-auto me-2"
          style={{ boxShadow: 'none' }}
          variant="secondary"
          onClick={() => handleClose()}
        >
          取 消
        </Button>
        <Button
          className="me-auto"
          style={{ boxShadow: 'none' }}
          variant="chelonia-dark"
          onClick={() => handleClose(true)}
        >
          確 認
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

function ProjectModal({ setting }) {
  const { show, form, defaultValue = {}, handleClose } = setting
  const [showDate, setshowDate] = useState(false)

  const [data, setdata] = useState({})
  const onDataChange = (e) =>
    setdata({ ...data, [e.target.name]: e.target.value })

  useEffect(() => {
    if (show) {
      setshowDate(false)
      setdata(
        form.reduce(
          (prev, cur) => ({
            ...prev,
            [cur.name]: defaultValue.setting
              ? defaultValue.setting[cur.name]
              : '',
          }),
          {}
        )
      )
    }
  }, [show, defaultValue])
  const [date, setdate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  })
  return (
    <Modal
      style={{ zIndex: '1501' }}
      show={show}
      onHide={() => handleClose()}
      className="py-2 px-4"
    >
      <Modal.Header closeButton>
        {defaultValue.setting ? `編輯素材` : `新建素材`}
      </Modal.Header>
      <Modal.Body className="p-4">
        {form.map((f, i) => {
          switch (f.type) {
            case 'date':
              return (
                <React.Fragment key={i}>
                  <Form.Label className="mb-1 mt-3 fw-bold text-chelonia">
                    {f.label}
                  </Form.Label>
                  <InputGroup>
                    <Form.Control
                      name={f.name}
                      type="text"
                      value={data[f.name] || f.placeholder}
                      placeholder={f.placeholder}
                      onFocus={() => setshowDate(!showDate)}
                      readOnly
                    />
                    <div
                      style={{
                        height: showDate ? '100%' : '0%',
                        transition: 'height .3s ease-in',
                        position: 'absolute',
                        left: '-50',
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
                                )}-${moment(selection.endDate).format(
                                  'yyyy-MM-DD'
                                )}`,
                              },
                            })
                          }}
                          moveRangeOnFirstSelection={false}
                        />
                      )}
                    </div>
                    <Button
                      variant="chelonia2"
                      onClick={() => setshowDate(!showDate)}
                    >
                      確認
                    </Button>
                  </InputGroup>
                </React.Fragment>
              )
            case 'select':
              return (
                <React.Fragment key={i}>
                  <Form.Label className="mb-1 mt-3 fw-bold text-chelonia">
                    {f.label}
                  </Form.Label>

                  <Form.Select
                    name={f.name}
                    type={f.type}
                    value={data[f.name] || ''}
                    onChange={onDataChange}
                    placeholder={f.placeholder}
                    onFocus={() => setshowDate(false)}
                  >
                    <option value="">未選擇</option>
                    {f.content.map((c) => (
                      <option value={c}>{c}</option>
                    ))}
                  </Form.Select>
                </React.Fragment>
              )
            case 'file':
              return (
                <React.Fragment key={i}>
                  <Form.Label className="mb-1 mt-3 fw-bold text-chelonia">
                    {f.label}
                  </Form.Label>

                  <Form.Control
                    name={f.name}
                    type={f.type}
                    onChange={async (e) => {
                      // const formData = new FormData()
                      // formData.append('file', e.target.files[0])
                      // const temp = URL.createObjectURL(e.target.files[0])
                      // const audio = document.createElement('audio')
                      // audio.muted = true
                      // const source = document.createElement('source')
                      // source.src = temp // --> blob URL
                      // audio.preload = 'metadata'
                      // audio.appendChild(source)
                      // audio.onloadedmetadata = () => {
                      //   setDuration(audio.duration)
                      // }
                      // const uploaded = await apiServices.data({
                      //   path: `material/file`,
                      //   method: 'post',
                      //   data: formData,
                      //   contentType: 'multipart/form-data',
                      // })
                      // console.log(uploaded)
                      onDataChange({
                        target: {
                          name: f.name,
                          value: e.target.files[0],
                        },
                      })
                    }}
                    placeholder={f.placeholder}
                    onFocus={() => setshowDate(false)}
                  />
                </React.Fragment>
              )
            default:
              return (
                <React.Fragment key={i}>
                  <Form.Label className="mb-1 mt-3 fw-bold text-chelonia">
                    {f.label}
                  </Form.Label>

                  <Form.Control
                    name={f.name}
                    type={f.type}
                    value={data[f.name] || ''}
                    onChange={onDataChange}
                    placeholder={f.placeholder}
                    onFocus={() => setshowDate(false)}
                  />
                </React.Fragment>
              )
          }
        })}
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button
          className="ms-auto"
          style={{ boxShadow: 'none' }}
          variant="secondary"
          onClick={() => handleClose()}
        >
          取 消
        </Button>
        <Button
          className="me-auto"
          style={{ boxShadow: 'none' }}
          variant="chelonia-dark"
          onClick={() => handleClose(data)}
        >
          確 認
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

function MaterialList() {
  // const navigate = useNavigate()

  const { materials, handleUpload, handleDelete } = useContext(UploaderContext)
  if (false) handleUpload()

  const form = [
    // {
    //   name: 'id',
    //   label: '素材編號',
    //   placeholder: '',
    //   type: 'text',
    // },
    {
      name: 'type',
      label: '素材類型',
      placeholder: '',
      type: 'select',
      content: ['浮水印', '轉場動畫', '直播廣告圖卡', 'PSD Template'],
    },
    // {
    //   name: 'name',
    //   label: '素材名稱',
    //   placeholder: '',
    //   type: 'text',
    // },
    {
      name: 'file',
      label: '素材',
      placeholder: '',
      type: 'file',
    },
  ]

  const [selectedId, setselectedId] = useState('')

  // const [duration, setDuration] = useState(0)
  // const handleAdd = async () => {
  // console.log(duration)
  // const res = await apiServices.data({
  //   path: `material`,
  //   method: 'post',
  //   data: {
  //     ...data,
  //     duration,
  //   },
  // })
  // if (!res.error) setList([res, ...list])
  // setselectedId('')
  // }

  // const handleEdit = async () => {
  // const res = await apiServices.data({
  //   path: `material/${selectedId}`,
  //   method: 'put',
  //   data,
  // })
  // if (!res.error)
  //   setList(list.map((l) => (l.material_id === selectedId ? res : l)))
  // setselectedId('')
  // }

  // const handleDelete = async () => {
  // const res = await apiServices.data({
  //   path: `material/${selectedId}`,
  //   method: 'delete',
  // })
  // if (!res.error) setList(list.filter((l) => l.material_id !== selectedId))
  // setselectedId('')
  // }

  const [show, setshow] = useState(false)
  const handleClose = (value) => {
    setshow(false)
    if (!value) return
    console.log(value)
    const { file, type } = value
    const types = {
      浮水印: 'wm',
      轉場動畫: 'ta',
      直播廣告圖卡: '',
      'PSD Template': '',
    }
    handleUpload(types[type], file, () => {})
    // console.log('adding')
    // if (selectedId) handleEdit(value)

    // handleAdd(value)
  }

  const [deleteShow, setdeleteShow] = useState(false)
  const handleDeleteClose = (value) => {
    setdeleteShow(false)
    if (value) {
      handleDelete(
        materials.find(
          ({ transition_animation_id, watermark_id, clip_id }) =>
            (transition_animation_id || watermark_id || clip_id) === selectedId
        )?.type,
        selectedId
      )
    }
  }

  const [tempSearch, setTempSearch] = useState('')
  const [search, setSearch] = useState('')
  const [focus, setFocus] = useState(false)
  const [selected, setselected] = useState('')

  return (
    <Container className="d-flex flex-column pt-3 h-100">
      <Row className="px-5">
        <Col xs={4} className="d-flex">
          <h5 className="my-auto text-chelonia-light fw-bold">素材管理</h5>
        </Col>
        <Col xs={3} className="d-flex justifu-content-end">
          <Form.Select
            className="w-100 h-100"
            aria-label="Default select example"
            onChange={(e) => setselected(e.target.value)}
            value={selected}
          >
            <option value="" className="d-none">
              選擇素材類型
            </option>
            {['浮水印', '轉場動畫', '直播廣告圖卡', 'PSD Template'].map(
              (label, i) => (
                <option key={i} value={label}>
                  {label}
                </option>
              )
            )}
          </Form.Select>
        </Col>
        <Col xs={5} className="d-flex pe-0">
          <InputGroup>
            <Form.Control
              placeholder="輸入關鍵字以搜尋素材..."
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={tempSearch}
              onChange={(event) => setTempSearch(event.target.value)}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              onKeyDown={(event) => {
                if (
                  event.key === 'Enter' &&
                  !event.nativeEvent.isComposing &&
                  focus
                )
                  setSearch(tempSearch)
              }}
            />
            <Button
              variant="outline-dark"
              id="button-addon2"
              title="搜 尋"
              onClick={() => setSearch(tempSearch)}
            >
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </InputGroup>
          <Button
            className="ms-4 w-50"
            variant="outline-dark"
            onClick={() => {
              // setselectedId('')
              setshow(true)
            }}
          >
            新增素材&ensp;
            <FontAwesomeIcon icon={faCirclePlus} />
          </Button>
        </Col>
      </Row>
      <Row
        className="flex-grow-1 pt-3 pb-5 px-5 h-100"
        style={{ overflowY: 'auto', overflowX: 'hidden' }}
      >
        {materials && materials.length ? (
          <ListGroup className="pe-0">
            {materials
              .filter(({ name }) => !search || (name && name.includes(search)))
              .map(
                (
                  {
                    name,
                    transition_animation_id,
                    watermark_id,
                    clip_id,
                    view_url,
                    created_on,
                    // type,
                    user_name,
                  },
                  i
                ) => (
                  <ListGroupItem className="d-flex" key={i}>
                    <div style={{ height: '5rem' }}>
                      {transition_animation_id ? (
                        <video
                          width="150px"
                          height="100%"
                          className="m-auto pe-2"
                          controls
                        >
                          <track kind="captions" />
                          <source src={view_url} />
                        </video>
                      ) : (
                        <Image
                          src={view_url}
                          width="150px"
                          height="100%"
                          className="m-auto pe-2"
                        />
                      )}
                    </div>
                    <p
                      className="w-25 my-auto text-start oneLineEllipsis"
                      title={name}
                    >
                      {/* {setting.date} */}
                      {name}
                    </p>
                    <small className="w-15 my-auto text-start ps-2">
                      <span className="fw-regular text-chelonia">24 MB</span>
                      <br />
                      <span className="fw-regular text-chelonia">類型｜</span>
                      {/* {setting.type} */}
                      <br />
                      <span className="fw-regular text-chelonia">建立者｜</span>
                      {user_name}
                      <br />
                      <span className="fw-regular text-chelonia">
                        建立時間｜
                      </span>
                      {moment(created_on).format('yyyy-MM-DD')}
                    </small>
                    <Button
                      className="ms-auto"
                      style={{ boxShadow: 'none' }}
                      variant="edit"
                      onClick={() => {
                        // setselectedId(material_id)
                        setshow(true)
                      }}
                      title="編 輯 素 材 編 號 ＆ 名 稱"
                      size
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </Button>
                    <Button
                      style={{ boxShadow: 'none' }}
                      title="下 載"
                      variant="edit"
                    >
                      <FontAwesomeIcon icon={faDownload} />
                    </Button>
                    <Button
                      style={{ boxShadow: 'none' }}
                      variant="red"
                      onClick={() => {
                        console.log(
                          transition_animation_id || watermark_id || clip_id
                        )
                        setselectedId(
                          transition_animation_id || watermark_id || clip_id
                        )
                        setdeleteShow(true)
                      }}
                      title="刪 除"
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </Button>

                    {/* <h2
                    className="my-auto text-grey"
                    style={{ userSelect: 'none' }}
                  >
                    ｜
                  </h2>

                  <Button
                    className="me-0"
                    style={{ boxShadow: 'none' }}
                    variant="edit"
                    // onClick={() => setId(time_id || range_id || draft_id)}
                    onClick={() => navigate('/Hightlights')}
                    title="影 片 剪 輯"
                  >
                    <FontAwesomeIcon icon={faScissors} />
                  </Button> */}
                  </ListGroupItem>
                )
              )}
          </ListGroup>
        ) : (
          <div className="d-flex ps-3 border">
            <h5 className="m-auto text-chelonia-light">目前尚無資料</h5>
          </div>
        )}
      </Row>
      <ProjectModal
        setting={{
          show,
          form,
          duration: '',
          setDuration: '',
          // defaultValue: selectedId
          //   ? list.find((l) => l.material_id === selectedId)
          //   : {},
          defaultValue: {},
          handleClose,
        }}
      />
      <DeleteModal
        setting={{
          show: deleteShow,
          name: materials.find(
            ({ transition_animation_id, watermark_id, clip_id }) =>
              (transition_animation_id || watermark_id || clip_id) ===
              selectedId
          )?.name,
          handleClose: handleDeleteClose,
        }}
      />
    </Container>
  )
}

DeleteModal.propTypes = {
  setting: PropTypes.shape().isRequired,
}

ProjectModal.propTypes = {
  setting: PropTypes.shape().isRequired,
}

export default MaterialList
