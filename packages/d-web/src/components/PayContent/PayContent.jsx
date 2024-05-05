import React from 'react'
import { useParams } from 'react-router-dom'
import { faFileInvoice, faUsers } from '@fortawesome/free-solid-svg-icons'
import PathSelector from '../PathSelector'
import Memberships from './Memberships'
import Courses from './Courses'
import BadgeEditor from './BadgeEditor'
import { blackboard, moodle, stickermaker } from '../../asset'

const pages = {
  memberships: <Memberships />,
  courses: <Courses />,
  badgeEditor: <BadgeEditor />,
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
            externals: [
              {
                image: stickermaker,
                link: 'https://plaky.com/pricing',
              },
            ],
          },
          {
            title: 'Courses',
            subTitle: '',
            icon: faFileInvoice,
            link: '/user/paycontent/courses',
            type: 'user',
            externals: [
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

export default PayContent
