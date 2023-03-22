import {
  COLLECT_ALL_PRODUCTS,
  GET_ALL_PRODUCT_REVIEWS,
  GET_PRODUCT_BY_ID,
  UPDATE_ORDER_LIST,
  EDIT_ORDER_LIST,
  GET_ORDER_BY_ID,
} from '../actions/product';

const initialState = {
  allProductInfo: [],
  productUsingId: {},
  getAllProductReviews: [],
  orderList: [],
  orderById: {},
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case COLLECT_ALL_PRODUCTS:
      return {...state, allProductInfo: action.payload};

    case GET_PRODUCT_BY_ID:
      return {...state, productUsingId: action.payload};

    case GET_ALL_PRODUCT_REVIEWS:
      return {...state, getAllProductReviews: action.payload};

    case UPDATE_ORDER_LIST:
      return {...state, orderList: [...state.orderList, action.payload]};

    case EDIT_ORDER_LIST:
      const editList = state.orderList.filter(
        item => item.productId._id != action.payload,
      );
      return {...state, orderList: editList};

    case GET_ORDER_BY_ID:
      return {...state, orderById: action.payload};

    default:
      return state;
  }
};
