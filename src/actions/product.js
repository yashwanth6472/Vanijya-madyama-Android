export const COLLECT_ALL_PRODUCTS = 'COLLECT_ALL_PRODUCTS';
export const GET_PRODUCT_BY_ID = 'GET_PRODUCT_BY_ID';
export const GET_ALL_PRODUCT_REVIEWS = 'GET_ALL_PRODUCT_REVIEWS';
export const UPDATE_ORDER_LIST = 'UPDATE_ORDER_LIST';
export const EDIT_ORDER_LIST = 'EDIT_ORDER_LIST';
export const GET_ORDER_BY_ID = 'GET_ORDER_BY_ID';
export const setAllproducts = data => {
  return {
    type: COLLECT_ALL_PRODUCTS,
    payload: data,
  };
};

export const setProductById = data => {
  return {
    type: GET_PRODUCT_BY_ID,
    payload: data,
  };
};

export const setAllProductReviews = data => {
  return {
    type: GET_ALL_PRODUCT_REVIEWS,
    payload: data,
  };
};

export const setOrderList = data => {
  return {
    type: UPDATE_ORDER_LIST,
    payload: data,
  };
};

export const editOrderList = data => {
  return {
    type: EDIT_ORDER_LIST,
    payload: data,
  };
};

export const setOrderByID = data => {
  return {
    type: GET_ORDER_BY_ID,
    payload: data,
  };
};
