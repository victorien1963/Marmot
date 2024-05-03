import React, { useState, useEffect, useMemo, createContext } from 'react'
import PropTypes from 'prop-types'
// import { Manager } from 'socket.io-client'
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'
import apiServices from '../../services/cheloniaServices'

function ContextProvider(props) {
  const { userAuth, children } = props
  const [auth, setAuth] = useState({
    authed: false,
    done: false,
  })
  const authValue = useMemo(() => ({ auth, setAuth }), [auth])
  // const { authed, user_id } = auth

  const checkToken = async () => {
    const user = await apiServices.me()
    if (user.data && user.data.username) {
      setAuth({
        authed: true,
        ...user.data,
      })
    } else {
      const login = await apiServices.login({
        username: userAuth.name,
        password: 'admin-123456',
      })
      if (login.data && login.data.username) {
        setAuth({
          authed: true,
          ...login.data,
        })
      } else {
        const register = await apiServices.register({
          username: userAuth.name,
          password1: 'admin-123456',
          password2: 'admin-123456',
        })
        if (register.data && register.data.username) {
          setAuth({
            authed: true,
            ...register.data,
          })
        }
      }
      setAuth({
        authed: false,
        done: true,
      })
    }
  }
  useEffect(() => {
    checkToken()
  }, [])

  // const [socket, setSocket] = useState(null)
  // useEffect(() => {
  //   if (!authed) return () => {}
  //   const manager = new Manager(window.location.origin)
  //   const newSocket = manager.socket('/', {
  //     auth: {
  //       auth: user_id,
  //     },
  //   })
  //   setSocket(newSocket)
  //   return () => newSocket.close()
  // }, [setSocket, authed, user_id])
  // const sendMessage = (type, message) => socket.emit(type, message)
  // const socketValue = useMemo(() => ({ socket, sendMessage }), [socket])

  const [videos, setVideos] = useState([])
  const [materials, setMaterials] = useState([])
  const getVideos = async () => {
    const res = await apiServices.data({
      path: `video/management/`,
      method: 'get',
    })
    console.log('------get video list------')
    console.log(res)
    if (!res.error && res && res.data && res.data.length) {
      setVideos(res.data)
    }
  }
  const getMaterials = async () => {
    const tas = await apiServices.data({
      path: `footage/transition-animation/management/`,
      method: 'get',
    })
    const wms = await apiServices.data({
      path: `footage/watermark/management/`,
      method: 'get',
    })
    console.log(wms)
    const clips = await apiServices.data({
      path: `clip/management/`,
      method: 'get',
    })
    if (
      tas.data &&
      wms.data &&
      clips.data &&
      tas.data.concat &&
      wms.data.concat &&
      clips.data.concat
    ) {
      console.log(
        tas.data
          .map((ta) => ({ ...ta, type: 'ta' }))
          .concat(wms.data.map((wm) => ({ ...wm, type: 'wm' })))
          .concat(clips.data.map((clip) => ({ ...clip, type: 'clip' })))
      )
      setMaterials(
        tas.data
          .map((ta) => ({ ...ta, type: 'ta' }))
          .concat(wms.data.map((wm) => ({ ...wm, type: 'wm' })))
          .concat(clips.data.map((clip) => ({ ...clip, type: 'clip' })))
      )
    }
  }
  useEffect(() => {
    getVideos()
    getMaterials()
  }, [])

  // Files
  const [show, setShow] = useState(false)
  const [files, setFiles] = useState([])
  if (false) console.log(setFiles)
  // useEffect(() => {
  //   if (!socket) return
  //   socket.on('me', (message) => {
  //     setAuth({
  //       ...auth,
  //       setting: {
  //         ...(auth.setting || {}),
  //         ...message,
  //       },
  //     })
  //   })
  //   socket.on('files', (message) => {
  //     setFiles((prevState) => {
  //       if (prevState.length && message.length !== prevState.length) {
  //         setShow(true)
  //       }
  //       return message
  //     })
  //   })
  // }, [socket])

  const [toast, setToast] = useState({ show: false, text: '' })
  const toastValue = useMemo(() => ({ toast, setToast }), [toast])

  const handleDelete = async (type, id) => {
    const paths = {
      video: 'video/management/',
      ta: 'footage/transition-animation/management/',
      wm: 'footage/watermark/management/',
    }
    const path = paths[type] || 'video/video-uploading-task/'
    const deleted = await apiServices.data({
      path: `${path}${id}/`,
      method: 'delete',
    })
    console.log(deleted)
    getVideos()
    getMaterials()
  }

  const handleUpload = async (type, tempFile, callback) => {
    console.log(type)
    // setFiles((prevState) => [
    //   {
    //     video_id,
    //     name: tempFile.name,
    //     status: '上傳中',
    //     ts: Date.now(),
    //   },
    //   ...prevState,
    // ])
    // const formData = new FormData()
    // formData.append('file', tempFile)
    const paths = {
      video: 'video/video-uploading-task/',
      ta: 'footage/transition-animation-uploading-task/',
      wm: 'footage/watermark-uploading-task/',
    }
    const path = paths[type] || 'video/video-uploading-task/'
    console.log(path)
    const videoTask = await apiServices.data({
      path: `${path}`,
      method: 'post',
      data: {
        filename: tempFile.name,
        extension: tempFile.type.split('/')[1] || 'mp4',
        task_status: 'CREATED',
      },
    })

    const typeNames = {
      video: '影片',
      ta: '轉場動畫',
      wm: '浮水印',
    }
    setFiles((prevState) => [
      {
        task_id: videoTask.data.task_id,
        name: tempFile.name,
        type: typeNames[type] || '影片',
        status: 'created',
      },
      ...prevState,
    ])
    setShow(true)

    const markUploading = async () => {
      apiServices.data({
        path: `${path}${videoTask.data.task_id}/`,
        method: 'Patch',
        data: {
          task_status: 'UPLOADING',
          description: 'Uploading',
        },
        contentType: 'application/json',
      })
      setFiles((prevState) =>
        prevState.map((ps) =>
          ps.task_id === videoTask.data.task_id
            ? {
                ...ps,
                status: 'uploading',
              }
            : ps
        )
      )
    }
    const markUploaded = async () => {
      apiServices.data({
        path: `${path}${videoTask.data.task_id}/`,
        method: 'Patch',
        data: {
          task_status: 'UPLOADED',
          description: 'Uploaded',
        },
      })
    }
    // const markFailed = async () =>
    //   apiServices.data({
    //     path: `video/video-uploading-task/${videoTask.data.task_id}/`,
    //     method: 'Patch',
    //     data: {
    //       task_status: 'FAILED',
    //       description: 'Failed',
    //     },
    //   })

    await markUploading()
    await apiServices.extenal({
      url: videoTask.data.upload_link,
      method: 'put',
      data: tempFile,
      contentType: tempFile.type,
      files: [tempFile],
      headers: {
        contentType: tempFile.type,
        'Content-Type': tempFile.type,
      },
      onUploadProgress: (e) => {
        console.log('onProgress')
        console.log(e)
        setFiles((prevState) =>
          prevState.map((ps) =>
            ps.task_id === videoTask.data.task_id
              ? {
                  ...ps,
                  progress: e.progress,
                }
              : ps
          )
        )
      },
    })
    await markUploaded()

    const getStatus = async (clearFunc) => {
      const status = await apiServices.data({
        path: `${path}${videoTask.data.task_id}/`,
        method: 'get',
      })
      console.log(status)

      const targets = {
        video: 'video/management/',
        ta: 'footage/transition-animation/management/',
        wm: 'footage/watermark/management/',
      }
      const video = await apiServices.data({
        path: `${targets[type] || 'video/management/'}${
          videoTask.data.task_id
        }/`,
        method: 'get',
      })

      if (!video.error) {
        console.log('Uploaded, stop fetch')
        clearFunc()
        getVideos()
        getMaterials()
        setFiles((prevState) =>
          prevState.map((ps) =>
            ps.task_id === videoTask.data.task_id
              ? {
                  ...ps,
                  status: 'done',
                }
              : ps
          )
        )
      }
      return status
    }

    getStatus()

    const interval = setInterval(() => {
      getStatus(() => clearInterval(interval))
    }, 5000)

    if (false) console.log(callback)
    // if (video_id) {
    //   const updated = await apiServices.data({
    //     path: `video/${video_id}`,
    //     method: 'put',
    //     data: {
    //       uploadedVideo,
    //     },
    //   })
    //   getVideos()
    //   callback(updated)
    // } else {
    //   const newVideo = await apiServices.data({
    //     path: `video/`,
    //     method: 'post',
    //     data: {
    //       id: Date.now(),
    //       name: '新影片',
    //       uploadedVideo,
    //     },
    //   })
    //   getVideos()
    //   callback(newVideo)
    // }
    // setFiles()
    // setvideo(newVideo)
    // navigate(`${newVideo.video_id}`, { replace: false })
  }
  const getVideo = (video_id) =>
    videos.find((v) => v.video_id === parseInt(video_id, 10))
  const filesValue = useMemo(
    () => ({
      show,
      setShow,
      videos,
      materials,
      setVideos,
      getVideos,
      files,
      handleUpload,
      handleDelete,
      getVideo,
    }),
    [show, files, videos, materials]
  )

  return (
    <>
      {/* <NotiContext.Provider value={notification}> */}
      <UploaderContext.Provider value={filesValue}>
        <ToastContext.Provider value={toastValue}>
          <AuthContext.Provider value={authValue}>
            {/* <SocketContext.Provider value={socketValue}> */}
            {children}
            {/* </SocketContext.Provider> */}
          </AuthContext.Provider>
        </ToastContext.Provider>
      </UploaderContext.Provider>
      {/* </NotiContext.Provider> */}
      <ToastContainer className="p-3" position="bottom-end">
        <Toast
          onClose={() => setToast({ ...toast, show: false })}
          show={toast.show}
          delay={3000}
          autohide
          style={{ width: '100%' }}
        >
          <Toast.Body>{toast.text}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  )
}

ContextProvider.propTypes = {
  userAuth: PropTypes.shape().isRequired,
  children: PropTypes.shape().isRequired,
}

export default ContextProvider

// export const NotiContext = createContext([])
export const SocketContext = createContext({
  socket: null,
  sendMessage: () => {},
})
export const AuthContext = createContext({
  auth: {
    authed: true,
  },
  setAuth: () => {},
})
export const ToastContext = createContext({
  toast: { show: false, text: '' },
  setToast: () => {},
})
export const UploaderContext = createContext({
  show: false,
  setShow: () => {},
  files: [],
  handleUpload: () => {},
  getVideo: () => {},
})
