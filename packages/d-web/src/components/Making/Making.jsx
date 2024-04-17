import React from 'react'
import { useParams } from 'react-router-dom'
import {
  faFileInvoice,
  faSackDollar,
  faUsers,
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
  const { path } = useParams()

  return path ? (
    pages[path]
  ) : (
    <PathSelector
      setting={{
        paths: [
          {
            title: '編輯軟體',
            subTitle: '',
            icon: faUsers,
            link: '/user/making/edit',
            type: 'user',
          },
          {
            title: '影片資料',
            subTitle: '',
            icon: faFileInvoice,
            link: '/user/making/data',
            type: 'user',
          },
          {
            title: '發佈平台',
            subTitle: '',
            icon: faSackDollar,
            link: '/user/making/publish',
            type: 'user',
          },
        ],
      }}
    />
  )
}

export default Making
