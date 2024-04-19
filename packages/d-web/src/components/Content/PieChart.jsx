import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import Pie from '@visx/shape/lib/shapes/Pie'
import useTooltip from '@visx/tooltip/lib/hooks/useTooltip'
import { Tooltip } from '@visx/xychart'
import { Group } from '@visx/group'
import { GradientPinkBlue } from '@visx/gradient'
import { animated, useTransition, to } from 'react-spring'

const defaultMargin = { top: 20, right: 20, bottom: 20, left: 20 }

function PieChart(props) {
  const { setting } = props
  const {
    breakdowns,
    hasLabels = true,
    labels,
    datas,
    width,
    height,
    margin = defaultMargin,
    animate = true,
    selectedField,
    padding,
    donutThickness,
    backgroundColor = 'rgb(255,255,255,0)',
    colors = ['#B10905', '#F7CC72', '#44778D', '#59C3C3', '#e88631', '#B5AF8D'],
  } = setting
  // const height = setting.height - 5
  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    showTooltip,
    hideTooltip,
  } = useTooltip()
  const handleMouseOver = useCallback(
    (coords, datum) => {
      showTooltip({
        tooltipLeft: coords.x,
        tooltipTop: coords.y,
        tooltipData: datum,
      })
    },
    [showTooltip]
  )

  const value = (d) => d.value
  // const getBrowserColor = scaleOrdinal({
  //   domain: datas.map((d) => d.value),
  //   range: [
  //     'rgba(59, 143, 152, 0.7)',
  //     'rgba(59, 143, 152, 0.6)',
  //     'rgba(59, 143, 152, 0.5)',
  //     'rgba(59, 143, 152, 0.4)',
  //     'rgba(59, 143, 152, 0.3)',
  //     'rgba(59, 143, 152, 0.2)',
  //     'rgba(59, 143, 152, 0.1)',
  //   ],
  // })

  const getData = (data, breakdown, label) =>
    data.map((d, key) => ({
      label: hasLabels ? d[label || breakdown] || 'others' : '',
      key,
      // value: d[selectedField],
      value: parseInt(d[selectedField], 10),
    }))
  // const [selectedBrowser, setSelectedBrowser] = useState(null)
  // const [selectedAlphabetLetter, setSelectedAlphabetLetter] = useState(null)

  if (width < 10) return null

  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom
  const radius = (Math.min(innerWidth, innerHeight) - (padding || 15)) / 2
  const centerY = innerHeight / 2
  const centerX = innerWidth / 2

  return (
    <>
      <svg width={width} height={height}>
        <defs>
          <linearGradient
            id="LucaPieChartBG"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
            spreadMethod="pad"
          >
            <stop offset="0%" stopColor="#53a8b1db" stopOpacity="1" />
            <stop offset="100%" stopColor="#408d97db" stopOpacity="1" />
          </linearGradient>
        </defs>
        <GradientPinkBlue id="visx-pie-gradient" />
        <rect
          // rx={14}
          width={width}
          height={height}
          fill={backgroundColor}
        />
        {breakdowns.map((b, i) => (
          <Group
            key={i}
            top={centerY + margin.top}
            left={centerX * (1 / breakdowns.length + i) + margin.left}
            onMouseOver={(e) => {
              handleMouseOver(e)
            }}
            onMouseOut={hideTooltip}
          >
            <Pie
              data={getData(datas[i], b, labels ? labels[i] : '')}
              pieValue={value}
              outerRadius={radius}
              innerRadius={radius - (donutThickness || 40)}
              cornerRadius={3}
              padAngle={0.005}
            >
              {(pie) => (
                <AnimatedPie
                  setting={{
                    ...pie,
                    animate,
                    getKey: (arc) => `${i}_${arc.data.key}`,
                    getLabel: (arc) => arc.data.label,
                    // onClickDatum: ({ data: { label } }) =>
                    //   animate &&
                    //   setSelectedBrowser(
                    //     selectedBrowser && selectedBrowser === label ? null : label
                    //   ),
                    onClickDatum: () => {},
                    // getColor: (arc) => getBrowserColor(arc.data.label),
                    getColor: (arc) => colors[arc.index % 6],
                  }}
                />
              )}
            </Pie>
          </Group>
        ))}
      </svg>
      {tooltipOpen && (
        <Tooltip
          key={Math.random()}
          top={tooltipTop + height / 2}
          left={tooltipLeft + width / 2}
          // style={tooltipStyles}
        >
          <strong>{tooltipData}</strong>
        </Tooltip>
      )}
    </>
  )
}

const fromLeaveTransition = ({ endAngle }) => ({
  // enter from 360° if end angle is > 180°
  startAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
  endAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
  opacity: 0,
})
const enterUpdateTransition = ({ startAngle, endAngle }) => ({
  startAngle,
  endAngle,
  opacity: 1,
})

function AnimatedPie(animateProps) {
  const { setting } = animateProps
  const { animate, arcs, path, getKey, getColor, getLabel, onClickDatum } =
    setting
  const transitions = useTransition(arcs, {
    from: animate ? fromLeaveTransition : enterUpdateTransition,
    enter: enterUpdateTransition,
    update: enterUpdateTransition,
    leave: animate ? fromLeaveTransition : enterUpdateTransition,
    keys: getKey,
  })
  return transitions((props, arc, { key }) => {
    const [centroidX, centroidY] = path.centroid(arc)
    const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1

    return (
      <g key={key}>
        <animated.path
          // compute interpolated path d attribute from intermediate angle values
          d={to([props.startAngle, props.endAngle], (startAngle, endAngle) =>
            path({
              ...arc,
              startAngle,
              endAngle,
            })
          )}
          fill={getColor(arc)}
          fillOpacity={0.75}
          onClick={() => onClickDatum(arc)}
          onTouchStart={() => onClickDatum(arc)}
        />
        {hasSpaceForLabel && (
          <animated.g style={{ opacity: props.opacity }}>
            <text
              fill="white"
              x={centroidX}
              y={centroidY}
              dy=".33em"
              fontSize={13}
              textAnchor="middle"
              pointerEvents="none"
            >
              {getLabel(arc)}
            </text>
          </animated.g>
        )}
      </g>
    )
  })
}

PieChart.propTypes = {
  setting: PropTypes.shape().isRequired,
}

AnimatedPie.propTypes = {
  setting: PropTypes.shape().isRequired,
}

export default PieChart
