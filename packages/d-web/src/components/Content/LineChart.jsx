import React from 'react'
import PropTypes from 'prop-types'
import {
  // AnimatedAxis, // any of these can be non-animated equivalents
  // AnimatedGrid,
  AnimatedLineSeries,
  XYChart,
  Tooltip,
} from '@visx/xychart'
// import moment from 'moment'

function LineChart(props) {
  const { setting } = props
  const {
    width,
    height,
    data,
    selectedField,
    strokeColors = ['#3fc3ca', '#b961a9', '#88bc58', '#6d74ae', '#f1a72f'],
  } = setting

  const accessors = selectedField.map((f, i) => ({
    xAccessor: (d) => d.date,
    // yAccessor: (d) => parseInt(d[f], 10),
    yAccessor: (d) => parseInt(d[f], 10),
    getTooltip: (d) => `${d.date}, ${f}: ${parseInt(d[f], 10)}`,
    getColor: () => strokeColors[i],
  }))

  return (
    <div className="position-relative">
      <XYChart
        width={width}
        height={height}
        xScale={{ type: 'band' }}
        yScale={{ type: 'linear' }}
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
          numTicks={5}
          // label={selectedField}
        /> */}
        {/* <AnimatedGrid columns={false} numTicks={4} /> */}
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
        ))}
        <Tooltip
          snapTooltipToDatumX
          snapTooltipToDatumY
          showVerticalCrosshair
          showSeriesGlyphs
          renderGlyph={({ x, y, key }) => (
            <circle x={x} y={y} r={4} fill={accessors[key].getColor()} />
          )}
          renderTooltip={({ tooltipData }) => (
            <div
              style={{
                color: accessors[tooltipData.nearestDatum.key].getColor(),
              }}
            >
              {accessors[tooltipData.nearestDatum.key].getTooltip(
                tooltipData.nearestDatum.datum
              )}
            </div>
          )}
        />
      </XYChart>
    </div>
  )
}

LineChart.propTypes = {
  setting: PropTypes.shape().isRequired,
}

export default LineChart
