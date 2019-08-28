import {
  GET_EMAILS,
  ADD_EMAIL,
  DELETE_EMAIL,
  EMAILS_ERROR,
  EMAIL_LOADING
} from './types';
import axios from 'axios';
import { tokenConfig } from './authAction';
import { returnErrors } from './errorAction';

//Get emails from server
export const getEmails = () => async dispatch => {
  try {
    setEmailLoading();

    const res = await axios.get('/api/emails');

    dispatch({
      type: GET_EMAILS,
      payload: res.data
    });
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
    dispatch({
      type: EMAILS_ERROR,
      payload: error.response
    });
  }
};

//Add email from server
export const addEmail = email => async (dispatch, getState) => {
  try {
    // const config = {
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // };

    const res = await axios.post('/api/emails', email, tokenConfig(getState));

    dispatch({
      type: ADD_EMAIL,
      payload: res.data
    });
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
    dispatch({
      type: EMAILS_ERROR,
      payload: error.response
    });
  }
};

//Delete email from server
export const deleteEmail = id => async (dispatch, getState) => {
  try {
    await axios.delete(`/api/emails/${id}`, tokenConfig(getState));

    dispatch({
      type: DELETE_EMAIL,
      payload: id
    });
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
    dispatch({
      type: EMAILS_ERROR,
      payload: error.response
    });
  }
};

//Load emails
export const setEmailLoading = () => {
  return {
    type: EMAIL_LOADING
  };
};
