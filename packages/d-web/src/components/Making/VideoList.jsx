/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleExclamation,
  faCirclePlus,
  faPenToSquare,
  faTrashCan,
  faSearch,
  faScissors,
} from '@fortawesome/free-solid-svg-icons'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'
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
  FormLabel,
} from 'react-bootstrap'
import apiServices from '../../services/cheloniaServices'
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
          <span className="text-danger">{`「${name}」影片`}</span>
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
        {defaultValue.setting ? `編輯影片` : `新建影片`}
      </Modal.Header>
      <Modal.Body className="p-4 pb-5">
        {form.map((f, i) => (
          <React.Fragment key={i}>
            <Form.Label className="mt-3 mb-1 fw-bold text-chelonia">
              {f.label}
            </Form.Label>
            {f.type === 'date' ? (
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
            ) : (
              <Form.Control
                name={f.name}
                type={f.type}
                value={data[f.name] || ''}
                onChange={onDataChange}
                placeholder={f.placeholder}
                onFocus={() => setshowDate(false)}
              />
            )}
          </React.Fragment>
        ))}
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

function VideoList() {
  const navigate = useNavigate()

  const { handleUpload, handleDelete, videos, setVideos } =
    useContext(UploaderContext)
  const [tempFile, settempFile] = useState(null)
  useEffect(() => {
    if (tempFile) {
      handleUpload('', tempFile, (v) => {
        console.log(v)
      })
    }
  }, [tempFile])

  const form = [
    {
      name: 'id',
      label: '影片編號',
      placeholder: '',
      type: 'text',
    },
    {
      name: 'name',
      label: '影片名稱',
      placeholder: '',
      type: 'text',
    },
  ]

  const [selectedId, setselectedId] = useState('')

  const handleAdd = async (data) => {
    const res = await apiServices.data({
      path: `video`,
      method: 'post',
      data,
    })
    if (!res.error) setVideos([res, ...videos])
    setselectedId('')
  }

  const handleEdit = async (data) => {
    const res = await apiServices.data({
      path: `video/${selectedId}`,
      method: 'put',
      data,
    })
    if (!res.error)
      setVideos(videos.map((l) => (l.video_id === selectedId ? res : l)))
    setselectedId('')
  }

  const [show, setshow] = useState(false)
  const handleClose = (value) => {
    setshow(false)
    if (!value) return
    if (selectedId) handleEdit(value)
    else {
      handleAdd(value)
    }
  }

  const [deleteShow, setdeleteShow] = useState(false)
  const handleDeleteClose = (value) => {
    setdeleteShow(false)
    if (value) {
      handleDelete('video', selectedId)
      setselectedId('')
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
          <h5 className="my-auto text-chelonia-light fw-bold">全部影片</h5>
        </Col>
        <Col xs={3} className="d-flex justifu-content-end">
          <Form.Select
            className="w-100 h-100"
            aria-label="Default select example"
            onChange={(e) => setselected(e.target.value)}
            value={selected}
          >
            <option value="" className="d-none">
              選擇分類
            </option>
            {['影片分類一', '影片分類二', '影片分類三'].map((label, i) => (
              <option key={i} value={label}>
                {label}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col xs={5} className="d-flex pe-0">
          <InputGroup>
            <Form.Control
              placeholder="輸入關鍵字以搜尋影片..."
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
          <Form.Control
            className="p-0 m-0 border-0"
            id="file"
            name="file"
            type="file"
            multiple
            accept="video/*"
            // value={fileList}
            onChange={(e) => {
              // setuploading(true)
              settempFile(e.target.files[0])
              e.target.value = null
            }}
            style={{
              visibility: 'hidden',
              width: '0px',
              height: '0px',
            }}
          />
          <FormLabel
            htmlFor="file"
            className="d-flex h-100 w-50 ms-4 btn btn-outline-dark mb-0"
            style={{ cursor: 'pointer' }}
            title="影 片 上 傳"
          >
            <span className="m-auto">
              新增影片&ensp;
              <FontAwesomeIcon icon={faCirclePlus} />
            </span>
          </FormLabel>
        </Col>
      </Row>
      <Row
        className="flex-grow-1 pt-3 pb-5 px-5 h-100"
        style={{ overflowY: 'auto', overflowX: 'hidden' }}
      >
        {videos && videos.length ? (
          <ListGroup className="pe-0">
            {videos
              .filter(({ name }) => !search || (name && name.includes(search)))
              .map(({ video_id, name }, i) => (
                <ListGroupItem className="d-flex" key={i}>
                  <p
                    className="w-40 my-auto text-start oneLineEllipsis"
                    title={name}
                  >
                    <span className="fw-regular text-chelonia" />
                    檔名｜
                    {/* {setting.date} */}
                    {name}
                  </p>
                  {/* <small className="w-15 my-auto text-start ps-2">
                    <span className="fw-regular text-chelonia">建立者｜</span>
                    {user_name}
                    <br />
                    <span className="fw-regular text-chelonia">建立時間｜</span>
                    {moment(created_on).format('yyyy-MM-DD')}
                  </small> */}
                  <Button
                    className="ms-auto me-2"
                    style={{ boxShadow: 'none' }}
                    variant="edit me-2"
                    onClick={() => {
                      setselectedId(video_id)
                      setshow(true)
                    }}
                    title="重 新 命 名"
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </Button>
                  <Button
                    className="me-2"
                    style={{ boxShadow: 'none' }}
                    variant="red"
                    onClick={() => {
                      setselectedId(video_id)
                      setdeleteShow(true)
                    }}
                    title="刪 除"
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </Button>

                  <h2
                    className="my-auto text-grey"
                    style={{ userSelect: 'none' }}
                  >
                    ｜
                  </h2>

                  <Button
                    style={{ boxShadow: 'none' }}
                    variant="youtube"
                    onClick={() => {
                      setselectedId(video_id)
                      setdeleteShow(true)
                    }}
                    title="直 播 轉 送"
                  >
                    <FontAwesomeIcon icon={faYoutube} />
                  </Button>

                  <h2
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
                    onClick={() => navigate(`/user/making/edit/${video_id}`)}
                    title="影 片 剪 輯"
                  >
                    <FontAwesomeIcon icon={faScissors} />
                  </Button>
                </ListGroupItem>
              ))}
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
          defaultValue: selectedId
            ? videos.find((l) => l.video_id === selectedId)
            : {},
          handleClose,
        }}
      />
      <DeleteModal
        setting={{
          show: deleteShow,
          name: videos.find((l) => l.video_id === selectedId)?.name,
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

export default VideoList
