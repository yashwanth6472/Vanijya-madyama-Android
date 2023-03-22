export const FETCH_ALL_POSTS = 'FETCH_ALL_POSTS';
export const FETCH_ALL_AD_POSTS = 'FETCH_ALL_AD_POSTS';
export const FETCH_ALL_POST_COMMENTS = 'FETCH_ALL_POST_COMMENTS';
export const setAllPosts = data => {
  return {
    type: FETCH_ALL_POSTS,
    payload: data,
  };
};

export const setAllAdPosts = data => {
  return {
    type: FETCH_ALL_AD_POSTS,
    payload: data,
  };
};

export const setPostComment = data => {
  return {
    type: FETCH_ALL_POST_COMMENTS,
    payload: data,
  };
};
