import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'

function Warn({ setting }) {
  const { size = 'md', text = '', show = false, handleClose } = setting

  return (
    <Modal
      style={{ zIndex: '1501' }}
      size={size}
      show={show !== false}
      onHide={() => handleClose(false)}
    >
      <Modal.Header
        className="AccFormModal justify-content-center text-center pt-4"
        closeButton
      >
        <Modal.Title>
          <h4>系統訊息</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex AccformCard">
        <div className="assPermis w-100">
          <Form className="px-2 Form-card flex-grow-1">
            <Form.Group className="px-5 lh-md text-center text-dai">
              <FontAwesomeIcon
                icon={faCircleExclamation}
                style={{ height: '5rem' }}
                className="my-4"
              />
              <Form.Label className="w-100 fs-5 fw-bold text-center pb-4">
                {text}
              </Form.Label>
            </Form.Group>
          </Form>
        </div>
      </Modal.Body>
      <Modal.Footer className="sendForm justify-content-center py-3">
        {/* <Button variant="secondary" onClick={() => handleClose(false)}>
          取消
        </Button> */}
        <Button onClick={() => handleClose(show)}>確定</Button>
      </Modal.Footer>
    </Modal>
  )
}

Warn.propTypes = {
  setting: PropTypes.shape().isRequired,
}

export default Warn
