import React from 'react'
import { useParams } from 'react-router-dom'
import { faFileInvoice, faUsers } from '@fortawesome/free-solid-svg-icons'
import PathSelector from '../PathSelector'
import Memberships from './Memberships'
import Courses from './Courses'

const pages = {
  memberships: <Memberships />,
  courses: <Courses />,
  // pm: <Pm />,
  // recommend: <Recommend />,
  // trends: <Trends />,
}

function PayContent() {
  const { path } = useParams()

  return path ? (
    pages[path]
  ) : (
    <PathSelector
      setting={{
        paths: [
          {
            title: 'Memberships',
            subTitle: '',
            icon: faUsers,
            link: '/user/paycontent/memberships',
            type: 'user',
          },
          {
            title: 'Courses',
            subTitle: '',
            icon: faFileInvoice,
            link: '/user/paycontent/courses',
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

export default PayContent
