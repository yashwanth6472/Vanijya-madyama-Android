import {View, Text} from 'react-native';
import React from 'react';
import {Image} from 'react-native';

const CheckItemCard = ({
  productName,
  productQua,
  ProductPrice,
  productSize,
  productImage,
}) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingVertical: 10,
        borderBottomColor: '#eee',
        borderBottomWidth: 2,
      }}>
      <View style={{width: 100}}>
        <Image
          source={{uri: productImage}}
          style={{width: 90, height: 90, resizeMode: 'contain'}}
        />
      </View>
      <View style={{justifyContent: 'center'}}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '400',
            color: '#000',
            marginVertical: 2,
          }}>
          {productName}...
        </Text>
        {productSize != null ? (
          <Text style={{color: '#000', marginVertical: 2, fontSize: 14}}>
            {productSize}
          </Text>
        ) : (
          <></>
        )}
        <Text style={{color: '#000', marginVertical: 2, fontSize: 14}}>
          {productQua} quantity
        </Text>
        <Text
          style={{
            color: '#000',
            marginVertical: 2,
            fontSize: 14,
            fontWeight: '500',
          }}>
          &#8377; {ProductPrice}
        </Text>
      </View>
    </View>
  );
};

export default CheckItemCard;
