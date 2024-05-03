/* eslint-disable no-nested-ternary */
import React from 'react'
import { useParams } from 'react-router-dom'
import {
  faClapperboard,
  faCloudArrowUp,
  faPhotoFilm,
  // faFileInvoice,
  // faSackDollar,
  // faUsers,
} from '@fortawesome/free-solid-svg-icons'
import PathSelector from '../PathSelector'
import Edit from './Edit'
import Data from './Data'
import Publish from './Publish'

const pages = {
  edit: <Edit />,
  data: <Data />,
  publish: <Publish />,
}

function Making() {
  const { path, video_id } = useParams()
  console.log(path)

  return path ? (
    pages[path]
  ) : video_id ? (
    <Edit />
  ) : (
    <PathSelector
      setting={{
        paths: [
          {
            title: 'Editing',
            subTitle: '',
            icon: faClapperboard,
            link: '/user/making/edit',
            type: 'user',
          },
          {
            title: 'Metadata',
            subTitle: '',
            icon: faPhotoFilm,
            link: '/user/making/data',
            type: 'user',
          },
          {
            title: 'Distribution',
            subTitle: '',
            icon: faCloudArrowUp,
            link: '/user/making/publish',
            type: 'user',
          },
        ],
      }}
    />
  )
}

export default Making
