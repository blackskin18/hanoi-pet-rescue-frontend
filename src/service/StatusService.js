import {API_URL} from '../config'
import axios from 'axios'

const API     = {
  GET_STATUS: API_URL + 'statuses'
}

export const getStatus = async () => {
  try {
    let response = await axios.get(API.GET_STATUS);
    return response.data;
  } catch (error) {
    return error.response;
  }
}
