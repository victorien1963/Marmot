import React from 'react'
import PropTypes from 'prop-types'
import {
  // AnimatedAxis,
  // AnimatedGrid,
  // AnimatedLineSeries,
  XYChart,
  Tooltip,
  BarGroup,
  BarSeries,
} from '@visx/xychart'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
// import moment from 'moment'

function CrossChart(props) {
  const { setting } = props
  const {
    width,
    height,
    data,
    selectedField,
    barFields,
    strokeColors = ['#3fc3ca', '#F7CC72', '#6d74aedb'],
  } = setting

  // const accessors = selectedField.map((f, i) => ({
  //   xAccessor: (d) => d.date,
  //   // yAccessor: (d) => parseInt(d[f], 10),
  //   yAccessor: (d) => parseInt(d[f], 10),
  //   getTooltip: (d) => `${d.date}, ${f}: ${parseInt(d[f], 10)}`,
  //   getColor: () => strokeColors[i],
  // }))

  const barAccessors = barFields.map((bar, i) => ({
    xAccessor: (d) => d.date,
    // yAccessor: (d) => parseInt(d[f], 10),
    yAccessor: (d) => parseInt(d[bar], 10),
    getTooltip: (d) => `${d.date}, ${bar}: ${parseInt(d[bar], 10)}`,
    getColor: () => strokeColors[i],
  }))

  return (
    <div className="position-relative">
      <XYChart
        width={width}
        height={height}
        xScale={{ type: 'band' }}
        yScale={{ type: 'linear' }}
        margin={{ top: 30, right: 30, bottom: 50, left: 60 }}
      >
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill="rgb(255,255,255,0)"
        />
        {/* <AnimatedAxis
          stroke="#317985"
          tickLabelProps={() => ({
            fill: '#21515a',
            fontFamily: 'Arial',
            fontSize: 12,
            textAnchor: 'middle',
            angle: -45,
            dy: '1em',
          })}
          tickFormat={(v) => moment(v).format('YY-MM-DD')}
          orientation="bottom"
        />
        <AnimatedAxis
          stroke="#317985"
          tickLabelProps={() => ({
            fill: '#21515a',
            fontFamily: 'Arial',
            fontSize: 12,
            dx: '0.2em',
            // textAnchor: 'middle',
          })}
          orientation="left"
          numTicks={8}
          // label={selectedField}
        />
        <AnimatedGrid columns={false} numTicks={4} />
        {accessors.map((accessor, index) => (
          <AnimatedLineSeries
            key={index}
            dataKey={index}
            data={data}
            // stroke="#317985"
            stroke={strokeColors[index]}
            xAccessor={accessor.xAccessor}
            yAccessor={accessor.yAccessor}
          />
        ))} */}
        <BarGroup>
          {barAccessors.map(({ xAccessor, yAccessor, getColor }, index) => (
            <BarSeries
              key={index}
              dataKey={index}
              data={data}
              xAccessor={xAccessor}
              yAccessor={yAccessor}
              colorAccessor={getColor}
              radius={2}
              radiusTop
            />
          ))}
        </BarGroup>
        <Tooltip
          snapTooltipToDatumX
          snapTooltipToDatumY
          showVerticalCrosshair
          showSeriesGlyphs
          renderGlyph={({ x, y }) => (
            <circle x={x} y={y} r={4} fill={strokeColors[0]} />
          )}
          renderTooltip={({ tooltipData }) => (
            <div className="d-flex flex-column-reverse">
              <span
                className="lh-lg fw-normal d-flex"
                style={{
                  color: strokeColors[0],
                }}
              >
                <FontAwesomeIcon
                  icon={faCircle}
                  className="my-auto"
                  style={{
                    fontSize: '.5rem',
                  }}
                />
                &ensp;
                {selectedField[0]}:
                {tooltipData.nearestDatum.datum[selectedField[0]]}
              </span>

              {barFields.map((bar, i) => (
                <span
                  className="lh-lg fw-normal d-flex"
                  style={{
                    color: strokeColors[(i + 1) % 5],
                  }}
                >
                  <FontAwesomeIcon
                    icon={faCircle}
                    className="my-auto"
                    style={{
                      fontSize: '.5rem',
                    }}
                  />
                  &ensp;
                  {bar}:{tooltipData.nearestDatum.datum[bar]}
                </span>
              ))}
            </div>
          )}
        />
      </XYChart>
    </div>
  )
}

CrossChart.propTypes = {
  setting: PropTypes.shape().isRequired,
}

export default CrossChart
