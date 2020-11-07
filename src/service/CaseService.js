import {API_URL} from '../config'
import axios from 'axios'

const API     = {
  CREATE_CASE: API_URL + 'cases'
}

const createCase = async (data, images) => {
  try {
    let formData = new FormData();
    for(let i in data) {
      formData.append(i, data[i]);
    }
    for (let i in images) {
      formData.append("images", images[i].originFileObj);
    }

    let response = await axios.post(API.CREATE_CASE, formData, {
      headers: {"Content-Type": "multipart/form-data"}
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
}

export default {
  createCase
}

