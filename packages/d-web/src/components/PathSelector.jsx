import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { Row, Col, Button, Image } from 'react-bootstrap'
import { faCircleRadiation } from '@fortawesome/free-solid-svg-icons'
import PathSign from './PathSign'

function PathSelector({ setting }) {
  const navigate = useNavigate()
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
      {paths.map((path) => (
        <Col className="h-100 py-3" xs={12 / paths.length} key={path.title}>
          <Row className="h-25">
            <PathSign
              setting={{
                ...path,
              }}
            />
          </Row>
          <Row className="px-4 pt-4">
            <Button
              onClick={() => navigate(path.link)}
              className="rounded-pill"
            >
              Powered by MARMOT
            </Button>
          </Row>
          <Row className="w-100 d-flex">
            <p className="mx-auto">*in-house developed app</p>
          </Row>
          {(path.externals || []).map((external) => {
            const { image, link } = external
            return (
              <Row
                className="w-100"
                style={{
                  height: '18%',
                }}
              >
                <a
                  className="w-100 h-100 d-flex"
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image className="w-100 m-auto" src={image} />
                </a>
              </Row>
            )
          })}
        </Col>
      ))}
      {/* {paths.map((path, i) => (
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
      ))} */}
    </Row>
  )
}

PathSelector.propTypes = {
  setting: PropTypes.shape().isRequired,
}

export default PathSelector
