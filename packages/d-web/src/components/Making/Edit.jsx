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
  const [page, setpage] = useState('全部影片')
  const pages = {
    全部影片: <VideoList />,
    素材管理: <MaterialList />,
    影片製作: <FilmEditor />,
    片段搜尋: <Historical />,
  }
  const icons = {
    全部影片: faFolder,
    素材管理: faCloudArrowUp,
    影片製作: faFilm,
    片段搜尋: faMagnifyingGlass,
  }

  console.log(video_id)
  console.log(page)
  useEffect(() => {
    if (video_id) setpage('影片製作')
  }, [video_id])
  return (
    <div className="w-100 h-100 overflow-scroll">
      <Row
        className="w-100"
        style={{
          height: '6%',
        }}
      >
        <Nav
          className="ms-auto pe-5 w-100 d-flex"
          // style={{ borderRight: '1px solid #fff' }}
        >
          {Object.keys(pages).map((key) => (
            <Nav.Link
              key={key}
              className="text-grey-hover"
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
