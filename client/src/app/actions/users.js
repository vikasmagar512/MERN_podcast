import axios from 'axios';
import { API_URL } from '../config';
import {
    FETCH_USER_PROFILE,
    FETCH_USERS,
} from './types/index';
import { FETCH_CONVERT_T2S } from './types';

/**
 * Fetch all users
 */
export function fetchUsers() {
  const user = JSON.parse(localStorage.getItem('user'));

  return function (dispatch) {
    debugger
    axios.get(API_URL, { headers: { authorization: user.token } })
      .then(response => {
        dispatch({
          type: FETCH_USERS,
          payload: response.data,
        });
      });
  }
}

/**
 * Fetch Profile
 */
export function loadProfileData() {
  const user = JSON.parse(localStorage.getItem('user'));
  return function (dispatch) {
    debugger
    axios.get(`${API_URL}/profile`, { headers: { authorization: user.token } })
      .then(response => {
        dispatch({
          type: FETCH_USER_PROFILE,
          payload: response.data,
        });
      });
  }
}
/**
 * convertT2S
 */
export function convertT2S(text) {
  return function (dispatch) {
    debugger
      const user = JSON.parse(localStorage.getItem('user'));
      axios.post(`${API_URL}/convertT2S`, { headers: { authorization: user.token }, body: { text } })
      .then(response => {
        dispatch({
          type: FETCH_CONVERT_T2S,
          payload: response.data,
        });
      });
  }
}
