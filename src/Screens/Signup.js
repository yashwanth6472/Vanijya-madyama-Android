import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {Theme} from '../Components/commonComp/Color';
import authState from '../hooks/authState';
import Toast from 'react-native-simple-toast';
import Loader1 from '../Components/commonComp/Loader1';
import {error} from '../Components/Style';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
const Signup = ({navigation}) => {
  const {
    registerForm,
    handleInputRegister,
    postRegister,
    handlePicker,
    imageUri,
  } = authState();
  const [loader, setLoader] = useState(false);
  const onSignin = () => {
    navigation.navigate('login');
  };
  const onClickSignUp = async () => {
    try {
      setLoader(true);
      const getRes = await postRegister();
      Toast.show('Registered successfully plase signin', Toast.LONG);
      setLoader(false);
      navigation.navigate('login');
    } catch (error) {
      setLoader(false);
      Toast.show(error.message, Toast.LONG);
      console.log(error.message);
    }
  };

  return (
    <ScrollView>
      {loader ? <Loader1 title="Sign Up..." /> : <></>}
      <View
        style={{
          backgroundColor: '#fff',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          paddingBottom: 100,
        }}>
        <View style={{marginBottom: '10%'}}>
          <Text style={styles.mainLogo}>Vanijya Madyama.</Text>
          <Text style={{color: '#000', textAlign: 'center'}}>
            Discover something new.
          </Text>
        </View>
        <View>
          {imageUri != '' ? (
            <TouchableOpacity onPress={handlePicker}>
              <Image
                source={imageUri}
                style={{width: 100, height: 100, borderRadius: 100}}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handlePicker}>
              <MaterialCommunity name="account-edit-outline" size={100} />
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.lowerText}>
          If you don't have account please{' '}
          <Text style={{color: Theme.PRIMARY}} onPress={() => onSignin()}>
            Signin.
          </Text>
        </Text>
        <View style={{width: '85%'}}>
          <TextInput
            placeholder="Username"
            style={styles.inputHolder}
            value={`${registerForm.name.text}`}
            onChangeText={text => handleInputRegister('name', text)}
          />
          {registerForm.name.error == '' ? (
            <></>
          ) : (
            <Text style={error}>{registerForm.name.error}</Text>
          )}
          <TextInput
            placeholder="email"
            style={styles.inputHolder}
            value={`${registerForm.email.text}`}
            onChangeText={text => handleInputRegister('email', text)}
          />
          {registerForm.email.error == '' ? (
            <></>
          ) : (
            <Text style={error}>{registerForm.email.error}</Text>
          )}
          <TextInput
            placeholder="Create Password"
            secureTextEntry={true}
            style={styles.inputHolder}
            value={`${registerForm.password.text}`}
            onChangeText={text => handleInputRegister('password', text)}
          />
          {registerForm.password.error == '' ? (
            <></>
          ) : (
            <Text style={error}>{registerForm.password.error}</Text>
          )}
          <TextInput
            placeholder="Phone Number"
            style={styles.inputHolder}
            value={`${registerForm.phoneNumber.text}`}
            onChangeText={text => handleInputRegister('phoneNumber', text)}
          />
          {registerForm.phoneNumber.error == '' ? (
            <></>
          ) : (
            <Text style={error}>{registerForm.phoneNumber.error}</Text>
          )}
          <TextInput
            placeholder="Address"
            style={styles.inputHolder}
            value={`${registerForm.adress.text}`}
            onChangeText={text => handleInputRegister('adress', text)}
          />
          {registerForm.adress.error == '' ? (
            <></>
          ) : (
            <Text style={error}>{registerForm.adress.error}</Text>
          )}

          <View style={styles.twoCol}>
            <TextInput
              placeholder="City"
              style={[styles.inputHolder, {width: '48%'}]}
              value={`${registerForm.city.text}`}
              onChangeText={text => handleInputRegister('city', text)}
            />

            <TextInput
              placeholder="State"
              style={[styles.inputHolder, {width: '48%'}]}
              value={`${registerForm.state.text}`}
              onChangeText={text => handleInputRegister('state', text)}
            />
          </View>

          <View style={styles.twoCol}>
            <TextInput
              placeholder="Country"
              style={[styles.inputHolder, {width: '48%'}]}
              value={`${registerForm.country.text}`}
              onChangeText={text => handleInputRegister('country', text)}
            />

            <TextInput
              placeholder="Pincode"
              style={[styles.inputHolder, {width: '48%'}]}
              value={`${registerForm.pincode.text}`}
              onChangeText={text => handleInputRegister('pincode', text)}
            />
          </View>

          <View>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={onClickSignUp}>
              <Text style={styles.submitButtonText}>Signup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  mainLogo: {
    color: Theme.PRIMARY,
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: 100,
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
    marginTop: '5%',
    fontWeight: '600',
  },
  twoCol: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
export default Signup;
