import {
  FETCH_ALL_AD_POSTS,
  FETCH_ALL_POSTS,
  FETCH_ALL_POST_COMMENTS,
} from '../actions/post';

const initialState = {
  allPosts: [],
  allAdPosts: [],
  postComments: [],
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_POSTS:
      return {...state, allPosts: action.payload};

    case FETCH_ALL_AD_POSTS:
      return {...state, allAdPosts: action.payload};

    case FETCH_ALL_POST_COMMENTS:
      return {...state, postComments: action.payload};

    default:
      return state;
  }
};
