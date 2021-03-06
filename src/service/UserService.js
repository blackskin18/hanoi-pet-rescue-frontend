import {API_URL} from '../config'
import axios from 'axios'

const API     = {
  CREATE_USER: API_URL + 'users',
  EDIT_USER: API_URL + 'users/{id}',
  GET_USERS: API_URL + 'users',
  GET_USER_DETAIL: API_URL + 'users/{id}',
  DELETE_USER: API_URL + 'users/{id}',
  GET_ALL_USERS: API_URL + 'users/get-all',
}

const createUser = async (data) => {
  try {
    let response = await axios.post(API.CREATE_USER, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

const editUser = async (data, id) => {
  try {
    data['_method'] = 'PATCH';
    let response = await axios.post(API.EDIT_USER.replace('{id}', id), data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

const getUsers = async (searchParams, page, type = '') => {
  try {
    let response = await axios.get(API.GET_USERS, {
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


const getUserDetail = async (id) => {
  try {
    let response = await axios.get(API.GET_USER_DETAIL.replace('{id}', id));
    return response.data;
  } catch (error) {
    return error.response;
  }
}

const deleteUser = async (id) => {
  try {
    let response = await axios.delete(API.DELETE_USER.replace('{id}', id));
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

const getAllUsers = async () => {
  try {
    let response = await axios.get(API.GET_ALL_USERS);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export default {
  createUser,
  getUsers,
  getUserDetail,
  deleteUser,
  editUser,
  getAllUsers
}

