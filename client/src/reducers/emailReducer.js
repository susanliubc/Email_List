import {
  GET_EMAILS,
  ADD_EMAIL,
  DELETE_EMAIL,
  EMAILS_ERROR,
  EMAIL_LOADING
} from '../actions/types';

const initState = {
  emails: [],
  loading: false,
  error: ''
};

export default (state = initState, action) => {
  switch (action.type) {
    case GET_EMAILS:
      return {
        ...state,
        emails: action.payload,
        loading: false
      };
    case ADD_EMAIL:
      return {
        ...state,
        emails: [action.payload, ...state.emails],
        loading: false
      };
    case DELETE_EMAIL:
      return {
        ...state,
        emails: state.emails.filter(email => email._id !== action.payload),
        loading: false
      };
    case EMAIL_LOADING:
      return {
        ...state,
        loading: true
      };
    case EMAILS_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
