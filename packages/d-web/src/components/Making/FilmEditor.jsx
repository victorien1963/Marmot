/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-promise-executor-return */
import React, { useState, useEffect, useMemo, useContext, useRef } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBars,
  faCaretDown,
  faCirclePlus,
  faFilm,
  faGear,
  faPenToSquare,
  faScissors,
  faSpinner,
  faTrashCan,
  faSearch,
  faDownload,
  faVectorSquare,
} from '@fortawesome/free-solid-svg-icons'
import {
  Row,
  Card,
  Container,
  Col,
  Form,
  FormLabel,
  Tab,
  Tabs,
  Button,
  ButtonToolbar,
  ButtonGroup,
  Image,
  Modal,
  InputGroup,
  ListGroup,
  ListGroupItem,
  Spinner,
} from 'react-bootstrap'
import moment from 'moment'
import { set } from 'date-fns'
// import TimeRange from 'react-video-timelines-slider'
// import { format } from 'date-fns'
import Warn from './Warn'
import { video_sm } from '../../asset'
import apiServices from '../../services/cheloniaServices'
import { UploaderContext } from './CheloniaContextProvider'
import AudioVisualizer from './AudioVisualizer'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
const now = new Date()
const getTodayAtSpecificHour = (hour = 12) =>
  set(now, { hours: hour, minutes: 0, seconds: 0, milliseconds: 0 })

const selectedStart = getTodayAtSpecificHour(5)
const selectedEnd = getTodayAtSpecificHour(15)

// function VideoProgressBar() {
//   const timeline = [
//     new Date('2022-11-22T21:51:44.054Z'),
//     new Date('2022-11-23T07:15:44.309Z'),
//   ]

//   const gap = [
//     {
//       start: new Date('2022-11-23T03:51:44.054Z'),
//       end: new Date('2022-11-23T04:15:44.309Z'),
//     },
//   ]
//   const [selectedInterval, setSelectedInterval] = useState([
//     new Date('2022-11-22T23:51:44.054Z'),
//     new Date('2022-11-23T01:51:44.054Z'),
//   ])
//   const [timelineScrubberError, setTimelineScrubberError] = useState(false)

//   const timelineScrubberErrorHandler = ({ error }) => {
//     setTimelineScrubberError(error)
//   }

//   const onChangeCallback = (i) => {
//     setSelectedInterval(i)
//   }

//   return (
//     <>
//       <br />
//       <br />
//       <TimeRange
//         showNow
//         error={timelineScrubberError}
//         ticksNumber={6}
//         selectedInterval={selectedInterval}
//         timelineInterval={timeline}
//         onUpdateCallback={timelineScrubberErrorHandler}
//         onChangeCallback={onChangeCallback}
//         disabledIntervals={gap}
//         step={1}
//         formatTick={(ms) => format(new Date(ms), 'HH:mm:ss')}
//         formatTooltip={(ms) => format(new Date(ms), 'HH:mm:ss.SSS')}
//         showToolTip
//       />
//     </>
//   )
// }

function SelectModal({ setting }) {
  const { show, type, handleClose } = setting
  const [selected, setSelected] = useState({})

  const [list, setList] = useState([])
  useEffect(() => {
    const getList = async () => {
      const res = await apiServices.data({
        path: `material`,
        method: 'get',
      })
      setList(res)
    }
    getList()
  }, [])

  return (
    <Modal
      style={{ zIndex: '1501' }}
      size="xl"
      show={show}
      onHide={() => handleClose(false)}
    >
      <Modal.Header
        className="AccFormModal justify-content-center text-center pt-4"
        closeButton
      >
        <Modal.Title>
          <h4>選擇{type}</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column pt-0">
        <Row className="px-3 py-2">
          <Col xs={5} className="d-flex pe-0 ms-auto">
            <InputGroup>
              <Form.Control
                placeholder="輸入關鍵字以搜尋素材..."
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                size="sm"
                // value={tempSearch}
                // onChange={(event) => setTempSearch(event.target.value)}
                // onFocus={() => setFocus(true)}
                // onBlur={() => setFocus(false)}
                // onKeyDown={(event) => {
                //   if (
                //     event.key === 'Enter' &&
                //     !event.nativeEvent.isComposing &&
                //     focus
                //   )
                //     setSearch(tempSearch)
                // }}
              />
              <Button
                variant="outline-dark"
                id="button-addon2"
                title="搜 尋"
                size="sm"
                // onClick={() => setSearch(tempSearch)}
              >
                <FontAwesomeIcon icon={faSearch} />
              </Button>
            </InputGroup>
          </Col>
        </Row>
        <ListGroup>
          {list.map(({ material_id, created_on, user_name, ...m }) => (
            <ListGroupItem className="d-flex" key={material_id}>
              <Form.Check
                className="my-auto ps-2 pe-4"
                checked={selected[material_id]}
                onChange={() =>
                  setSelected({
                    ...selected,
                    [material_id]: !selected[material_id],
                  })
                }
              />
              <div style={{ height: '5rem' }}>
                {m.setting.type === '轉場動畫' ? (
                  <video
                    width="120px"
                    height="100%"
                    className="m-auto pe-2"
                    controls
                  >
                    <track kind="captions" />
                    <source src={m.setting.file} />
                  </video>
                ) : (
                  <Image
                    src={video_sm}
                    width="120px"
                    height="100%"
                    className="m-auto pe-2"
                  />
                )}
              </div>
              <p
                className="w-40 my-auto text-start oneLineEllipsis"
                title={m.setting.name}
              >
                {m.setting.date}
                {m.setting.name}
              </p>
              <small className="w-15 my-auto text-start ps-2">
                <span className="fw-regular text-chelonia">24 MB</span>
                <br />
                <span className="fw-regular text-chelonia">類型｜</span>
                {m.setting.type}
                <br />
                <span className="fw-regular text-chelonia">建立者｜</span>
                {user_name}
                <br />
                <span className="fw-regular text-chelonia">建立時間｜</span>
                {moment(created_on).format('yyyy-MM-DD')}
              </small>
            </ListGroupItem>
          ))}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer className="sendForm justify-content-center py-3">
        <Button variant="secondary" onClick={() => handleClose(false)}>
          取消
        </Button>
        <Button
          variant="chelonia-dark"
          onClick={() =>
            handleClose(Object.keys(selected).filter((key) => selected[key]))
          }
        >
          確定
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

function FilmEditor() {
  //   const navigate = useNavigate()
  const audioElmRef = useRef(null)

  const [warn, setWarn] = useState({
    show: false,
    text: '',
    handleClose: () => {},
  })
  const [material, setMaterial] = useState({
    show: false,
    type: '',
    handleClose: () => {},
  })
  const [tempFile, settempFile] = useState(null)

  const { video_id } = useParams()
  const [video, setvideo] = useState({})
  //   const getVideo = async () => {
  //     const res = await apiServices.data({
  //       path: `video/${video_id}`,
  //       method: 'get',
  //     })
  //     setvideo(res)
  //   }

  const { handleUpload, videos } = useContext(UploaderContext)
  useEffect(() => {
    if (tempFile) {
      handleUpload(video_id, tempFile, (v) => {
        setvideo(v)
      })
    }
  }, [tempFile])

  useEffect(() => {
    if (video_id && videos.length) {
      const target = videos.find((v) => v.video_id === video_id)
      setvideo(target)
    }
  }, [video_id, videos])

  const handleVideoClear = async () => {
    const newVideo = await apiServices.data({
      path: `video/${video_id}`,
      method: 'put',
      data: {
        uploadedVideo: '',
      },
    })
    setvideo(newVideo)
  }

  const handleResortClips = async (e) => {
    const result = Array.from(video.setting.clips)
    const [removed] = result.splice(e.source.index, 1)
    result.splice(e.destination.index, 0, removed)
    const newVideo = await apiServices.data({
      path: `video/${video_id}`,
      method: 'put',
      data: {
        clips: result,
      },
    })
    setvideo(newVideo)
  }

  const [selected, setSelected] = useState({
    size: '',
    pic: '',
    psd: '',
    effect: '',
  })
  const handleSelected = (e) =>
    setSelected({
      ...selected,
      [e.target.name]: e.target.value,
    })

  const [generating, setgenerating] = useState({
    subline: false,
    clip: false,
  })

  const [subtitle, setsubtitle] = useState([])
  const getSubtitle = async (offset = 0) => {
    const res = await apiServices.data({
      path: `subtitle/management/?source_video=${video_id}`,
      method: 'get',
    })
    console.log(res)
    if (!res.count) return res.data
    if (res.count <= offset + 100) {
      const res2 = await getSubtitle(offset + 100)
      return res.data.concat(res2.data)
    }
    return res.data
  }
  const refreshSubtitle = async () => {
    const res = await getSubtitle()
    if (res.length) {
      setsubtitle(res)
    }
  }
  useEffect(() => {
    if (video_id) refreshSubtitle()
  }, [video_id])

  const handleSubline = async () => {
    setgenerating({
      ...generating,
      subline: true,
    })
    await delay(5000)
    // const { duration } = audioElmRef.current
    const created = await apiServices.data({
      path: `video/management/${video_id}/subtitle-generation-task/`,
      method: 'post',
      data: {
        language: 'en',
        prompt: 'This is a speech',
        temperature: 0.1,
      },
    })
    console.log(created)
    // await apiServices.data({
    //   path: `worker/subtitle/subtitle-generation-task/${listed.data[0].task_id}/`,
    //   method: 'patch',
    //   data: {
    //     task_status: 'PROCESSING',
    //   },
    // })
    const getStatus = async (clearFunc) => {
      const task = await apiServices.data({
        path: `video/management/${video_id}/subtitle-generation-task/`,
        method: 'get',
      })
      if (task.data && task.data.task_status === 'FINISHED') {
        refreshSubtitle()
        clearFunc()
      }
    }

    getStatus()
    const interval = setInterval(() => {
      getStatus(() => clearInterval(interval))
    }, 5000)

    setgenerating({
      ...generating,
      subline: false,
    })
  }

  const [cliper, setCliper] = useState([-1, -1])
  const handleClip = async () => {
    if (cliper.includes(-1)) {
      setWarn({
        show: true,
        text: '請先選擇片段',
        handleClose: () =>
          setWarn({
            ...warn,
            show: false,
          }),
      })
      return
    }
    const cliped = await apiServices.data({
      path: `video/edit/${video_id}/clip`,
      method: 'post',
      data: {
        start: video.setting?.subline[cliper[0]].start,
        end: video.setting?.subline[cliper[1]].end,
      },
    })
    setvideo(cliped)
  }

  const handleAddMaterial = async (material_ids) => {
    const cliped = await apiServices.data({
      path: `video/edit/${video_id}/clip`,
      method: 'post',
      data: {
        material_ids,
      },
    })
    setvideo(cliped)
  }

  const formatTime = (second) => {
    if (!second) return '00:00:00'
    return new Date(parseFloat(second) * 1000).toISOString().substr(11, 8)
  }

  const [selectedClips, setSelectedClips] = useState({})
  const clipDuration = useMemo(
    () =>
      Object.keys(selectedClips)
        .filter((key) => selectedClips[key])
        .reduce((prev, cur) => {
          const target = (video.setting?.clips || []).find(
            ({ id }) => parseInt(id, 10) === parseInt(cur, 10)
          )
          if (!target) return prev
          return target.start
            ? prev + (target.end - target.start)
            : prev + (target.duration || 0)
        }, 0),
    [selectedClips]
  )
  const handleBindClips = async () => {
    if (
      !Object.keys(selectedClips).filter((key) => selectedClips[key]).length
    ) {
      setWarn({
        show: true,
        text: '請選擇一個以上的片段或素材',
        handleClose: () =>
          setWarn({
            ...warn,
            show: false,
          }),
      })
      return
    }
    const cliped = await apiServices.data({
      path: `video/edit/${video_id}/bindClips`,
      method: 'post',
      data: {
        clip_ids: Object.keys(selectedClips).filter(
          (key) => selectedClips[key]
        ),
        duration: clipDuration,
      },
    })
    setvideo(cliped)
    setSelectedClips({})
  }

  const grid = 0
  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    cursor: isDragging ? 'grab' : 'pointer',
    ...draggableStyle,
  })

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? 'transparent' : 'transparent',
    padding: grid,
    width: '100%',
  })

  const [tempSearch, setTempSearch] = useState('')
  const [setSearch] = useState('')
  const [focus, setFocus] = useState(false)

  const [tab, setTab] = useState('audio-visualize')
  const [selectedInterval, setSelectedInterval] = useState([
    selectedStart,
    selectedEnd,
  ])

  const [clips, setclips] = useState([])
  const getClips = async () => {
    const res = await apiServices.data({
      path: '/clip/management/',
      method: 'get',
      params: {
        source_video: video_id,
      },
    })
    setclips(res.data)
  }
  useEffect(() => {
    if (video_id) getClips()
  }, [])

  const getClipRange = async () => {
    const { duration } = audioElmRef.current
    const max = 3600 * 20
    const start = parseInt(
      duration *
        (moment(selectedInterval[0]).diff(moment().startOf('day'), 'seconds') /
          max),
      10
    )
    const end = parseInt(
      duration *
        (moment(selectedInterval[1]).diff(moment().startOf('day'), 'seconds') /
          max),
      10
    )
    const created = await apiServices.data({
      path: 'clip/management/',
      method: 'post',
      data: {
        source_video: video_id,
        start,
        end,
        name: 'first clip',
        description: 'my first clip',
      },
    })
    getClips()
    console.log(created)
    const exporting = await apiServices.data({
      path: `clip/management/${created.data.clip_id}/clip-exporting-task/`,
      method: 'post',
    })
    console.log(exporting)
    const getStatus = async (clearFunc) => {
      const exported = await apiServices.data({
        path: `clip/management/${created.data.clip_id}/clip-exporting-task/`,
        method: 'get',
      })
      console.log(exported)
      if (exported.data && exported.data.task_status === 'FINISHED') {
        console.log(exported)
        clearFunc()
      }

      // if (!exported.error) {
      //   const link = document.createElement('a')
      //   link.href = exported.data.view_url
      //   link.setAttribute('download', `clip.mp4`)

      //   // Append to html link element page
      //   document.body.appendChild(link)

      //   // Start download
      //   link.click()

      //   // Clean up and remove the link
      //   link.parentNode.removeChild(link)
      //   console.log('exported, stop fetch')
      //   clearFunc()
      // }
    }

    getStatus()
    const interval = setInterval(() => {
      getStatus(() => clearInterval(interval))
    }, 5000)
  }

  const handleDownloadClip = async (clip_id) => {
    console.log(clip_id)
    const exported = await apiServices.data({
      path: `clip/management/${clip_id}/exported-clip/`,
      method: 'get',
    })
    // const videoData = await apiServices.extenal({
    //   url: exported.data.view_url,
    //   method: 'get',
    //   responseType: 'arraybuffer',
    // })
    // const blob = new Blob([videoData])
    const link = document.createElement('a')
    link.setAttribute('href', exported.data.view_url)
    link.setAttribute('target', `_blank`)
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  const handleDeleteClip = async (id) => {
    await apiServices.data({
      path: `/clip/management//${id}/`,
      method: 'delete',
    })
    getClips()
  }

  return (
    <Container className="d-flex p-3 h-100 w-100">
      <Row className="pb-2" style={{ width: '100vw' }}>
        <Col xs={7} className="h-100">
          <Card className="d-flex w-100" style={{ height: '54.75%' }}>
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
              }}
            />
            {video.view_url ? (
              <Col className="h-100 w-100 d-flex bg-black flex-column">
                <video
                  width="auto"
                  height="100%"
                  className="m-auto"
                  controls
                  ref={audioElmRef}
                  crossOrigin="anonymous"
                >
                  <track kind="captions" />
                  <source src={video.view_url} />
                </video>
              </Col>
            ) : (
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
            )}
          </Card>
          <Card className="w-100 mt-3" style={{ height: '42.25%' }}>
            <Row className="h-100 d-flex flex-column">
              <div
                className="w-100 position-absolute d-flex pe-0"
                style={{ top: '0%' }}
              >
                <Button
                  size="sm"
                  className="mt-1 ms-auto"
                  variant="outline-secondary"
                  onClick={handleSubline}
                  disabled={!video_id}
                >
                  AI自動生成&ensp;
                  <FontAwesomeIcon icon={faSpinner} />
                </Button>
                <Button
                  size="sm"
                  className="mt-1 ms-2"
                  variant="outline-secondary"
                  onClick={
                    tab === 'audio-visualize' ? getClipRange : handleClip
                  }
                  disabled={
                    tab !== 'audio-visualize' && !video.setting?.subline
                  }
                >
                  擷取片段&ensp;
                  <FontAwesomeIcon icon={faVectorSquare} />
                </Button>
              </div>
              <Col className="h-100 d-flex flex-column tab-90" xs={12}>
                <Tabs
                  defaultActiveKey="audio-visualize"
                  id="ai_subtitle"
                  className="mb-2"
                  onSelect={(e) => {
                    setTab(e)
                  }}
                >
                  <Tab
                    className="w-100 h-100"
                    eventKey="audio-visualize"
                    title="音頻擷取"
                  >
                    <AudioVisualizer
                      setting={{
                        show: tab === 'audio-visualize',
                        audioElmRef,
                        audioUrl: video.view_url,
                        selectedInterval,
                        setSelectedInterval,
                      }}
                    />
                    {/* <>
                      <br />
                      <br />
                      <br />
                      <h5 className="text-grey m-auto">目前尚無資料</h5>
                    </> */}
                  </Tab>
                  {/* <Tab eventKey="pin" title="手動標籤">
                    <br />
                    <br />
                    <br />
                    <h5 className="text-grey m-auto">目前尚無資料</h5>
                  </Tab> */}

                  <Tab
                    className="w-100 h-100"
                    eventKey="ai_subtitle"
                    title="自動字幕"
                  >
                    <Row className="px-2 w-100">
                      {/* Search bar */}
                      <Col xs={5} className="d-flex">
                        <Form.Control
                          className="w-100 h-100"
                          size="sm"
                          placeholder="AI 逐字稿搜尋..."
                          aria-label="Recipient's username"
                          aria-describedby="basic-addon2"
                          value={tempSearch}
                          onChange={(event) =>
                            setTempSearch(event.target.value)
                          }
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
                          className="h-100"
                          size="sm"
                          variant="outline-dark"
                          id="button-addon2"
                          title="搜 尋"
                          onClick={() => setSearch(tempSearch)}
                        >
                          <FontAwesomeIcon icon={faSearch} />
                        </Button>
                      </Col>

                      {/* Dropdown */}
                      <Col xs={5} className="d-flex">
                        <div className="d-flex w-100 h-100">
                          <Form.Select
                            name="pic"
                            className="w-100"
                            aria-label="Default select example"
                            onChange={handleSelected}
                            value={selected.pic}
                            size="sm"
                          >
                            <option value="" className="d-none">
                              1x
                            </option>
                            {['1x', '1.2x', '1.5x', '2x'].map((label, i) => (
                              <option key={i} value={label}>
                                {label}
                              </option>
                            ))}
                          </Form.Select>
                        </div>
                        <div className="d-flex w-100 h-100 ms-2">
                          <Form.Select
                            name="fontsize"
                            className="w-100 h-100"
                            aria-label="Default select example"
                            onChange={handleSelected}
                            value={selected.pic}
                            size="sm"
                          >
                            <option value="" className="d-none">
                              字體大小
                            </option>
                            {['1', '1.2x', '1.5x', '2x'].map((label, i) => (
                              <option key={i} value={label}>
                                {label}
                              </option>
                            ))}
                          </Form.Select>
                        </div>
                      </Col>

                      {/* Checkbox */}
                      <Col
                        xs={2}
                        className="my-auto"
                        style={{ userSelect: 'none' }}
                      >
                        {['checkbox'].map((type) => (
                          <Form.Check
                            key=""
                            type={type}
                            id="checked"
                            label="自動跟蹤影片"
                            className="fs-7 fw-bold text-chelonia-light mb-0"
                          />
                        ))}
                      </Col>
                    </Row>

                    {generating.subline ? (
                      <>
                        <br />
                        <br />
                        <br />
                        <h5 className="text-grey m-auto d-flex justify-content-center">
                          <Spinner size="sm" className="me-2 my-auto" />
                          字幕生成中...
                        </h5>
                      </>
                    ) : subtitle.length ? (
                      subtitle
                        .filter(
                          ({ text, source_video }) =>
                            !['ddc', 'cc'].includes(text) &&
                            source_video === video_id
                        )
                        .map(({ start, end, text }, i) => (
                          <Row
                            key={i}
                            className="text-start text-nowrap ps-3"
                            style={{
                              cursor: 'pointer',
                              backgroundColor: (
                                cliper.every((c) => c !== -1)
                                  ? i <= cliper[1] && i >= cliper[0]
                                  : cliper.includes(i)
                              )
                                ? '#cddfed'
                                : 'white',
                            }}
                            onClick={() => {
                              if (cliper.includes(i))
                                setCliper(cliper.map((c) => (c === i ? -1 : c)))
                              else if (i > cliper[1])
                                setCliper([
                                  cliper[0] === -1 ? cliper[1] : cliper[0],
                                  i,
                                ])
                              else setCliper([i, cliper[1]])
                            }}
                          >
                            <Col className="ps-2" xs={2}>
                              {formatTime(start)}
                            </Col>
                            <Col className="ps-2" xs={2}>
                              {formatTime(end)}
                            </Col>
                            <Col
                              className="ps-2 oneLineEllipsis"
                              title={text}
                              xs={8}
                            >
                              {text}
                            </Col>
                          </Row>
                        ))
                    ) : (
                      <>
                        <br />
                        <br />
                        <br />
                        <h5 className="text-grey m-auto">目前尚無資料</h5>
                      </>
                    )}
                  </Tab>

                  {/* <Tab
                    className="w-100 h-100"
                    eventKey="fix_subtitle"
                    title="字幕修正"
                  /> */}
                </Tabs>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col className="h-100 pe-4 overflow-scroll" xs={5}>
          <Card
            className="mb-3 w-100"
            style={{
              height: '18%',
            }}
          >
            <Row className="d-flex p-3 pt-2 pb-0">
              <Col
                xs={12}
                className="fw-bold text-start text-chelonia-light my-auto pe-0"
              >
                快速選項
              </Col>
            </Row>
            <hr className="mx-2 mt-2 mb-1" />
            <Row className="p-2">
              <Col xs={4} className="d-flex me-auto">
                <Button
                  className="px-2"
                  style={{ boxShadow: 'none' }}
                  variant="outline-chelonia"
                  title="-5s"
                >
                  -5s
                </Button>
                <Button
                  className="px-2 ms-1"
                  style={{ boxShadow: 'none' }}
                  variant="outline-chelonia"
                  title="-1s"
                >
                  -1s
                </Button>
              </Col>
              <Col xs={4} className="d-flex mx-auto">
                <ButtonToolbar
                  aria-label="Toolbar with button groups"
                  className="mx-auto"
                >
                  <ButtonGroup
                    aria-label="Second group"
                    variant="outline-chelonia"
                  >
                    <Button variant="outline-chelonia px-2">¼x</Button>
                    <Button variant="outline-chelonia px-2">½x</Button>
                    <Button variant="outline-chelonia px-2">1x</Button>
                  </ButtonGroup>
                </ButtonToolbar>
              </Col>
              <Col xs={4} className="d-flex ms-auto">
                <Button
                  className="px-2 ms-auto"
                  style={{ boxShadow: 'none' }}
                  variant="outline-chelonia"
                  title="+1s"
                >
                  +1s
                </Button>
                <Button
                  className="px-2 ms-1"
                  style={{ boxShadow: 'none' }}
                  variant="outline-chelonia"
                  title="+5s"
                >
                  +5x
                </Button>
              </Col>
            </Row>
          </Card>

          <Card className="h-45 w-100">
            <Row className="d-flex p-3 pt-2 pb-0">
              <Col
                xs={12}
                className="fw-bold text-start text-chelonia-light my-auto pe-0"
              >
                影片剪輯
              </Col>
            </Row>
            <hr className="mx-2 mt-2 mb-1" />
            <Row className="d-flex px-3 py-1">
              <Col
                xs={2}
                className="fw-bold text-start text-danger my-auto"
                style={{ cursor: 'pointer' }}
                onClick={handleVideoClear}
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
                  onChange={handleSelected}
                  value={selected.size}
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
            <Row className="d-flex px-4 py-1">
              <Col xs={1} className="d-flex">
                <FontAwesomeIcon className="my-auto" icon={faBars} />
              </Col>
              <Col xs={2}>
                <Image
                  src={video_sm}
                  className="m-auto pe-2"
                  style={{ height: '3rem' }}
                />
              </Col>
              <Col xs={5} className="px-2 ps-3 my-auto">
                <h6 className="text-secondary fw-bold">手動片段</h6>
                <h6 className="text-grey fw-bold mb-0">04分06秒</h6>
              </Col>
              <Col xs={4} className="px-2 my-auto">
                <div>
                  <Button
                    className="ms-auto me-2"
                    style={{ boxShadow: 'none' }}
                    variant="edit me-2"
                    title="編 輯 影 片 編 號 ＆ 名 稱"
                    size
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </Button>
                  <Button
                    style={{ boxShadow: 'none' }}
                    variant="red"
                    title="刪 除"
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </Button>
                </div>
              </Col>
            </Row>
            <Row className="d-flex px-4 py-1">
              <Button
                size="sm"
                className="mt-1 ms-auto w-48"
                variant="outline-secondary"
                style={{ right: '0%', top: '0%' }}
                onClick={() =>
                  setMaterial({
                    show: true,
                    type: '轉場動畫',
                    handleClose: (value) => {
                      if (value) handleAddMaterial(value)
                      setMaterial({
                        show: false,
                      })
                    },
                  })
                }
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
                    onChange={handleSelected}
                    value={selected.pic}
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
                    onChange={handleSelected}
                    value={selected.psd}
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
                    onChange={handleSelected}
                    value={selected.effect}
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
                onClick={handleBindClips}
              >
                <FontAwesomeIcon icon={faScissors} />
                &ensp; 影片快剪&ensp; (總長: {formatTime(clipDuration)})
              </Button>
            </Row>
          </Card>
          <Card className="h-40 w-100 mt-3 ps-2">
            <Row className="d-flex w-100 px-1 py-2 pb-0">
              <Col
                xs={12}
                className="fw-bold text-start text-chelonia-light my-auto pe-0"
              >
                影片管理
              </Col>
              <hr className="mx-2 mt-2 mb-1" />
            </Row>
            <DragDropContext onDragEnd={handleResortClips}>
              <Droppable droppableId="droppable" direction="vertical">
                {(dropProvided, dropSnapshot) => (
                  <Row
                    className="ps-3 pe-0 overflow-scroll"
                    {...dropProvided.droppableProps}
                    ref={dropProvided.innerRef}
                    style={getListStyle(dropSnapshot.isDraggingOver)}
                  >
                    {clips.map(({ clip_id, start, end, name }, i) => (
                      <Draggable
                        key={`${clip_id}`}
                        draggableId={`${clip_id}`}
                        index={i}
                      >
                        {(dragProvided, dragSnapshot) => (
                          <Row
                            ref={dragProvided.innerRef}
                            {...dragProvided.draggableProps}
                            className="text-start text-nowrap px-2"
                            style={{
                              cursor: 'pointer',
                              backgroundColor: selectedClips[clip_id]
                                ? '#cddfed'
                                : 'white',
                              ...getItemStyle(
                                dragSnapshot.isDragging,
                                dragProvided.draggableProps.style
                              ),
                            }}
                            onClick={() =>
                              setSelectedClips({
                                ...selectedClips,
                                [clip_id]: !selectedClips[clip_id],
                              })
                            }
                          >
                            <Col className="d-flex ps-0" xs={1}>
                              <Button
                                {...dragProvided.dragHandleProps}
                                style={{ boxShadow: 'none' }}
                                variant="edit"
                                // onClick={() => handleDeleteClip(id)}
                                title="調 整 順 序"
                              >
                                <FontAwesomeIcon icon={faBars} />
                              </Button>
                            </Col>
                            {start ? (
                              <Col
                                className="my-auto ps-1 pe-2 fw-bold text-chelonia-light"
                                xs={2}
                              >
                                <p className="my-auto">
                                  {formatTime(end - start)}
                                </p>
                              </Col>
                            ) : (
                              <Col
                                xs={2}
                                className="my-auto ps-1 pe-2 fw-bold text-chelonia-light"
                              >
                                {formatTime(end - start)}
                              </Col>
                            )}
                            <Col className="d-flex px-1" xs={7}>
                              <p
                                className="my-auto oneLineEllipsis"
                                title={`${name}`}
                              >
                                {name}
                              </p>
                            </Col>
                            <Col className="d-flex p-0 ms-auto" xs={1}>
                              <Button
                                className="p-2"
                                style={{
                                  boxShadow: 'none',
                                }}
                                variant="edit"
                                onClick={() => {
                                  handleDownloadClip(clip_id)
                                  // if (type === '快剪') {
                                  //   handleDownload('video/file/merged.mp4')
                                  // } else if (type === '轉場動畫') {
                                  //   handleDownload(
                                  //     'video/file/1707113570365_8510520_MotionElements_wireframe-party-hd.mp4'
                                  //   )
                                  // } else {
                                  //   handleDownload(
                                  //     parseInt(start, 10) === 10
                                  //       ? 'video/file/clipped_video-1.mp4'
                                  //       : 'video/file/clipped_video-2.mp4'
                                  //   )
                                  // }
                                }}
                                title="下 載"
                              >
                                <FontAwesomeIcon
                                  className="fs-5"
                                  icon={faDownload}
                                />
                              </Button>
                            </Col>
                            <Col className="d-flex p-0" xs={1}>
                              <Button
                                className="p-2"
                                style={{ boxShadow: 'none' }}
                                variant="red"
                                onClick={() => {
                                  setWarn({
                                    show: true,
                                    text: `確定要刪除${name}嗎`,
                                    handleClose: (value) => {
                                      if (value) handleDeleteClip(clip_id)
                                      setWarn({
                                        ...warn,
                                        show: false,
                                      })
                                    },
                                  })
                                }}
                                title="刪 除"
                              >
                                <FontAwesomeIcon
                                  className="fs-5"
                                  icon={faTrashCan}
                                />
                              </Button>
                            </Col>
                          </Row>
                        )}
                      </Draggable>
                    ))}
                  </Row>
                )}
              </Droppable>
            </DragDropContext>
          </Card>
        </Col>
      </Row>
      {warn.show && <Warn setting={warn} />}
      {material.show && <SelectModal setting={material} />}
    </Container>
  )
}

SelectModal.propTypes = {
  setting: PropTypes.shape().isRequired,
}

export default FilmEditor
