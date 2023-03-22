import {View, Text, ScrollView, StyleSheet, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Theme} from '../Components/commonComp/Color';
import Slider from '../Components/Slider';
import HomeMiniSlider from '../Components/commonComp/HomeMiniSlider';
import Toppicks from '../Components/Toppicks';
import productState from '../hooks/productState';
import {useDispatch} from 'react-redux';
import {setAllproducts} from '../actions/product';
import Loader1 from '../Components/commonComp/Loader1';
import FashionSlider from '../Components/FashionSlider';
import MobileSlider from '../Components/MobileSlider';
import ElectronicSlider from '../Components/ElectronicSlider';
import HomeAppSlider from '../Components/HomeAppSlider';
import SportSlider from '../Components/SportSlider';
import {setUserData} from '../actions/user';
import authState from '../hooks/authState';
import AsyncStorage from '@react-native-async-storage/async-storage';
const data = [
  {
    id: 1,
    title: 'ticket-alt',
    color: Theme.PRIMARY,
    name: 'Coupons',
  },
  {
    id: 2,
    title: 'credit-card',
    color: 'dodgerblue',
    name: 'Credit',
  },
  {
    id: 3,
    title: 'shopping-cart',
    color: 'green',
    name: 'Cart',
  },
  {
    id: 4,
    title: 'user-alt',
    color: 'orange',
    name: 'Profile',
  },
  {
    id: 5,
    title: 'coins',
    color: '#e5de00',
    name: 'Coins',
  },
];
const Home = ({navigation}) => {
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState('');
  const {getAllProducts} = productState();
  const {FetchUserData} = authState();
  const dispatch = useDispatch();
  const fetchAllProductsData = async () => {
    try {
      handleLoader('hang on loading', true);
      const res = await getAllProducts();
      dispatch(setAllproducts(res.data.result));
      await AsyncStorage.setItem('product', '[]');
      handleLoader('', false);
    } catch (error) {
      setLoader('', false);
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchAllProductsData();
  }, []);

  const handleLoader = (msg = 'loading please wait', load) => {
    setLoader(load);
    setMessage(msg);
  };

  const fetchInfo = async () => {
    try {
      handleLoader('fetching details', true);
      const res = await FetchUserData();
      dispatch(setUserData(res));
      setLoader('', false);
    } catch (error) {
      setLoader('', false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <View>
      {loader ? (
        <Loader1 title={message} />
      ) : (
        <ScrollView style={{width: '100%', backgroundColor: '#fff'}}>
          <View>
            <View style={styles.serachBG}>
              <View>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 18,
                    fontWeight: '700',
                    opacity: 0.7,
                    textAlign: 'center',
                    marginBottom: 15,
                  }}>
                  Vanijya Madyama
                </Text>
              </View>
              <TextInput
                placeholder="Search your favourite here"
                placeholderTextColor={'#fff'}
                style={styles.serachbox}
              />
            </View>

            <Slider />
            <HomeMiniSlider data={data} />
            <Toppicks navigation={navigation} />
            <FashionSlider navigation={navigation} />
            <MobileSlider navigation={navigation} />
            <ElectronicSlider navigation={navigation} />
            <HomeAppSlider navigation={navigation} />
            <SportSlider navigation={navigation} />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  serachBG: {
    backgroundColor: Theme.PRIMARY,
    width: '100%',
    paddingTop: 25,
    paddingHorizontal: 10,
    paddingBottom: 8,
  },
  serachbox: {
    borderColor: '#fff',
    borderWidth: 1,
    color: '#fff',
    paddingHorizontal: 10,
    borderRadius: 10,
  },
});

export default Home;
