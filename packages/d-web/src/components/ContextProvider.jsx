/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useMemo, createContext } from 'react'
import PropTypes from 'prop-types'
// import moment from 'moment'
import { Manager } from 'socket.io-client'
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'
import apiServices from '../services/apiServices'

function ContextProvider(props) {
  const { children } = props
  const [auth, setAuth] = useState({
    authed: false,
  })
  const authValue = useMemo(() => ({ auth, setAuth }), [auth])
  const { authed, user_id } = auth

  const checkToken = async () => {
    const { user } = await apiServices.me()
    if (user) {
      setAuth({
        authed: true,
        ...user,
      })
    }
  }
  useEffect(() => {
    checkToken()
  }, [])

  const [socket, setSocket] = useState(null)
  useEffect(() => {
    if (!authed) return () => {}
    const manager = new Manager(window.location.origin)
    const newSocket = manager.socket('/', {
      auth: {
        auth: user_id,
      },
    })
    setSocket(newSocket)
    return () => newSocket.close()
  }, [setSocket, authed, user_id])
  const sendMessage = (type, message) => socket.emit(type, message)
  const socketValue = useMemo(() => ({ socket, sendMessage }), [socket])

  useEffect(() => {
    if (!socket) return
    socket.on('me', (message) => {
      setAuth({
        ...auth,
        setting: {
          ...(auth.setting || {}),
          ...message,
        },
      })
    })
  }, [socket])

  const [toast, setToast] = useState({ show: false, text: '' })
  const toastValue = useMemo(() => ({ toast, setToast }), [toast])
  return (
    <>
      {/* <NotiContext.Provider value={notification}> */}
      <ToastContext.Provider value={toastValue}>
        <AuthContext.Provider value={authValue}>
          {/* <DraftContext.Provider value={draftValue}> */}
          <SocketContext.Provider value={socketValue}>
            {children}
          </SocketContext.Provider>
          {/* </DraftContext.Provider> */}
        </AuthContext.Provider>
      </ToastContext.Provider>
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
  children: PropTypes.shape().isRequired,
}

export default ContextProvider

// export const DraftContext = createContext(null)
// export const NotiContext = createContext([])
export const SocketContext = createContext({
  socket: null,
  sendMessage: () => {},
})
export const AuthContext = createContext({
  auth: {
    authed: false,
  },
  setAuth: () => {},
})
export const ToastContext = createContext({
  toast: { show: false, text: '' },
  setToast: () => {},
})
