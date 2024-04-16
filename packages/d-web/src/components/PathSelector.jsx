import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-bootstrap'
import { faCircleRadiation } from '@fortawesome/free-solid-svg-icons'
import PathSign from './PathSign'

function PathSelector({ setting }) {
  const {
    paths = [
      {
        title: 'Title',
        subTitle: 'subtitle',
        icon: faCircleRadiation,
        link: '/',
        type: 'user',
      },
      {
        title: 'Title2',
        subTitle: 'subtitle',
        icon: faCircleRadiation,
        link: '/',
        type: 'user',
      },
      {
        title: 'Title3',
        subTitle: 'subtitle',
        icon: faCircleRadiation,
        link: '/',
        type: 'user',
      },
    ],
  } = setting
  return (
    <Row className="w-100 h-100 justify-content-center">
      {paths.map((path, i) => (
        <Col
          className="h-25 m-auto"
          xs={paths.length % 2 === 1 && !i ? 12 : 6}
          key={path.title}
        >
          <PathSign
            setting={{
              ...path,
            }}
          />
        </Col>
      ))}
    </Row>
  )
}

PathSelector.propTypes = {
  setting: PropTypes.shape().isRequired,
}

export default PathSelector
