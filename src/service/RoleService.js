import {API_URL} from '../config'
import axios from 'axios'

const API     = {
  GET_ROLES: API_URL + 'roles'
}

export const getRoles = async () => {
  try {
    let response = await axios.get(API.GET_ROLES);
    let data = response.data.data;
    let result = []
    for(let i in data) {
      result.push({
        label: data[i].role_description,
        value: data[i].id
      })
    }
    console.log(result)

    return result
  } catch (error) {
    return error.response;
  }
}
