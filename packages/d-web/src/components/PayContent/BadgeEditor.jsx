import React from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Image, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { editor } from '../../asset'

function BadgeEditor({ setting }) {
  console.log(setting)
  const navigate = useNavigate()

  return (
    <div className="d-flex flex-column h-100 w-100">
      <h4 className="text-start ps-5 pt-5">Badges & Emoji editor</h4>
      <Row
        className="w-100 pe-5 pb-5"
        style={{
          height: '88%',
        }}
      >
        <Col className="d-flex h-100" xs={11}>
          <Image className="m-auto" src={editor} height="100%" width="auto" />
        </Col>
        <Col className="d-flex flex-column pb-5">
          <Button
            variant="outline-dark"
            className="mt-auto"
            onClick={() =>
              navigate('/user/paycontent/memberships', { replace: true })
            }
          >
            Save
          </Button>
          <Button
            variant="mar2"
            className="mt-2"
            onClick={() =>
              navigate('/user/paycontent/memberships', { replace: true })
            }
          >
            Add
          </Button>
        </Col>
      </Row>
    </div>
  )
}

BadgeEditor.propTypes = {
  setting: PropTypes.shape().isRequired,
}

export default BadgeEditor
