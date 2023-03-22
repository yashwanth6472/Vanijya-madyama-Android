import {View, Text} from 'react-native';
import React from 'react';
import {Orders} from '../Service/apiService';

const orderState = () => {
  const getOrders = async () => {
    try {
      const res = await Orders.fetchAllOrders();
      if (res.status != 200) {
        throw Error('res');
      }

      return res.data.result;
    } catch (error) {
      throw Error(error.message);
    }
  };

  const getOrderById = async data => {
    try {
      const res = await Orders.fetchOrderById(data);
      if (res.status != 200) {
        throw Error(res);
      }
      return res.data.result;
    } catch (error) {
      throw Error(error.message);
    }
  };
  return {
    getOrders: getOrders,
    getOrderById: getOrderById,
  };
};

export default orderState;
