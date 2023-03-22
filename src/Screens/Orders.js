import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import orderState from '../hooks/orderState';
import OrderCard from '../Components/Order/OrderCard';
import Loader1 from '../Components/commonComp/Loader1';
import Header from '../Components/Header';
import {useDispatch} from 'react-redux';
import {setOrderByID} from '../actions/product';
import {Theme} from '../Components/commonComp/Color';

const Orders = ({navigation}) => {
  const [orders, setOrders] = useState([]);
  const {getOrders, getOrderById} = orderState();
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const handelLoader = (load, msg) => {
    setLoader(load);
    setMessage(msg);
  };

  const fetchAllOrderLists = async () => {
    try {
      handelLoader(true, 'Cheking Orders...');
      const res = await getOrders();
      setOrders(res);
      console.log('result at getall orders --->', res);
      handelLoader(false, '');
    } catch (error) {
      handelLoader(false, '');

      console.log(error.message);
    }
  };

  const onPressCheckOrder = async orderId => {
    try {
      handelLoader(true, 'Redirecting to orders...');
      const res = await getOrderById(orderId);
      console.log(res);
      dispatch(setOrderByID(res));
      navigation.navigate('checkorder');
      handelLoader(false, '');
    } catch (error) {
      handelLoader(false, '');
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllOrderLists();
    //navigation.navigate('success');
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header title={'Orders'} press={() => navigation.navigate('account')} />
      {loader ? <Loader1 title={message} /> : <></>}
      <ScrollView>
        <View>
          {orders.length == 0 ? (
            <View
              style={{
                display: 'flex',
                marginTop: '50%',
                alignItems: 'center',
              }}>
              <Text
                style={{color: Theme.PRIMARY, fontSize: 18, fontWeight: '500'}}>
                Orders Not Found
              </Text>
            </View>
          ) : (
            orders
              .map(item => {
                console.log(item);
                return (
                  <TouchableOpacity onPress={() => onPressCheckOrder(item._id)}>
                    <OrderCard
                      orderStatus={item.orderStatus}
                      orderDeliveryDate={item.delivereAt}
                      orderNames={item.orderItems[0].productId.name.slice(
                        0,
                        25,
                      )}
                      productImage={item.orderItems[0].productId.images[0].url}
                      orderLength={item.orderItems}
                      paidMode={item.paidMode}
                      paymentId={item.payment_id}
                    />
                  </TouchableOpacity>
                );
              })
              .reverse()
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Orders;
