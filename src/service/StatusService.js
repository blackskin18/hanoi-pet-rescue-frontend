import {API_URL} from '../config'
import axios from 'axios'

const API     = {
  GET_STATUS: API_URL + 'statuses'
}

export const getStatus = async () => {
  try {
    let response = await axios.get(API.GET_STATUS);
    let data = response.data.data;
    let result = []
    for(let i in data) {
      result.push({
        text: data[i].id,
        value: data[i].name
      })
    }

    return result
  } catch (error) {
    return error.response;
  }
}
