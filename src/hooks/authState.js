import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {registerInfo, signINInfo} from '../Components/commonComp/constants';
import {Auth} from '../Service/apiService';
import Toast from 'react-native-simple-toast';
import postAuth from './postAuth';
import {launchImageLibrary} from 'react-native-image-picker';
const authState = () => {
  const [signinForm, setSigninForm] = useState(signINInfo);
  const [registerForm, setRegisterForm] = useState(registerInfo);
  const [imageUri, setImageUri] = useState('');
  const [secureUrl, setSecureUrl] = useState('');

  const handleValidation = (name, value) => {
    let error = '';

    if (name == 'email') {
      if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value)) {
        error = 'Invalid email';
      } else {
        error = '';
      }
    } else if (name == 'password') {
      if (value.length < 6) {
        error = 'Password is not strong';
      } else {
        error = '';
      }
    } else if ('phoneNumber' == name) {
      if (value.length == 10) {
        error = '';
      } else {
        error = 'Please enter Valid Phone Number';
      }
    } else if (name == 'adress') {
      if (value.length > 3) {
        error = '';
      } else {
        error = 'Please enter valid Adress';
      }
    } else if (name == 'city') {
      if (value.length > 2) {
        error = '';
      } else {
        error = 'Please enter valid City';
      }
    } else if (name == 'country') {
      if (value.length > 3) {
        error = '';
      } else {
        error = 'Please enter valid country';
      }
    } else if (name == 'state') {
      if (value.length > 4) {
        error = '';
      } else {
        error = 'Please enter valid state';
      }
    } else if (name == 'pincode') {
      if (value.length > 4) {
        error = '';
      } else {
        error = 'Please enter valid pincode';
      }
    } else if (name == 'name') {
      if (value.length > 4) {
        error = '';
      } else {
        error = 'Please enter valid name';
      }
    } else if (name == 'comment') {
      if (value.length > 4) {
        error = '';
      } else {
        error = 'Please enter valid comment';
      }
    } else if (name == 'image') {
      if (value.length < 1) {
        error = 'Image is required';
      }
    }

    else if(name == "adCaption"){
      if(value.length < 4){
        error = 'Enter Valid Product Name'
      }
    }

    else if (name == 'adDescription'){
      if(value.length < 10){
        error = "required atleast 10 characters"
      }
    } 

    else if (name == 'adTopic'){
      if(value.length < 4){
        error = "Valid Categorie is required"
      }
    } 

    else if (name == 'image' || name == 'adLink'){
      if(value.length == 0){
        error = `${name} is required`
      }
    }
    
    
    return error;
  };

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

        fetch(baseURL, {
          method: 'post',
          mode: 'cors',
          body: data,
        })
          .then(res => res.json())
          .then(result => {
            setSecureUrl(result.secure_url);
            console.log(
              ';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-',
              result.secure_url,
            );
          })
          .catch(error => console.log(error));
      }
    });
  };

  //START HANDLE FUNCTION

  const handelInputSignin = (name, value) => {
    const x = {...signinForm};
    x[name] = {
      ...x[name],
      text: value,
      error: handleValidation(name, value),
    };
    setSigninForm(x);
  };

  const handleInputRegister = (name, value) => {
    const x = {...registerForm};
    x[name] = {
      ...x[name],
      text: value,
      error: handleValidation(name, value),
    };
    console.log(x);
    setRegisterForm(x);
  };

  //END HANDLE FUNCTION

  //START GET

  const FetchUserData = async () => {
    try {
      const res = await Auth.userInfo();
      if (res.status != 200) {
        throw Error(res);
      }

      return res.data.result[0];
    } catch (error) {
      console.log(error);
    }
  };

  //End GET

  //START POST

  const postLogin = async () => {
    try {
      let x = {...signinForm};
      let error = false;

      for (const [mainKey, mainValue] of Object.entries(signinForm)) {
        if (mainValue.text.length === 0) {
          error = true;
        } else if (mainValue.error.length != 0) {
          error = true;
        }
      }

      setSigninForm(x);

      if (error) throw Error('Invalid email or password');
      const data = extractFormDATA(signinForm);
      console.log('Extracted login form data ', data);
      let res = await Auth.signIn(data.email, data.password);

      if (res.status == 400) {
        throw Error('Invalid password or email');
      }

      if (res.status != 200) {
        throw Error(res.message);
      }

      console.log(res);
      return res;
    } catch (error) {
      throw Error(error.message);
    }
  };

  const postRegister = async () => {
    try {
      let x = {...registerForm};
      let error = '';

      if (secureUrl == '') {
        throw Error('image is required');
      }
      registerForm.image.text = secureUrl;

      for (const [mainKey, mainValue] of Object.entries(registerForm)) {
        if (mainValue.text.length == 0) {
          error = true;
        }
        if (mainValue.error.length != 0) {
          error = true;
        }
      }

      if (error) throw Error('Required all the fields');
      const data = extractFormDATA(registerForm);
      console.log('extracted form data from register form ', data);

      const res = await Auth.signUp(data);
      if (res.status == 400) {
        throw Error('Email already taken');
      }
      if (res.status != 200) {
        throw Error(res.message);
      }
      return res;
    } catch (error) {
      throw Error(error.message);
    }
  };

  //START END

  //extract start

  const extractFormDATA = formName => {
    let data = {};

    for (const [mainKey, mainValue] of Object.entries(formName)) {
      let mainVal = mainValue;
      data[mainKey] = mainVal.text;
    }

    return data;
  };
  return {
    imageUri: imageUri,
    handleValidation: handleValidation,
    handlePicker: handlePicker,
    extractFormDATA: extractFormDATA,

    signinForm: signinForm,
    setSigninForm: setSigninForm,
    handelInputSignin: handelInputSignin,
    postLogin: postLogin,

    registerForm: registerForm,
    setRegisterForm: setRegisterForm,
    handleInputRegister: handleInputRegister,
    postRegister: postRegister,

    FetchUserData: FetchUserData,
  };
};

export default authState;
