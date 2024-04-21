import React, { useEffect, useState } from 'react'
import { Nav, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCloudArrowUp,
  faFilm,
  faFolder,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router-dom'
import FilmEditor from './FilmEditor'
import VideoList from './VideoList'
import MaterialList from './MaterialList'
import Historical from './Historical'

function Edit() {
  const { video_id } = useParams()
  const [page, setpage] = useState('Video List')
  const pages = {
    'Video List': <VideoList />,
    'Material List': <MaterialList />,
    'Film Editor': <FilmEditor />,
    'Historical Search': <Historical />,
  }
  const icons = {
    'Video List': faFolder,
    'Material List': faCloudArrowUp,
    'Film Editor': faFilm,
    'Historical Search': faMagnifyingGlass,
  }

  // console.log(video_id)
  // console.log(page)
  useEffect(() => {
    if (video_id) setpage('影片製作')
  }, [video_id])
  return (
    <div className="w-100 h-100 overflow-scroll">
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
          {Object.keys(pages).map((key) => (
            <Nav.Link
              key={key}
              className="text-secondary fw-bold"
              href=""
              onClick={() => setpage(key)}
            >
              <FontAwesomeIcon icon={icons[key]} />
              &ensp;{key}
            </Nav.Link>
          ))}
        </Nav>
      </Row>
      <Row
        className="w-100"
        style={{
          height: '94%',
        }}
      >
        {pages[page]}
      </Row>
      {/* <iframe
        title="chelonia"
        src="http://158.101.139.157:3001"
        width="100%"
        height="100%"
      /> */}
    </div>
  )
}

export default Edit
