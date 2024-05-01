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
import { plaky, monday, assemble, celtx, arcstudio, bonito } from '../../asset'

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
            externals: [
              {
                image: plaky,
                link: 'https://plaky.com/pricing',
              },
              {
                image: monday,
                link: 'https://plaky.com/pricing',
              },
              {
                image: assemble,
                link: 'https://plaky.com/pricing',
              },
            ],
          },
          {
            title: 'Recommendation',
            subTitle: '',
            icon: faFileInvoice,
            link: '/user/content/recommend',
            type: 'user',
            externals: [
              {
                image: celtx,
                link: 'https://plaky.com/pricing',
              },
              {
                image: arcstudio,
                link: 'https://plaky.com/pricing',
              },
            ],
          },
          {
            title: 'Trends',
            subTitle: '',
            icon: faSackDollar,
            link: '/user/content/trends',
            type: 'user',
            externals: [
              {
                image: bonito,
                link: 'https://plaky.com/pricing',
              },
            ],
          },
        ],
      }}
    />
  )
}

export default Content
