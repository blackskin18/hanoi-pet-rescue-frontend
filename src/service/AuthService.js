import {API_URL} from '../config'
import axios from 'axios'

const API     = {
  LOGIN: API_URL + 'auth/login',
  VERIFY_TOKEN: API_URL + 'auth/verify-token',
}

const login = async (email, password) => {
  try {
    let response = await axios.post(API.LOGIN, {
      email,
      password
    });
    localStorage.setItem('jwt', response.data.access_token)
    localStorage.setItem('name', response.data.name)
    localStorage.setItem('id', response.data.id)
    return true;
  } catch (error) {
    console.log(error.response);
    return false
  }
}

const verifyToken = async () => {
  try {
    var response = await axios.post(API.VERIFY_TOKEN)

    if(response.data.code == 1) {
      const data = response.data.data
      console.log(data)
      localStorage.setItem('name', data.name)
      localStorage.setItem('id', data.id)
      return true
    }
    // localStorage.setItem('jwt', response.data.access_token)
  } catch (e) {
    // localStorage.removeItem('jwt')
    return false
  }
}

export default {
  login,
  verifyToken
}

