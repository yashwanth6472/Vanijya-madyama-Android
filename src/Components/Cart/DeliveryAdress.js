import {View, Text} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

const DeliveryAdress = () => {
  const {userData} = useSelector(state => state.user);
  const userAdress = userData.userAdress;
  return (
    <View style={{marginLeft: 10}}>
      <Text style={{fontSize: 16, color: '#000', fontWeight: '400'}}>
        {userAdress.adress},
      </Text>
      <Text style={{fontSize: 14, color: '#000', fontWeight: '400'}}>
        {userAdress.city}, {userAdress.state},
      </Text>
      <Text style={{fontSize: 14, color: '#000', fontWeight: '400'}}>
        {userAdress.country} - {userAdress.pincode}
      </Text>
    </View>
  );
};

export default DeliveryAdress;
