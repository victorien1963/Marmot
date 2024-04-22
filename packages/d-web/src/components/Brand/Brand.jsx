import React from 'react'
import { useParams } from 'react-router-dom'
import {
  faFileInvoice,
  // faSackDollar,
  faUsers,
} from '@fortawesome/free-solid-svg-icons'
import PathSelector from '../PathSelector'
import Campaigns from './Campaigns'
import Opportunities from './Opportunities'

const pages = {
  campaigns: <Campaigns />,
  opportunities: <Opportunities />,
  // pm: <Pm />,
  // recommend: <Recommend />,
  // trends: <Trends />,
}

function Brand() {
  const { path } = useParams()

  return path ? (
    pages[path]
  ) : (
    <PathSelector
      setting={{
        paths: [
          {
            title: 'Campaigns',
            subTitle: '',
            icon: faUsers,
            link: '/user/brand/campaigns',
            type: 'user',
          },
          {
            title: 'Opportunities',
            subTitle: '',
            icon: faFileInvoice,
            link: '/user/brand/opportunities',
            type: 'user',
          },
          // {
          //   title: 'Trends',
          //   subTitle: '',
          //   icon: faSackDollar,
          //   link: '/user/content/trends',
          //   type: 'user',
          // },
        ],
      }}
    />
  )
}

export default Brand
