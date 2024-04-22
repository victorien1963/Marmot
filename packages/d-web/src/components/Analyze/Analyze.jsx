import React from 'react'
import { useParams } from 'react-router-dom'
import {
  faFileInvoice,
  faSackDollar,
  faUsers,
} from '@fortawesome/free-solid-svg-icons'
import PathSelector from '../PathSelector'
import Analytics from './Analytics'
import AM from './AM'
import Benchmaking from './Benchmaking'

const pages = {
  analytics: <Analytics />,
  am: <AM />,
  benchmaking: <Benchmaking />,
}

function Analyze() {
  const { path } = useParams()

  return path ? (
    pages[path]
  ) : (
    <PathSelector
      setting={{
        paths: [
          {
            title: 'Analytics',
            subTitle: '',
            icon: faUsers,
            link: '/user/analyze/analytics',
            type: 'user',
          },
          {
            title: 'Benchmaking',
            subTitle: '',
            icon: faFileInvoice,
            link: '/user/analyze/benchmaking',
            type: 'user',
          },
          {
            title: 'Alternative Monetization',
            subTitle: '',
            icon: faSackDollar,
            link: '/user/analyze/am',
            type: 'user',
          },
        ],
      }}
    />
  )
}

export default Analyze
