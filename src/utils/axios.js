import axios from 'axios'
// import { useCookies } from 'react-cookie';

// Request interceptor
axios.interceptors.request.use(request => {
  const token = localStorage.getItem('jwt')
  if (token) {
    request.headers.common['Authorization'] = `Bearer ${token}`
  }
  const rootpass = localStorage.getItem('rootpass')
  if(rootpass) {
    request.headers.common['rootpass'] = rootpass
  }
  // request.headers['X-Socket-Id'] = Echo.socketId()

  return request
})