import {View, Text, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import orderState from '../hooks/orderState';
import Header from '../Components/Header';
import {useSelector} from 'react-redux';
import DeliveryAdress from '../Components/Cart/DeliveryAdress';
import {Theme} from '../Components/commonComp/Color';
import CheckItemCard from '../Components/Order/CheckItemCard';
import BillCard from '../Components/Cart/BillCard';
const CheckOrders = ({navigation}) => {
  const {orderById} = useSelector(state => state.product);
  //  totalPrice = {totalprice};
  //  numberOfProduct = {numberOfProduct};
  //  discountPrice = {discountPrice};
  //  savedPrice = {savedPrice};

  let prices = orderById.orderItems.map(item => item.productId.price);
  const totalPrice = prices.reduce((a, b) => a + b, 0);
  let discountPrice = totalPrice - totalPrice * 0.1 + 40;
  let savedPrice = (totalPrice * 0.1).toFixed(1);

  let todayDate = new Date();
  todayDate = todayDate.toDateString();

  let deliveryDate = new Date(orderById.delivereAt);
  deliveryDate = deliveryDate.toDateString();

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <Header title={`Items (${orderById.orderItems.length})`} />
      <View style={{paddingHorizontal: 10}}>
        <View
          style={{
            marginVertical: 10,
            borderBottomColor: '#eee',
            borderBottomWidth: 2,
            paddingBottom: 10,
          }}>
          <Text style={{color: Theme.PRIMARY, fontSize: 14, fontWeight: '500'}}>
            Delivery Adress:
          </Text>
          <DeliveryAdress />
        </View>
        <View>
          <Text
            style={{
              color: 'green',
              fontSize: 16,
              fontWeight: '500',
              marginVertical: 5,
            }}>
            {deliveryDate < todayDate ? (
              <Text>Hurry, Product Delivered at {deliveryDate}</Text>
            ) : (
              <Text>Arrived at {deliveryDate}</Text>
            )}
          </Text>
        </View>
        <View>
          {orderById.orderItems.map((item, index) => {
            console.log(item);
            return (
              <View key={index}>
                <CheckItemCard
                  productName={item.productId.shortName.slice(0, 28)}
                  ProductPrice={item.productId.price}
                  productQua={item.quantity}
                  productSize={item.size}
                  productImage={item.productId.images[0].url}
                />
              </View>
            );
          })}
        </View>
        <View>
          <Text
            style={{
              color: Theme.PRIMARY,
              fontSize: 14,
              fontWeight: '500',
              marginVertical: 10,
            }}>
            Price Details
          </Text>
          <BillCard
            totalPrice={totalPrice}
            numberOfProduct={prices.length}
            discountPrice={discountPrice}
            savedPrice={savedPrice}
          />
        </View>
        <Text style={{color: '#000', fontWeight: '500', marginTop: 10}}>
          Payment Mode:{' '}
          <Text style={{color: Theme.PRIMARY}}>{orderById.paidMode}</Text>
        </Text>
      </View>
    </ScrollView>
  );
};

export default CheckOrders;
