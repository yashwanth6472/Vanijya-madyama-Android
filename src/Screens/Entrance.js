import {View, Text, SafeAreaView, StyleSheet, Image} from 'react-native';
import React, {useEffect} from 'react';
import {background} from '../Components/Style';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Loader from '../Components/commonComp/Loader';
import {Theme} from '../Components/commonComp/Color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
const Entrance = ({navigation}) => {
  const checkUserToken = async () => {
    try {
      const fetchToken = await AsyncStorage.getItem('token');
      if (fetchToken) {
        navigation.navigate('Main');
      } else {
        navigation.navigate('Auth');
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    checkUserToken();
  }, []);
  // useEffect(() => {
  //   setTimeout(() => {
  //     navigation.navigate('Auth');
  //   }, 4000);
  // }, []);
  return (
    <SafeAreaView style={{backgroundColor: Theme.PRIMARY, height: '100%'}}>
      <View style={styles.icon}>
        <Fontisto name="shopping-store" size={100} color="#fff" />
        <Text style={styles.iconText}>
          <Text style={{fontWeight: 'bold'}}>e</Text>Shop
        </Text>
        <Loader />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  icon: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '60%',
  },
  iconText: {
    color: '#fff',
    fontSize: 45,
    paddingVertical: 5,
  },
});

export default Entrance;
