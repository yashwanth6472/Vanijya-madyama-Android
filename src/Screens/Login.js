import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {Theme} from '../Components/commonComp/Color';
import authState from '../hooks/authState';
import {error} from '../Components/Style';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader1 from '../Components/commonComp/Loader1';
import {useDispatch, useSelector} from 'react-redux';
import {setUserData, setUserToken} from '../actions/user';
const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const {handelInputSignin, postLogin, signinForm} = authState();
  const onSignUp = () => {
    navigation.navigate('signup');
  };
  const {userData, userToken} = useSelector(state => state.user);
  const [loader, setLoader] = useState(false);
  const onClickLogin = async () => {
    try {
      setLoader(true);
      const getRes = await postLogin();
      Toast.show(`${getRes.data.message}`, Toast.LONG, {
        backgroundColor: '#000',
        textColor: '#00ff00',
      });
      AsyncStorage.setItem('token', getRes.data.token);
      dispatch(setUserData(getRes.data.userInfo));
      dispatch(setUserToken(getRes.data.token));

      setLoader(false);
      navigation.navigate('Main');
    } catch (error) {
      setLoader(false);
      Toast.show(`${error.message}`, Toast.SHORT);
      console.log(error.message);
    }
  };

  return (
    <View
      style={{
        backgroundColor: '#fff',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}>
      {loader ? <Loader1 title={'Sign In...'} /> : <></>}
      <View style={{marginBottom: '10%'}}>
        <Text style={styles.mainLogo}>Vanijya Madyama.</Text>
        <Text style={{color: '#000', textAlign: 'center'}}>
          Discover something new.
        </Text>
      </View>

      <View style={{width: '85%'}}>
        <TextInput
          placeholder="email"
          style={styles.inputHolder}
          value={`${signinForm.email.text}`}
          onChangeText={text => handelInputSignin('email', text)}
        />
        {signinForm.email.error == '' ? (
          <></>
        ) : (
          <Text style={error}>{signinForm.email.error}</Text>
        )}
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          style={styles.inputHolder}
          value={`${signinForm.password.text}`}
          onChangeText={text => handelInputSignin('password', text)}
        />
        {signinForm.password.error == '' ? (
          <></>
        ) : (
          <Text style={error}>{signinForm.password.error}</Text>
        )}
        <View>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => onClickLogin()}>
            <Text style={styles.submitButtonText}>Signin</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.lowerText}>
          If you don't have account please{' '}
          <Text style={{color: Theme.PRIMARY}} onPress={() => onSignUp()}>
            Signup.
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainLogo: {
    color: Theme.PRIMARY,
    fontWeight: 'bold',
    fontSize: 30,
  },
  inputHolder: {
    borderColor: Theme.PRIMARY,
    borderWidth: 0.5,
    marginVertical: 10,
    borderRadius: 5,
  },
  submitButton: {
    width: '100%',
    backgroundColor: Theme.PRIMARY,
    borderRadius: 5,
    elevation: 5,
    marginVertical: 5,
  },
  submitButtonText: {
    color: Theme.BUTTON_TEXT,
    fontSize: 16,
    fontWeight: '600',
    paddingVertical: 8,
    textAlign: 'center',
  },
  lowerText: {
    marginTop: '10%',
    fontWeight: '600',
  },
});

export default Login;
