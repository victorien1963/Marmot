import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { DateRange } from 'react-date-range'
import moment from 'moment'
import {
  faCalendarAlt,
  faCaretDown,
  faCheckCircle,
  faCirclePlay,
  faCirclePlus,
  faCropSimple,
  faDownload,
  faFilm,
  faGear,
  faPlus,
  faScissors,
  faTimes,
  // faBars,
  // faPenToSquare,
  // faTrashCan,
} from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Container,
  Nav,
  Row,
  Col,
  Form,
  Button,
  FormLabel,
  InputGroup,
  Modal,
  // Badge,
  ListGroupItem,
} from 'react-bootstrap'
// import apiServices from '../services/apiServices'
// import { UploaderContext } from '../components/ContextProvider'
// import { video_sm } from '../assets'

// const subline = [
//   {
//     start: 1.8800000000000008,
//     end: 7.56,
//     text: '',
//   },
// ]

function ReplayModal({ setting }) {
  const { title, show, handleClose, src } = setting
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>{title}</Modal.Header>
      <Modal.Body>
        <Row>
          <Col xs={3} className="ms-auto">
            <Button
              className="ms-auto my-auto"
              style={{ boxShadow: 'none' }}
              title="下 載"
              variant="edit"
            >
              下載&ensp;
              <FontAwesomeIcon icon={faDownload} />
            </Button>
          </Col>
        </Row>
        <Row>
          <video width="150px" height="100%" className="m-auto pe-2" controls>
            <track kind="captions" />
            <source src={src} />
          </video>
        </Row>
      </Modal.Body>
    </Modal>
  )
}

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
      <div className="d-flex flex-nowrap w-100">
        <div className="d-flex px-2">
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

function Historical() {
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

  const [replaySetting, setreplaySetting] = useState({
    show: false,
    src: '',
  })

  return (
    <Container
      fluid
      className="d-flex flex-column px-4"
      onClick={() => setfocus(initFocus)}
    >
      <Nav>
        <div className="pt-2 nav nav-tabs" id="nav-tab" role="tablist">
          <button
            className="nav-link active"
            id="nav-home-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-home"
            type="button"
            role="tab"
            aria-controls="nav-home"
            aria-selected="true"
          >
            搜尋
          </button>
          <button
            className="nav-link"
            id="nav-profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-profile"
            type="button"
            role="tab"
            aria-controls="nav-profile"
            aria-selected="false"
          >
            剪輯 (0)
          </button>
        </div>
      </Nav>

      <div
        className="tab-content"
        id="nav-tabContent"
        style={{ height: '100%' }}
      >
        <div
          className="tab-pane fade show active py-3"
          // style={{ height: '80vh' }}
          id="nav-home"
          role="tabpanel"
          aria-labelledby="nav-home-tab"
        >
          <Row>
            <Col>
              <AutoComplete
                setting={{
                  text: '節目',
                  placeholder: '節目多選輸入框(多選)...',
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
              {/* <InputGroup className="mb-2">
                <Form.Label className="px-2 my-auto">節目</Form.Label>
                <Form.Control
                  readOnly
                  type="text"
                  placeholder="節目多選輸入框(多選)..."
                />
              </InputGroup> */}
            </Col>
            <Col>
              {/* <InputGroup className="mb-2">
                <Form.Label className="px-2 my-auto">活動</Form.Label>
                <Form.Control
                  readOnly
                  type="text"
                  placeholder="活動輸入框(多選)..."
                />
              </InputGroup> */}
              <AutoComplete
                setting={{
                  text: '活動',
                  placeholder: '活動輸入框(多選)...',
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
            <Col>
              <InputGroup>
                <Form.Label className="px-2 my-auto">日期</Form.Label>
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
                  variant="outline-dark"
                  onClick={() => setshowDate(!showDate)}
                >
                  <FontAwesomeIcon icon={faCalendarAlt} />
                </Button>
              </InputGroup>
            </Col>
            <Col className="my-auto">
              <InputGroup className="my-auto">
                <div key="only" className="my-auto text-chelonia-light fw-bold">
                  <Form.Check type="checkbox" id="only" label="ONLY" />
                </div>
              </InputGroup>
            </Col>
          </Row>
          <hr className="mt-1 mb-2" />
          <Row>
            <Col>
              {/* <InputGroup className="mb-2">
                <Form.Label className="px-2 my-auto">事件</Form.Label>
                <Form.Control readOnly type="text" placeholder="" />
              </InputGroup> */}
              <AutoComplete
                setting={{
                  text: '事件',
                  placeholder: '事件(多選)...',
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
              {/* <InputGroup className="mb-2">
                <Form.Label className="px-2 my-auto">人物</Form.Label>
                <Form.Control readOnly type="text" placeholder="" />
              </InputGroup> */}
              <AutoComplete
                setting={{
                  text: '人物',
                  placeholder: '人物(多選)...',
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
          <Row>
            <Col>
              {/* <InputGroup className="mb-2">
                <Form.Label className="px-2 my-auto">Tags</Form.Label>
                <Form.Control readOnly type="text" placeholder="" />
              </InputGroup> */}
              <AutoComplete
                setting={{
                  text: 'Tags',
                  placeholder: 'Tags...',
                  options: fakeOptions.tags,
                  handleSelect: (e) => handleSelect('tags', e),
                  show: focus.tags,
                  onFocus: () =>
                    setfocus({
                      ...focus,
                      tags: true,
                    }),
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <InputGroup className="mb-2">
                <Form.Label className="px-2 my-auto">片段</Form.Label>
                <Form.Control type="text" placeholder="搜尋片段名稱" />
              </InputGroup>
              {/* <AutoComplete
                setting={{
                  text: '片段',
                  placeholder: '片段...',
                  options: fakeOptions.clip,
                  handleSelect: (e) => handleSelect('clip', e),
                  show: focus.clip,
                  onFocus: () =>
                    setfocus({
                      ...focus,
                      clip: true,
                    }),
                }}
              /> */}
            </Col>
          </Row>
          <Row>
            <Col xs={10} />
            <Col xs={2} className="text-end pb-2">
              <Button size="sm" className="ms-auto" variant="warning">
                <FontAwesomeIcon icon={faPlus} /> 全部加入
              </Button>
            </Col>
          </Row>

          <div>
            <Row>
              <Col xs={1} />
              <Col xs={1}>Date</Col>
              <Col xs={3}>活動</Col>
              <Col xs={1}>人物</Col>
              <Col xs={4}>片段名稱</Col>
              <Col xs={2}>功能</Col>
            </Row>
            {[
              {
                description: null,
                duration: 0,
                location: null,
                name: '林來瘋再現_clip (1).mp4',
                taken_at: null,
                video_id: '087093fa-c507-47ee-a339-2df1956dfb72',
                view_url:
                  'http://localhost:7001/static/884b9d16-12bf-4104-b230-88674d26ca2e.mp4',
                view_url_expiration_at: '2024-04-18T10:49:42.302893',
              },
            ].map((h) => (
              <Row
                className="border-top border-bottom"
                style={{
                  height: '17vh',
                }}
              >
                <Col className="d-flex h-100" xs={1}>
                  <FontAwesomeIcon
                    className="m-auto me-2 text-icon"
                    icon={faPlus}
                  />
                  <FontAwesomeIcon
                    className="m-auto text-icon2"
                    icon={faStar}
                  />
                </Col>
                <Col className="d-flex h-100" xs={1}>
                  <span className="m-auto">
                    {moment(h.created_on).format('yyyy-MM-DD')}
                  </span>
                </Col>
                <Col className="d-flex h-100" xs={3}>
                  <span className="my-auto text-start oneLineEllipsis px-0">
                    {h.name}
                  </span>
                </Col>
                <Col className="d-flex h-100" xs={1}>
                  <span className="m-auto px-0">AI字幕</span>
                </Col>
                <Col className="d-flex h-100 py-2" xs={4}>
                  <span
                    className="my-auto h-100 text-start"
                    style={{
                      overflowY: 'scroll',
                      overflowX: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {/* {h.setting.subline
                      ? h.setting.subline.map(({ text }) => text).join()
                      : '(無字幕)'} */}
                  </span>
                </Col>
                <Col className="d-flex h-100" xs={2}>
                  <Button
                    className="m-auto text-nowrap"
                    style={{ boxShadow: 'none' }}
                    title="Replay"
                    variant="edit"
                    onClick={() =>
                      setreplaySetting({
                        ...replaySetting,
                        show: true,
                        title: h.name,
                        src: h.setting.uploadedVideo,
                      })
                    }
                  >
                    <FontAwesomeIcon icon={faCirclePlay} />
                  </Button>
                  <Button
                    className="m-auto text-nowrap"
                    style={{ boxShadow: 'none' }}
                    title="下 載"
                    variant="edit"
                  >
                    <FontAwesomeIcon icon={faDownload} />
                  </Button>
                  <Button
                    className="m-auto text-nowrap"
                    style={{ boxShadow: 'none' }}
                    title="剪 輯"
                    variant="edit"
                  >
                    <FontAwesomeIcon icon={faCropSimple} />
                  </Button>
                  <Button
                    className="m-auto text-nowrap"
                    style={{ boxShadow: 'none' }}
                    title="加 入"
                    variant="edit"
                  >
                    <FontAwesomeIcon icon={faCirclePlus} />
                  </Button>
                </Col>
              </Row>
            ))}
          </div>
        </div>

        <div
          className="tab-pane fade"
          style={{ height: '100%' }}
          id="nav-profile"
          role="tabpanel"
          aria-labelledby="nav-profile-tab"
        >
          <div className="h-100 w-100">
            {/* <Row className="d-flex p-3 pt-2 pb-0">
              <Col
                xs={12}
                className="fw-bold text-start text-chelonia-light my-auto pe-0"
              >
                影片剪輯
              </Col>
            </Row>
            <hr className="mx-2 mt-2 mb-1" /> */}
            <Row className="d-flex px-3 py-1">
              <Col
                xs={2}
                className="fw-bold text-start text-danger my-auto"
                style={{ cursor: 'pointer' }}
                // onClick={handleVideoClear}
              >
                清除
              </Col>
              <Col
                xs={2}
                className="fw-bold text-start text-danger my-auto px-0"
                style={{ cursor: 'pointer' }}
              >
                排列
                <FontAwesomeIcon icon={faCaretDown} />
              </Col>
              <Col
                xs={2}
                className="fw-bold text-start text-red my-auto px-0"
                style={{ cursor: 'pointer' }}
              >
                草稿
                <FontAwesomeIcon icon={faCaretDown} />
              </Col>
              <Col xs={6} className="d-flex ps-0">
                <Form.Select
                  name="size"
                  className="w-100 h-100"
                  aria-label="Default select example"
                  // onChange={handleSelected}
                  // value={selected.size}
                >
                  <option value="" className="d-none">
                    影片比例
                  </option>
                  {['Horizontal (16:9)'].map((label, i) => (
                    <option key={i} value={label}>
                      {label}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
            <hr className="mx-2 mt-2 mb-1" />
            <Row style={{ height: '21%' }}>
              <div className="h-100 w-100 border rounded bg-light">
                <FormLabel
                  htmlFor="file"
                  className="d-flex h-100 w-100"
                  style={{ cursor: 'pointer' }}
                  title="影 片 上 傳"
                >
                  <FontAwesomeIcon
                    icon={faFilm}
                    className="text-grey h-25 m-auto"
                  />
                </FormLabel>
              </div>
            </Row>

            <Row className="d-flex px-4 py-1">
              <Button
                size="sm"
                className="mt-1 ms-auto w-48"
                variant="outline-secondary"
                style={{ right: '0%', top: '0%' }}
                // onClick={() =>
                //   setMaterial({
                //     show: true,
                //     type: '轉場動畫',
                //     handleClose: (value) => {
                //       if (value) handleAddMaterial(value)
                //       setMaterial({
                //         show: false,
                //       })
                //     },
                //   })
                // }
              >
                加入轉場動畫&ensp;
                <FontAwesomeIcon icon={faCirclePlus} />
              </Button>
              <Button
                size="sm"
                className="mt-1 w-48 ms-2"
                variant="outline-secondary"
                style={{ right: '0%', top: '0%' }}
                // onClick={() => setshow(true)}
              >
                手動加入片段&ensp;
                <FontAwesomeIcon icon={faCirclePlus} />
              </Button>
            </Row>
            <Row className="d-flex p-3 py-2">
              <Form.Group as={Row} className="mb-1" controlId="watermark">
                <Form.Label column sm="4" className="py-1 px-0">
                  浮水印
                </Form.Label>
                <Col sm="8" className="px-0">
                  <Form.Select
                    name="pic"
                    className="w-100 h-100"
                    aria-label="Default select example"
                    // onChange={handleSelected}
                    // value={selected.pic}
                    size="sm"
                  >
                    <option value="" className="d-none">
                      選擇浮水印
                    </option>
                    {['浮水印_01', '浮水印_02', '浮水印_03'].map((label, i) => (
                      <option key={i} value={label}>
                        {label}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-1" controlId="psd_template">
                <Form.Label column sm="4" className="py-1 px-0">
                  PSD Template
                </Form.Label>
                <Col sm="8" className="px-0">
                  <Form.Select
                    name="psd"
                    className="w-100 h-100"
                    aria-label="Default select example2"
                    // onChange={handleSelected}
                    // value={selected.psd}
                    size="sm"
                  >
                    <option value="" className="d-none">
                      選擇PSD Template
                    </option>
                    {[
                      'PSD Template_01',
                      'PSD Template_02',
                      'PSD Template_03',
                    ].map((label, i) => (
                      <option key={i} value={label}>
                        {label}
                      </option>
                    ))}
                    <FontAwesomeIcon icon={faGear} />
                  </Form.Select>
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-1"
                controlId="transition_effect"
              >
                <Form.Label column sm="4" className="py-1 px-0 fs-7">
                  轉場效果
                </Form.Label>
                <Col sm="8" className="px-0">
                  <Form.Select
                    name="effect"
                    className="w-100 h-100"
                    aria-label="Default select example3"
                    // onChange={handleSelected}
                    // value={selected.effect}
                    size="sm"
                  >
                    <option value="" className="d-none">
                      選擇轉場效果
                    </option>
                    {['轉場效果_01', '轉場效果_02', '轉場效果_03'].map(
                      (label, i) => (
                        <option key={i} value={label}>
                          {label}
                        </option>
                      )
                    )}
                    <FontAwesomeIcon icon={faGear} />
                  </Form.Select>
                </Col>
              </Form.Group>
            </Row>
            <Row className="d-flex px-3 py-2">
              <Button
                size="md"
                className="mt-0 ms-auto w-100"
                variant="danger"
                style={{ right: '0%', top: '0%' }}
                // onClick={handleBindClips}
              >
                <FontAwesomeIcon icon={faScissors} />
                &ensp; 影片快剪&ensp; (總長: 00:00:00)
              </Button>
            </Row>
          </div>
        </div>
      </div>
      <ReplayModal
        setting={{
          ...replaySetting,
          handleClose: () =>
            setreplaySetting({
              ...replaySetting,
              show: false,
            }),
        }}
      />
    </Container>
  )
}

// ProjectModal.propTypes = {
//   setting: PropTypes.shape().isRequired,
// }

AutoComplete.propTypes = {
  setting: PropTypes.shape().isRequired,
}

ReplayModal.propTypes = {
  setting: PropTypes.shape().isRequired,
}

export default Historical
