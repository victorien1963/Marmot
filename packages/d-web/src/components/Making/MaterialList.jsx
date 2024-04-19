/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react'
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
  // Image,
} from 'react-bootstrap'
// import apiServices from '../services/apiServices'
// import { video_sm } from '../assets'
// import { UploaderContext } from './ContextProvider'
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

  // const { materials, handleUpload, handleDelete } = useContext(UploaderContext)
  // if (false) handleUpload()

  const [tempSearch, setTempSearch] = useState('')
  const [search, setSearch] = useState('')
  const [focus, setFocus] = useState(false)
  const [selected, setselected] = useState('')

  return (
    <Container className="d-flex flex-column pt-3 pe-0 h-100">
      <Row className="px-5">
        <Col xs={4} className="d-flex">
          <h4 className="my-auto text-grey">Material List</h4>
        </Col>
        <Col xs={3} className="d-flex justifu-content-end">
          <Form.Select
            className="w-100 h-100"
            aria-label="Default select example"
            onChange={(e) => setselected(e.target.value)}
            value={selected}
          >
            <option value="" className="d-none">
              material type...
            </option>
            {['Watermark', 'Transition', 'Ad', 'PSD Template'].map(
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
              placeholder="keywords..."
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
              variant="outline-light"
              id="button-addon2"
              title="Search"
              onClick={() => setSearch(tempSearch)}
            >
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </InputGroup>
          <Button
            className="ms-4 w-50"
            variant="mar"
            onClick={() => {
              // setselectedId('')
              // setshow(true)
            }}
          >
            Upload&ensp;
            <FontAwesomeIcon icon={faCirclePlus} />
          </Button>
        </Col>
      </Row>
      <Row
        className="flex-grow-1 pt-3 pb-5 px-5 h-100"
        style={{ overflowY: 'auto', overflowX: 'hidden', opacity: '.9' }}
      >
        <ListGroup className="pe-0">
          {[
            {
              clip_id: '34737549-342d-4f08-a4d1-08412b9a6fd7',
              description: 'my first clip',
              end: 198,
              name: '潮網訪談_(01)',
              source_video: 'bfd32c58-e1c4-46fa-b322-beb6f1fbd368',
              start: 3,
              type: 'Fragments',
              size: '24 MB',
            },
            {
              clip_id: '34737549-342d-4f08-a4d1-08412b9a6fd7',
              description: 'my first clip',
              end: 198,
              name: 'trasiton_(06)',
              source_video: 'bfd32c58-e1c4-46fa-b322-beb6f1fbd368',
              start: 3,
              type: 'Trasition',
              size: '10 MB',
            },
            {
              clip_id: '34737549-342d-4f08-a4d1-08412b9a6fd7',
              description: 'my first clip',
              end: 198,
              name: 'project_9054216730',
              source_video: 'bfd32c58-e1c4-46fa-b322-beb6f1fbd368',
              start: 3,
              type: 'Fragments',
              size: '5 MB',
            },
            {
              clip_id: '34737549-342d-4f08-a4d1-08412b9a6fd7',
              description: 'my first clip',
              end: 198,
              name: 'video_clip_(02)',
              source_video: 'bfd32c58-e1c4-46fa-b322-beb6f1fbd368',
              start: 3,
              type: 'clip',
              size: '0.3 MB',
            },
            {
              clip_id: '34737549-342d-4f08-a4d1-08412b9a6fd7',
              description: 'my first clip',
              end: 198,
              name: 'video_clip_(03)',
              source_video: 'bfd32c58-e1c4-46fa-b322-beb6f1fbd368',
              start: 3,
              type: 'clip',
              size: '7.9 MB',
            },
          ]
            .filter(({ name }) => !search || (name && name.includes(search)))
            .map(
              (
                {
                  name,
                  // transition_animation_id,
                  // watermark_id,
                  // clip_id,
                  // view_url,
                  created_on,
                  type,
                  user_name,
                  size,
                },
                i
              ) => (
                <ListGroupItem className="d-flex" key={i}>
                  <div style={{ height: '5rem' }}>
                    {/* {transition_animation_id ? ( */}
                    <video
                      width="150px"
                      height="100%"
                      className="m-auto pe-2"
                      controls
                    >
                      <track kind="captions" />
                      <source src="/api/static/884b9d16-12bf-4104-b230-88674d26ca2e.mp4" />
                    </video>
                    {/* ) : (
                      <Image
                        src={view_url}
                        width="150px"
                        height="100%"
                        className="m-auto pe-2"
                      />
                    )} */}
                  </div>
                  <p
                    className="w-25 my-auto text-start oneLineEllipsis"
                    title={name}
                  >
                    {/* {setting.date} */}
                    {name}
                  </p>
                  <small className="w-15 my-auto text-start ps-2">
                    <span className="fw-regular text-chelonia">{size}</span>
                    <br />
                    <span className="fw-regular text-chelonia">
                      type｜ {type}
                    </span>
                    {/* {setting.type} */}
                    <br />
                    <span className="fw-regular text-chelonia">editor｜</span>
                    {user_name}
                    <br />
                    <span className="fw-regular text-chelonia">date｜</span>
                    {moment(created_on).format('yyyy-MM-DD')}
                  </small>
                  <Button
                    className="ms-auto"
                    style={{ boxShadow: 'none' }}
                    variant="edit"
                    onClick={() => {
                      // setselectedId(material_id)
                      // setshow(true)
                    }}
                    title="rename"
                    size
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </Button>
                  <Button
                    style={{ boxShadow: 'none' }}
                    title="Dwonload"
                    variant="edit"
                  >
                    <FontAwesomeIcon icon={faDownload} />
                  </Button>
                  <Button
                    style={{ boxShadow: 'none' }}
                    variant="red"
                    onClick={() => {
                      // console.log(
                      //   transition_animation_id || watermark_id || clip_id
                      // )
                      // setselectedId(
                      //   transition_animation_id || watermark_id || clip_id
                      // )
                      // setdeleteShow(true)
                    }}
                    title="delete"
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
      </Row>
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
