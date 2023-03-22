import {View, Text} from 'react-native';
import React, {useState} from 'react';
import authState from '../hooks/authState';
import productSate from '../hooks/productState';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Post} from '../Service/apiService';
import {
  addAdPostInfo,
  addPostInfo,
  commentPostInfo,
} from '../Components/commonComp/constants';
const postAuth = () => {
  const {handleValidation, extractFormDATA} = authState();
  const [imageUri, setImageUri] = useState('');
  const [LogoImageUri, setLogoImageUri] = useState();
  const [secureImageUrl, setSecureImageUrl] = useState('');
  const [secureLogoImageUrl, setSecureLogoImageUrl] = useState('');
  const [addPostForm, setAddPostForm] = useState(addPostInfo);
  const [commentPostForm, setCommentPostForm] = useState(commentPostInfo);
  const [orderList, setOrderList] = useState([]);
  const [addAdvertisePostForm, setAddAdvertisePostForm] =
    useState(addAdPostInfo);
  const [imageLoader, setImageLoader] = useState(false);

  const handlePicker = () => {
    const options = {
      storageOptions: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };

    launchImageLibrary(options, response => {
      console.log('response', response);
      if (response.didCancel) {
        console.log(' User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setImageLoader(true);
        const source = {
          uri: 'data:image/jpeg;base64,' + response.assets[0].base64,
        };

        setImageUri(source);

        const base64IMG = `data:image/jpg;base64,${source.uri}`;

        const data = new FormData();
        data.append('file', base64IMG);
        data.append('upload_preset', 'ecommerce_android');
        data.append('cloud_name', 'yashwanthbshety');

        const baseURL = `https://api.cloudinary.com/v1_1/yashwanthbshety/image/upload`;
        console.log('at adpost -------------------->', imageUri);
        fetch(baseURL, {
          method: 'post',
          mode: 'cors',
          body: data,
        })
          .then(res => res.json())
          .then(result => {
            setSecureImageUrl(result.secure_url);
            setImageLoader(false);
          })
          .catch(error => {
            setImageLoader(false);
            console.log(error);
          });
      }
    });
  };

  const handleLogoImagePicker = () => {
    const options = {
      storageOptions: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };

    launchImageLibrary(options, response => {
      console.log('response', response);
      if (response.didCancel) {
        console.log(' User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setImageLoader(true);
        const source = {
          uri: 'data:image/jpeg;base64,' + response.assets[0].base64,
        };

        setLogoImageUri(source);

        const base64IMG = `data:image/jpg;base64,${source.uri}`;

        const data = new FormData();
        data.append('file', base64IMG);
        data.append('upload_preset', 'ecommerce_android');
        data.append('cloud_name', 'yashwanthbshety');

        const baseURL = `https://api.cloudinary.com/v1_1/yashwanthbshety/image/upload`;
        console.log('at adpost -------------------->', LogoImageUri);
        fetch(baseURL, {
          method: 'post',
          mode: 'cors',
          body: data,
        })
          .then(res => res.json())
          .then(result => {
            setSecureLogoImageUrl(result.secure_url);
            setImageLoader(false);
            console.log(result.secure_url);
          })
          .catch(error => {
            setImageLoader(false);
            console.log(error);
          });
      }
    });
    setImageLoader(false);
  };

  const handelPostForm = (name, value) => {
    const x = {...addPostForm};
    x[name] = {
      ...x[name],
      text: value,
      error: handleValidation(name, value),
    };
    setAddPostForm(x);
    console.log(addPostForm);
  };

  const handleAdPostForm = (name, value) => {
    const x = {...addAdvertisePostForm};
    x[name] = {
      ...x[name],
      text: value,
      error: handleValidation(name, value),
    };

    setAddAdvertisePostForm(x);
    console.log(addAdvertisePostForm);
  };

  const handleCommentPostForm = (name, value) => {
    const x = {...commentPostForm};
    x[name] = {
      ...x[name],
      text: value,
      error: handleValidation(name, value),
    };

    setCommentPostForm(x);
    console.log(commentPostForm);
  };

  //GET FUNCTION START
  const getAllPosts = async () => {
    try {
      const res = await Post.getPosts();
      if (res.status != 200) {
        throw Error(res);
      }
      return res;
    } catch (error) {
      throw Error(error);
    }
  };

  const getAllAdPosts = async () => {
    try {
      const res = await Post.getAdPosts();

      if (res.status != 200) {
        throw Error(res);
      }

      return res;
    } catch (error) {
      throw Error(error);
    }
  };

  const getAllPostComments = async imageId => {
    try {
      const res = await Post.getAllComments(imageId);
      console.log('---->', res);
      if (res.status != 200) {
        throw Error(res);
      }
      return res;
    } catch (error) {
      throw Error(error.message);
    }
  };
  //GET FUNCTION END

  //Post FUNCTION START

  const postAddPost = async () => {
    try {
      let x = {...addPostForm};
      let error = false;
      console.log('----', addPostForm);
      if (secureImageUrl == '') {
        throw Error('Image is required');
      }
      addPostForm.image.text = secureImageUrl;
      for (const [mainKey, mainValue] of Object.entries(addPostForm)) {
        if (mainValue.text.length === 0) {
          error = true;
        } else if (mainValue.error.length != 0) {
          error = true;
        }
      }

      setAddPostForm(x);

      if (error) throw Error('All fields are required');

      const data = extractFormDATA(addPostForm);

      console.log('Extracted login form data ', data);
      let res = await Post.createPosts(data);

      // if (res.status == 400) {
      //   throw Error(res);
      // }

      if (res.status != 200) {
        throw Error(res.message);
      }

      console.log('response at add post ----------->', res);
      setSecureImageUrl('');
      return res;
    } catch (error) {
      throw Error(error.message);
      //console.log('---', error);
    }
  };

  const postAdvertisePost = async () => {
    try {
      let x = {...addAdvertisePostForm};
      let error = false;

      if (secureImageUrl == '') {
        throw Error('image is required');
      }
      addAdvertisePostForm.image.text = secureImageUrl;
      for (const [mainKey, mainValue] of Object.entries(addAdvertisePostForm)) {
        if (mainKey == 'adLogoLink') {
          continue;
        }

        if (mainValue.text.length === 0) {
          error = true;
        } else if (mainValue.error.length != 0) {
          error = true;
        }
      }

      setAddAdvertisePostForm(x);

      if (error) throw Error('All the fields are required');
      const data = extractFormDATA(addAdvertisePostForm);
      const res = await Post.createAdvertisePost(data);
      console.log('data at ad advertise post -->', res);
      return res.data;
    } catch (error) {
      throw Error(error.message);
      //console.log(error.message);
    }
  };
  //Post FUNCTION END

  //PUT FUNCTION START

  const putLikesPost = async data => {
    try {
      const res = await Post.updateLike({id: data});
      if (res.status != 200) {
        throw Error(res);
      }
      return res.data.result;
    } catch (error) {
      throw Error(error.message);
    }
  };

  const putRemoveLikePost = async data => {
    try {
      const res = await Post.removeLike({id: data});
      if (res.status != 200) {
        throw Error(res);
      }
      return res.data.result;
    } catch (error) {
      throw Error(error.message);
    }
  };

  const putCommentPost = async imageId => {
    try {
      let x = {...commentPostForm};
      let error = false;

      for (const [mainKey, mainValue] of Object.entries(commentPostForm)) {
        if (mainValue.text.length === 0) {
          error = true;
        } else if (mainValue.error.length != 0) {
          error = true;
        }
      }

      setCommentPostForm(x);

      if (error) throw Error('All fields are required');

      const data = extractFormDATA(commentPostForm);

      data.id = imageId;
      console.log('Extracted login form data ', data);
      const res = await Post.updatePostComment(data);
      return res;
    } catch (error) {
      throw Error(error.message);
    }
  };

  //PUT FUNCTION END

  return {
    addPostForm: addPostForm,
    addAdvertisePostForm: addAdvertisePostForm,
    orderList: orderList,
    commentPostForm: commentPostForm,
    imageLoader: imageLoader,
    getAllPosts: getAllPosts,
    getAllAdPosts: getAllAdPosts,
    getAllPostComments: getAllPostComments,

    handlePicker: handlePicker,
    imageUri: imageUri,
    handelPostForm: handelPostForm,
    handleAdPostForm: handleAdPostForm,
    handleCommentPostForm: handleCommentPostForm,
    postAddPost: postAddPost,
    postAdvertisePost: postAdvertisePost,

    putLikesPost: putLikesPost,
    putRemoveLikePost: putRemoveLikePost,
    putCommentPost: putCommentPost,
  };
};

export default postAuth;
