/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable no-param-reassign */
import React, { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Peaks from 'peaks.js'
import TimeRange from 'react-video-timelines-slider'
import { set, format } from 'date-fns'
import apiServices from '../../services/apiServices'

const now = new Date()
const getTodayAtSpecificHour = (hour = 12) =>
  set(now, { hours: hour, minutes: 0, seconds: 0, milliseconds: 0 })

const startTime = getTodayAtSpecificHour(0)
const endTime = getTodayAtSpecificHour(20)

const disabledIntervals = [
  //   { start: getTodayAtSpecificHour(16), end: getTodayAtSpecificHour(17) },
  //   { start: getTodayAtSpecificHour(7), end: getTodayAtSpecificHour(12) },
  //   { start: getTodayAtSpecificHour(20), end: getTodayAtSpecificHour(24) },
]

function AudioVisualizer({ setting }) {
  const { show, audioUrl, audioElmRef, selectedInterval, setSelectedInterval } =
    setting

  const [videoData, setvideoData] = useState()

  const overviewElmRef = useRef(null)

  const init = () => {
    const options = {
      //   zoomview: {
      //     container: zoomviewElmRef.current,
      //   },
      overview: {
        container: overviewElmRef.current,
      },
      mediaElement: audioElmRef.current,
      mediaUrl: audioUrl,
      webAudio: {
        // audioContext,
        // scale: 128,
        // multiChannel: false,
        audioBuffer: videoData,
      },
    }

    Peaks.init(options, (err, peaks) => {
      if (err) {
        console.error(`Failed to initialize Peaks instance: ${err.message}`)
      }
      console.log(peaks)
      // Do something when the waveform is displayed and ready
    })
  }
  useEffect(() => {
    const getData = async () => {
      console.log(audioUrl)
      const res = await apiServices.extenal({
        url: audioUrl,
        method: 'get',
        responseType: 'arraybuffer',
      })
      console.log(res)
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)()
      try {
        const audioBuffer = await audioContext.decodeAudioData(res.data)
        setvideoData(audioBuffer)
      } catch (e) {
        console.log('This video has no audio data!')
      }
    }
    if (audioUrl) getData()
  }, [audioUrl])

  useEffect(() => {
    if (videoData && show) init()
  }, [videoData, show])

  const [error, seterror] = useState(false)

  const errorHandler = (e) => {
    seterror(e.error)
  }

  const onChangeCallback = (i) => setSelectedInterval(i)

  return (
    <div
      className="position-relative h-100 w-100"
      style={{
        backgroundColor: 'transparent',
      }}
    >
      {/* <div className="w-100 h-75 bg-black">
        <video
          width="auto"
          height="100%"
          className="m-auto"
          controls
          ref={audioElmRef}
          crossOrigin="anonymous"
        >
          <track kind="captions" />
          <source src={audioUrl} />
        </video>
      </div> */}
      <div
        className="h-100 w-100 position-absolute"
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          zIndex: '1',
          bottom: 0,
        }}
      >
        <div className="w-100 h-100" ref={overviewElmRef} />
      </div>
      <div
        className="h-100 w-100 position-absolute"
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          zIndex: '2',
          bottom: 0,
        }}
      >
        <TimeRange
          error={error}
          ticksNumber={0}
          step={1}
          selectedInterval={selectedInterval}
          timelineInterval={[startTime, endTime]}
          onUpdateCallback={errorHandler}
          onChangeCallback={onChangeCallback}
          disabledIntervals={disabledIntervals}
          formatTick={(ms) => format(new Date(ms), 'HH:mm:ss')}
          formatTooltip={(ms) => format(new Date(ms), 'HH:mm:ss.SSS')}
          showTooltip
          showTimelineError={false}
        />
      </div>
    </div>
  )
}

// WaveForm.propTypes = {
//   setting: PropTypes.shape().isRequired,
// }

AudioVisualizer.propTypes = {
  setting: PropTypes.shape().isRequired,
}

export default AudioVisualizer
