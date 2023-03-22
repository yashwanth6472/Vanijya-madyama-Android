import axios, {AxiosError, AxiosRequestHeaders, AxiosResponse} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {URLS} from './apiConfig';
const headerData = async () => {
  const token = await AsyncStorage.getItem('token');
  return {
    'Access-Control-Allow-Origin': '*',
    Authorization: 'Bearer ' + token,
  };
};

const instance = axios.create({
  timeout: 30000,
  headers: headerData(),
});

const responseBody = response => response;

export const errorBody = err => {
  if (err.response) {
    // Request made and server responded
    console.log('err.response', err);
    return {
      message: err.response.data.message,
      status: err.response.status,
    };
  } else if (err.request) {
    // The request was made but no response was received
    console.log('err.request', err.request);
    return 'Network Failiure, Please Check your network connection!';
  } else {
    // Something happened in setting up the request that triggered an err
    console.log('err', err.message);
    return err.message;
  }
};

const requests = {
  get: (url, headers = {...headerData()}) =>
    instance.get(url, {headers}).then(responseBody).catch(errorBody),
  post: (url, body, headers = {...headerData()}) =>
    instance.post(url, body, {headers}).then(responseBody).catch(errorBody),

  put: (url, body, headers = {...headerData()}) =>
    instance.put(url, body, {headers}).then(responseBody).catch(errorBody),
};

export const Auth = {
  //user login api
  signIn: (email, password) =>
    requests.post(
      `${URLS.signin}`,
      {
        email: email,
        password: password,
      },
      {
        'Access-Control-Allow-Origin': '*',
      },
    ),

  signUp: data =>
    requests.post(
      `${URLS.register}`,
      {
        data,
      },
      {
        'Access-Control-Allow-Origin': '*',
      },
    ),

  userInfo: async () =>
    requests.get(`${URLS.userData}`, {
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
    }),
};

export const Product = {
  allProducts: () =>
    requests.get(`${URLS.allProducts}`, {
      'Access-Control-Allow-Origin': '*',
    }),
  productById: id =>
    requests.get(`${URLS.getProductById}/${id}`, {
      'Access-Control-Allow-Origin': '*',
    }),

  createProductReview: async (id, data) =>
    requests.put(`${URLS.addProductReview}/${id}`, data, {
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
    }),

  getProductReview: id =>
    requests.get(`${URLS.getProductReview}/${id}`, {
      'Access-Control-Allow-Origin': '*',
    }),
};

export const Post = {
  createPosts: async data =>
    requests.post(`${URLS.CreatePost}`, data, {
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
    }),

  getPosts: async () =>
    requests.get(`${URLS.fetchAllPosts}`, {'Access-Control-Allow-Origin': '*'}),

  getAdPosts: async () =>
    requests.get(`${URLS.fetchallAdPosts}`, {
      'Access-Control-Allow-Origin': '*',
    }),

  createAdvertisePost: async data =>
    requests.post(`${URLS.createAdVertisePost}`, data, {
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
    }),

  updateLike: async data =>
    requests.put(`${URLS.updateLikePost}`, data, {
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
    }),
  removeLike: async data =>
    requests.put(`${URLS.removeLikePost}`, data, {
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
    }),

  updatePostComment: async data =>
    requests.put(`${URLS.createPostComment}`, data, {
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
    }),
  getAllComments: async data =>
    requests.get(`${URLS.fetchAllComments}/${data}`, {
      'Access-Control-Allow-Origin': '*',
    }),

  createAdvertiseComment: async data =>
    requests.put(`${URLS.createAdComment}`, data, {
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
    }),

  getAllAdvertiseComments: async data =>
    requests.get(`${URL.fetchAllComments}/${data}`, {
      'Access-Control-Allow-Origin': '*',
    }),
};

export const Payment = {
  getPaymentOrder: async data =>
    requests.post(`${URLS.paymentOrder}`, data, {
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
    }),
};

export const Orders = {
  createOrder: async data =>
    requests.post(`${URLS.createNewOrder}`, data, {
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
    }),

  fetchAllOrders: async () =>
    requests.get(`${URLS.getAllOrders}`, {
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
    }),

  fetchOrderById: async data =>
    requests.get(`${URLS.getOrderById}/${data}`, {
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
    }),
};
