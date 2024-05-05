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
import {
  azure,
  blackboard,
  moodle,
  stickermaker,
  tubular,
  viewstats,
} from '../../asset'

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
            externals: [
              {
                image: azure,
                link: 'https://plaky.com/pricing',
              },
              {
                image: tubular,
                link: 'https://plaky.com/pricing',
              },
            ],
          },
          {
            title: 'Benchmaking',
            subTitle: '',
            icon: faFileInvoice,
            link: '/user/analyze/benchmaking',
            type: 'user',
            externals: [
              {
                image: viewstats,
                link: 'https://plaky.com/pricing',
              },
            ],
          },
          {
            title: 'Alternative Monetization',
            subTitle: '',
            icon: faSackDollar,
            link: '/user/analyze/am',
            type: 'user',
            externals: [
              {
                image: stickermaker,
                link: 'https://plaky.com/pricing',
              },
              {
                image: blackboard,
                link: 'https://plaky.com/pricing',
              },
              {
                image: moodle,
                link: 'https://plaky.com/pricing',
              },
            ],
          },
        ],
      }}
    />
  )
}

export default Analyze
