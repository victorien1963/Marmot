import React from 'react'
import { useParams } from 'react-router-dom'
import EC from './EC'
import Insight from './Insight'

function Product() {
  const { path } = useParams()
  const pages = {
    ec: <EC />,
    insight: <Insight />,
  }
  return pages[path || 'insight']
}

export default Product
