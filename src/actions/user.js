export const FETCH_USER_DATA = 'FETCH_USER_DATA';
export const GET_USER_TOKEN = 'GET_USER_TOKEN';
export const setUserData = data => {
  return {
    type: FETCH_USER_DATA,
    payload: data,
  };
};

export const setUserToken = data => {
  return {
    type: GET_USER_TOKEN,
    payload: data,
  };
};
