import React from 'react'
import { useParams } from 'react-router-dom'
import {
  faFileInvoice,
  faSackDollar,
  faUsers,
} from '@fortawesome/free-solid-svg-icons'
import PathSelector from '../PathSelector'
import Pm from './Pm'
import Recommend from './Recommend'
import Trends from './Trends'

const pages = {
  pm: <Pm />,
  recommend: <Recommend />,
  trends: <Trends />,
}

function Content() {
  const { path } = useParams()

  return path ? (
    pages[path]
  ) : (
    <PathSelector
      setting={{
        paths: [
          {
            title: 'Project\nManagement',
            subTitle: '',
            icon: faUsers,
            link: '/user/content/pm',
            type: 'user',
          },
          {
            title: 'Recommendation',
            subTitle: '',
            icon: faFileInvoice,
            link: '/user/content/recommend',
            type: 'user',
          },
          {
            title: 'Trends',
            subTitle: '',
            icon: faSackDollar,
            link: '/user/content/trends',
            type: 'user',
          },
        ],
      }}
    />
  )
}

export default Content
