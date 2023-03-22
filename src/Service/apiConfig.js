const BASE_URL = 'http://localhost:5000/';

export const URLS = {
  signin: BASE_URL + 'user/Signin',
  register: BASE_URL + 'user/register',
  userData: BASE_URL + 'user/userData',

  //Products Api
  allProducts: BASE_URL + 'product/allProducts',
  getProductById: BASE_URL + 'product/productById',
  addProductReview: BASE_URL + 'product/productReview',
  getProductReview: BASE_URL + 'product/productReview',

  //Posts API
  CreatePost: BASE_URL + 'post/createPost',
  fetchAllPosts: BASE_URL + 'post/getAllPosts',
  updateLikePost: BASE_URL + 'post/update/likes',
  removeLikePost: BASE_URL + 'post/updatedislikes',
  createPostComment: BASE_URL + 'post/update/comment',
  fetchAllComments: BASE_URL + 'post/getAllComments',

  //Ad Post API
  fetchallAdPosts: BASE_URL + 'post/getAllAdPosts',
  createAdVertisePost: BASE_URL + 'post/createAdPost',
  fetchAllComments: BASE_URL + 'post/getAllAdPostComments',
  createAdComment: BASE_URL + 'post/update/Advertise/comment',

  //payment Order Api
  paymentOrder: BASE_URL + 'payment/paymentOrder',

  //Orders Api
  createNewOrder: BASE_URL + 'order/newOrder',
  getAllOrders: BASE_URL + 'order/getAllOrders',
  getOrderById: BASE_URL + 'order/orderById',
};
