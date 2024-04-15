import React, { useContext } from 'react'
// import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../components/ContextProvider'

function MenuCard() {
  const { auth } = useContext(AuthContext)
  return (
    <Card className="text-center h-100 p-0 border-0" style={{ width: '350px' }}>
      <Card.Body className="h-100 d-flex flex-column">
        <div className="d-flex pb-3">
          <FontAwesomeIcon
            className="m-auto text-dark"
            style={{ height: '75px' }}
            icon={faUserCircle}
          />
        </div>
        <h5>{auth.name || 'VIP'}</h5>
      </Card.Body>
      <Card.Footer>{auth.email}</Card.Footer>
      {/* <Card.Footer className="d-flex justify-content-around">
        <Link to="/info" className="align-item-start">
          <Button variant="outline-dai">修 改 密 碼</Button>
        </Link> */}
      {/* <Button
          variant="lucaLight"
          className="align-item-end"
          onClick={handleLogOut}
        >
          登 出
        </Button> */}
      {/* </Card.Footer> */}
    </Card>
  )
}

export default MenuCard
