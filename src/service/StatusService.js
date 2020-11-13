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
        label: data[i].name,
        value: data[i].id
      })
    }
    console.log(result)

    return result
  } catch (error) {
    return error.response;
  }
}
