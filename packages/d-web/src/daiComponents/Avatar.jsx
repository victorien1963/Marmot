import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../components/ContextProvider'

function Avatar() {
  const { auth } = useContext(AuthContext)
  if (auth.notexist) console.log(auth)
  return (
    <div className="w-100 h-100 d-flex">
      <FontAwesomeIcon
        className="m-auto text-dark h-100 w-100"
        icon={faUserCircle}
      />
    </div>
  )
}

export default Avatar
