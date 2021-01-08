import {API_URL} from '../config'
import axios     from 'axios'


const API = {
  GET_HISTORY : API_URL + 'histories',
}

const getHistories = async (startDate, endDate, page = 1) => {
  try {
    let response = await axios.get(API.GET_HISTORY, {
      params: {
        'start_date': startDate,
        'end_date'  : endDate,
        'page': page
      }
    });
    return response.data;
  } catch (error) {
    return error;
  }
}

export default {
  getHistories,
}

