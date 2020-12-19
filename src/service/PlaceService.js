import {API_URL} from '../config'
import axios from 'axios'

const API     = {
  CREATE_PLACE: API_URL + 'places',
  EDIT_PLACE: API_URL + 'places/{place_id}',
  GET_PLACES: API_URL + 'places',
  GET_ROOT_HOSPITAL: API_URL + 'places/root-hospitals',
  GET_PLACE_DETAIL: API_URL + 'places/{id}',
  DELETE_PLACE: API_URL + 'places/{id}'
}

const createPlace = async (data) => {
  try {
    let response = await axios.post(API.CREATE_PLACE, data);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.log(error.response.data)
    return error.response.data;
  }
}

const getPlaces = async (searchParams = {}, page = '', type = '', all = false) => {
  try {
    let response = await axios.get(API.GET_PLACES, {
      params: {
        type,
        ...searchParams,
        page: page,
        all
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

const getPlaceDetail = async (id) => {
  try {
    let response = await axios.get(API.GET_PLACE_DETAIL.replace('{id}', id));
    return response.data;
  } catch (error) {
    return error.response;
  }
}

const deletePlace = async (id) => {
  try {
    let response = await axios.delete(API.DELETE_PLACE.replace('{id}', id));
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

const editPlace = async (data, id) => {
  try {
    data['_method'] = 'PATCH';
    let response = await axios.post(API.EDIT_PLACE.replace('{place_id}', id), data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export default {
  createPlace,
  editPlace,
  getPlaces,
  getRootHospitals,
  getPlaceDetail,
  deletePlace
}
