import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import {Orders} from '../Service/apiService';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import Header from '../Components/Header';
import CartCard from '../Components/Cart/CartCard';
import DeliveryAdress from '../Components/Cart/DeliveryAdress';
import {Theme} from '../Components/commonComp/Color';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontiso from 'react-native-vector-icons/Fontisto';
import {editOrderList, setProductById} from '../actions/product';
import BillCard from '../Components/Cart/BillCard';
import productState from '../hooks/productState';
import Loader1 from '../Components/commonComp/Loader1';
const Cart = ({navigation}) => {
  const {orderList, productUsingId} = useSelector(state => state.product);
  const {userData} = useSelector(state => state.user);
  console.log('-------->', userData);
  const dispatch = useDispatch();
  const {getProductById, paymentOptions} = productState();
  const [loader, setLoader] = useState(false);
  const {width, height} = Dimensions.get('window');
  const priceDetails = orderList.map(item => item.productId.price);
  const totalPrice = priceDetails.reduce((pv, cv) => pv + cv, 0);

  const onPressItem = async itemId => {
    try {
      setLoader(true);
      const getRes = await getProductById(itemId);
      dispatch(setProductById(getRes.data.result));
      console.log('---->', productUsingId);
      // const getRes1 = await getProductReview(productId);
      // dispatch(setAllProductReviews())
      navigation.navigate('header', {
        screen: 'singleProduct',
        params: {item: itemId, type: ''},
      });
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log(error.message);
    }
  };

  const onPressRemoveItem = async productId => {
    try {
      dispatch(editOrderList(productId));
      console.log('eeeeeee', orderList);
    } catch (error) {
      console.log(error.message);
    }
  };

  const onPressPlaceOrder = async (
    currency,
    customer_id,
    customerName,
    customerPhone,
    customerEmail,
    cutsomerAdress,
  ) => {
    try {
      const res = await paymentOptions(
        currency,
        customer_id,
        customerName,
        customerPhone,
        customerEmail,
        cutsomerAdress,
        orderList,
        navigation,
        savedPrice,
      );
      //navigation.navigate('success', {savedPrice: 100});
      console.log('response at payment --->', res);
    } catch (error) {
      console.log(error.message);
    }
  };

  let totalprice = totalPrice.toFixed(1);
  let numberOfProduct = orderList.length;
  let discountPrice = totalPrice - totalPrice * 0.1 + 40;
  discountPrice = discountPrice.toFixed(1);
  let savedPrice = totalPrice * 0.1;
  savedPrice = savedPrice.toFixed(1);

  return (
    <ScrollView style={{backgroundColor: '#fff', flex: 1}}>
      <Header title={'Cart'} cart={false} press={() => navigation.goBack()} />
      {loader ? <Loader1 title={'redirecting Please wait..'} /> : <></>}
      {orderList.length > 0 ? (
        <View style={{marginHorizontal: 8, marginVertical: 10}}>
          <View>
            <Text style={{fontSize: 16, color: Theme.PRIMARY, marginBottom: 2}}>
              <MaterialCommunity name="home" size={20} />
              Delivery Adress :{' '}
            </Text>
            <DeliveryAdress />
          </View>
          <View style={{marginVertical: 8}}>
            {orderList.map(item => {
              return (
                <>
                  <CartCard
                    productName={item.productId.name.slice(0, 25)}
                    size={item.size}
                    productImage={item.productId.images[0].url}
                    productPrice={item.productId.price}
                    quantity={item.quantity}
                    productRating={item.productId.rating}
                    productReviewLength={item.productId.reviews.length}
                    press={() => onPressItem(item.productId._id)}
                    removeProduct={() => onPressRemoveItem(item.productId._id)}
                  />
                </>
              );
            })}
          </View>

          <View>
            <View>
              <Text
                style={{color: Theme.PRIMARY, fontSize: 16, fontWeight: '600'}}>
                Bill Details
              </Text>
            </View>
            <BillCard
              totalPrice={totalprice}
              numberOfProduct={numberOfProduct}
              discountPrice={discountPrice}
              savedPrice={savedPrice}
            />
          </View>

          <View style={{alignItems: 'center', marginTop: 8}}>
            <TouchableOpacity
              style={{
                width: '90%',
                backgroundColor: Theme.PRIMARY,
              }}
              onPress={() =>
                onPressPlaceOrder(
                  discountPrice + 40,
                  userData._id,
                  userData.name,
                  userData.phoneNo,
                  userData.email,
                  userData.userAdress,
                )
              }>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#fff',
                  padding: 6,
                  fontWeight: '600',
                  fontSize: 16,
                }}>
                Place Order ( &#8377; {discountPrice + 40} )
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text
              style={{
                color: 'green',
                fontSize: 14,
                fontWeight: '500',
                textAlign: 'center',
                marginTop: 5,
                marginBottom: 20,
              }}>
              Hurry You Save &#8377; {savedPrice}
            </Text>
          </View>
        </View>
      ) : (
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '30%',
          }}>
          <Image
            source={require('../assets/emptyCart.gif')}
            style={{
              width: 250,
              height: 250,
            }}
          />
          <TouchableOpacity onPress={() => navigation.navigate('home')}>
            <Text
              style={{fontSize: 22, fontWeight: '600', color: Theme.PRIMARY}}>
              <Fontiso name="shopping-bag-1" size={22} />
              &nbsp;Shop Now&nbsp;
              <MaterialCommunity name="arrow-right" size={22} />
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

export default Cart;
