import {FETCH_USER_DATA, GET_USER_TOKEN} from '../actions/user';

const initialState = {
  userData: [],
  userToken: '',
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_DATA:
      return {...state, userData: action.payload};

    case GET_USER_TOKEN:
      return {...state, userToken: action.payload};

    default:
      return state;
  }
};
