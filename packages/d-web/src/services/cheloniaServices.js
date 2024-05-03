import axios from 'axios'

const getCookie = (cname) => {
  const name = `${cname}=`
  const decodedCookie = decodeURIComponent(document.cookie)
  const ca = decodedCookie.split(';')
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      const cookie = c.substring(name.length, c.length)
      if (cookie === '') return false
      return cookie
    }
  }
  return false
}

const getConfig = (
  url,
  method,
  data,
  responseType,
  token,
  params = {},
  contentType = 'application/json',
  nocsrf = false
) => {
  const config = {
    headers: nocsrf
      ? {
          contentType,
        }
      : {
          contentType,
          'X-csrftoken': getCookie('csrftoken') || '',
        },
    timeout: 600000,
    url: process.env.REACT_APP_AUTH_URL
      ? `${process.env.REACT_APP_AUTH_URL}/${url.replace('api/', '')}`
      : `${window.location.origin}/${url}`,
    method,
    data,
    params,
  }
  if (responseType) config.responseType = responseType
  return config
}

const response = (res) => {
  const { data } = res
  // document.cookie = res.Headers['Set-Cookie']
  // if (notification) {
  //   try {
  //     const { io } = socket
  //     io.to(parseInt(notification.length ? notification[0].user_id : notification.user_id)).emit('message', notification)
  //   } catch (e) {
  //     console.log('encounted error while sending notification to user')
  //     console.log(e)
  //   }
  // }
  // return data
  return data
}

export default {
  login(value) {
    return axios(
      getConfig(
        'chelonia/auth/login/',
        'post',
        value,
        undefined,
        undefined,
        {},
        'application/json',
        false
      )
    )
      .then((res) => response(res))
      .catch((error) => ({ error }))
  },
  logout(value) {
    return axios(
      getConfig(
        'chelonia/auth/logout/',
        'post',
        value,
        undefined,
        undefined,
        {},
        'application/json',
        false
      )
    )
      .then((res) => response(res))
      .catch((error) => ({ error }))
  },
  register(value) {
    return axios(
      getConfig(
        'chelonia/auth/registration/',
        'post',
        value,
        undefined,
        undefined,
        {},
        'application/json',
        false
      )
    )
      .then((res) => response(res))
      .catch((error) => ({ error }))
  },
  me() {
    return axios(getConfig('chelonia/auth/user/', 'get', {}))
      .then((res) => response(res))
      .catch((error) => ({ error }))
  },
  data(value) {
    return axios(
      getConfig(
        `chelonia/${value.path}`,
        value.method,
        value.data || {},
        value.responseType,
        value.token,
        value.params,
        value.contentType
      )
    )
      .then((res) => response(res))
      .catch((error) => ({ error }))
  },
  extenal(value) {
    return axios({
      ...value,
      // url,
      // method,
      // data,
      // contentType,
    })
  },
}
