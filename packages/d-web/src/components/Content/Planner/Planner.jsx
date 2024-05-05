/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Col, Form, Row } from 'react-bootstrap'

function Planner({ setting }) {
  const [projects] = useState(setting.projects)
  const getDatesInRange = (s, e) => {
    const start = new Date(s)
    const end = new Date(e)
    const dates = []
    while (start <= end) {
      dates.push(moment(new Date(start)).format('yyyy-MM-DD'))
      start.setDate(start.getDate() + 1)
    }
    return dates
  }

  const grid = 0
  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    cursor: isDragging ? 'grab' : 'pointer',
    position: isDragging ? 'block' : 'absolute',
    ...draggableStyle,
  })

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? 'transparent' : 'transparent',
    padding: grid,
    width: '100%',
  })

  return (
    <div className="w-100 h-100 overflow-scroll">
      <Row
        className="flex-nowrap"
        style={{
          height: '12%',
        }}
      >
        <Col className="border-end border-bottom" xs={2} />
        {getDatesInRange(setting.startDate, setting.endDate).map((date) => (
          <Col className="d-flex border-end border-bottom" xs={1} key={date}>
            <p className="my-auto">{moment(date).format('YY-MM-DD')}</p>
          </Col>
        ))}
      </Row>
      <Row
        style={{
          height: '88%',
        }}
      >
        <Col xs={12}>
          {projects.map(({ project_id, project_name, tasks }) => (
            <Row
              className="flex-nowrap position-relative"
              style={{
                height: '16%',
              }}
              key={project_id}
            >
              <Col className="d-flex border-end border-bottom" xs={2}>
                <p className="my-auto">{project_name}</p>
              </Col>
              {getDatesInRange(setting.startDate, setting.endDate).map(
                (date) => (
                  <Col
                    className="d-flex border-end border-bottom"
                    xs={1}
                    key={date}
                  />
                )
              )}
              <DragDropContext
                onDragEnd={(e) => {
                  console.log(e)
                  //   const result = Array.from(drafts)
                  //   const [removed] = result.splice(e.source.index, 1)
                  //   result.splice(e.destination.index, 0, removed)
                  //   setDrafts(result)
                }}
              >
                <Droppable droppableId="droppable" direction="horizonal">
                  {(dropProvided, dropSnapshot) => (
                    <div
                      {...dropProvided.droppableProps}
                      ref={dropProvided.innerRef}
                      style={getListStyle(dropSnapshot.isDraggingOver)}
                      className="w-100 h-100 overflow-scroll"
                    >
                      {tasks.map(
                        ({ task_id, task_name, startDate, endDate }) => (
                          <Draggable
                            key={`${task_id}`}
                            draggableId={`${task_id}`}
                            index={task_id}
                          >
                            {(dragProvided, dragSnapshot) => (
                              <Col
                                ref={dragProvided.innerRef}
                                {...dragProvided.draggableProps}
                                {...dragProvided.dragHandleProps}
                                className="py-1"
                                style={{
                                  position: 'absolute',
                                  padding: '1px',
                                  cursor: 'grab',
                                  height: '100%',
                                  left: `${
                                    8.33 *
                                    (getDatesInRange(
                                      setting.startDate,
                                      startDate
                                    ).length +
                                      1)
                                  }%`,
                                  ...getItemStyle(
                                    dragSnapshot.isDragging,
                                    dragProvided.draggableProps.style
                                  ),
                                }}
                                xs={getDatesInRange(startDate, endDate).length}
                                key={task_id}
                              >
                                <div className="rounded planner-item w-100 h-100 pt-1 ps-2">
                                  <Row className="w-100 h-25">
                                    <Col
                                      className="text-start text-nowrap"
                                      xs={6}
                                    >{`Task ${task_id}`}</Col>
                                    <Col className="d-flex pe-1" xs={6}>
                                      <Form.Check className="ms-auto" />
                                    </Col>
                                  </Row>
                                  <Row className="w-100 h-50">
                                    <h4 className="my-auto text-start">
                                      {task_name}
                                    </h4>
                                  </Row>
                                </div>
                              </Col>
                            )}
                          </Draggable>
                        )
                      )}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
              {/* {tasks.map(({ task_id, task_name, startDate, endDate }) => (
                <Col
                  className="py-1 position-absolute"
                  style={{
                    padding: '1px',
                    cursor: 'grab',
                    height: '100%',
                    left: `${
                      8.33 *
                      (getDatesInRange(setting.startDate, startDate).length + 2)
                    }%`,
                  }}
                  xs={getDatesInRange(startDate, endDate).length}
                  key={task_id}
                >
                  <div className="d-flex rounded planner-item w-100 h-100 ps-2">
                    <p className="my-auto">{task_name}</p>
                  </div>
                </Col>
              ))} */}
            </Row>
          ))}
        </Col>
      </Row>
    </div>
  )
}

Planner.propTypes = {
  setting: PropTypes.shape().isRequired,
}

export default Planner
