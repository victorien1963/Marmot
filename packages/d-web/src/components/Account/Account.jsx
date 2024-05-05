import React from 'react'
import { useParams } from 'react-router-dom'
import Profile from './Profile'
import Access from './Access'

function Account() {
  const { path } = useParams()
  const pages = {
    profile: <Profile />,
    access: <Access />,
  }
  return pages[path || 'profile']
}

export default Account
