import {API_URL} from '../config'
import axios from 'axios'

const API     = {
  CREATE_CASE: API_URL + 'cases',
  GET_CASES: API_URL + 'cases'
}

const createCase = async (data, images) => {
  try {
    let formData = new FormData();
    for(let i in data) {
      if(i === 'receive_date') {
        formData.append(i, data[i].format('YYYY/MM/DD'));
      } else {
        formData.append(i, data[i]);
      }
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

const getCases = async (searchParams, page,  limit = '', type = '') => {
  try {
    let filterDate = {}
    if(searchParams.receive_date) {
      filterDate.receive_date_start = searchParams.receive_date[0].format('YYYY/MM/DD')
      filterDate.receive_date_end = searchParams.receive_date[1].format('YYYY/MM/DD')
    }

    let response = await axios.get(API.GET_CASES, {
      params: {
        type,
        limit,
        ...searchParams,
        ...filterDate,
        page: page
      }
    });
    console.log(response.data)
    return response.data;
  } catch (error) {
    return error.response;
  }
}

export default {
  createCase,
  getCases
}

