import {API_URL} from '../config'
import axios from 'axios'

const API     = {
  CREATE_PLACE: API_URL + 'places',
  GET_PLACES: API_URL + 'places',
  GET_ROOT_HOSPITAL: API_URL + 'places/root-hospitals',
}

const createPlace = async (data) => {
  try {
    let response = await axios.post(API.CREATE_PLACE, data);
    console.log(response.data)
    return response.data;
  } catch (error) {
    return error.response;
  }
}

const getPlaces = async (searchParams, page, type = '') => {
  try {
    let response = await axios.get(API.GET_PLACES, {
      params: {
        type,
        ...searchParams,
        page: page
      }
    });
    return response.data;
  } catch (error) {
    console.log(error)
    return error.response;
  }
}

const getRootHospitals = async () => {
  try {
    let response = await axios.get(API.GET_ROOT_HOSPITAL);
    console.log(response.data)
    return response.data;
  } catch (error) {
    return error.response;
  }
}

export default {
  createPlace,
  getPlaces,
  getRootHospitals
}

