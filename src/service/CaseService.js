import {API_URL} from '../config'
import axios     from 'axios'
import moment    from 'moment';


const API = {
  CREATE_CASE    : API_URL + 'cases',
  GET_CASES      : API_URL + 'cases',
  GET_CASE_DETAIL: API_URL + 'cases/{id}',
  DELETE_CASE    : API_URL + 'cases/{id}',
  GET_REPORT     : API_URL + 'cases/report'
}

const createCase = async (data, images) => {
  try {
    let formData = new FormData();
    for (let i in data) {
      if (i === 'receive_date') {
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

const getCases = async (searchParams, page, limit = '', type = '') => {
  try {
    let filterDate = {}
    if (searchParams.receive_date) {
      filterDate.receive_date_start = searchParams.receive_date[0].format('YYYY/MM/DD')
      filterDate.receive_date_end   = searchParams.receive_date[1].format('YYYY/MM/DD')
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

const getCaseDetail = async (id) => {
  try {
    let response = await axios.get(API.GET_CASE_DETAIL.replace('{id}', id));
    return response.data;
  } catch (error) {
    return error.response;
  }
}

const deleteCase = async (id) => {
  try {
    let response = await axios.delete(API.DELETE_CASE.replace('{id}', id));
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

const getReport = async (type, timeData) => {
  try {
    var time = type === 'year' ? timeData.format('YYYY/01/01') : timeData.format('YYYY/MM/01')

    var startDateMoment = moment(time)
    var endDateMoment   = moment(time)

    switch (type) {
      case "month":
        endDateMoment.add(1, 'months').subtract(1, 'd')
        break;
      case "quarter":
        endDateMoment.add(1, 'Q').subtract(1, 'd')
        break;
      case "year":
        endDateMoment.add(1, 'y').subtract(1, 'd')
        break;
    }

    var startDate = startDateMoment.format('YYYY/MM/DD')
    var endDate   = endDateMoment.format('YYYY/MM/DD')

    let response = await axios.get(API.GET_REPORT, {
      params: {
        'start_time': startDate,
        'end_time'  : endDate,
      }
    });
    return response.data;

  } catch (error) {
    return error;
  }
}

export default {
  createCase,
  getCases,
  getCaseDetail,
  deleteCase,
  getReport
}

