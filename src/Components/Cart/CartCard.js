import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {Theme} from '../commonComp/Color';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';

const CartCard = ({
  productName,
  productRating,
  productPrice,
  quantity,
  size,
  productImage,
  productReviewLength,
  press,
  removeProduct,
}) => {
  return (
    <View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          borderColor: '#ddd',
          borderTopWidth: 1,
          borderBottomWidth: 1,
        }}>
        <View style={styles.leftSide}>
          <TouchableOpacity onPress={press}>
            <Image
              source={{uri: productImage}}
              style={{width: 80, height: 80, resizeMode: 'contain'}}
            />
          </TouchableOpacity>
          <Text style={styles.qunatity}>quantity: {quantity}</Text>
        </View>
        <View style={styles.rightSide}>
          <Text style={styles.productName}>{productName}...</Text>
          {size == null ? (
            <></>
          ) : (
            <Text style={{fontSize: 12, color: '#000'}}>{size}</Text>
          )}
          <Text style={styles.rating}>
            <FontAwesome5Icon name="star" size={14} /> {productRating} | (
            {productReviewLength})
          </Text>
          <Text style={styles.price}> &#8377; {productPrice}</Text>
          <TouchableOpacity onPress={removeProduct}>
            <Text
              style={{color: Theme.PRIMARY, marginTop: 5, fontWeight: '600'}}>
              <MaterialCommunity name="delete-outline" size={16} />
              Remove
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  rightSide: {paddingTop: 10},
  leftSide: {padding: 10},
  productName: {
    fontSize: 18,
    fontWeight: '400',

    color: '#000',
  },
  rating: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000',
    marginTop: 3,
  },
  price: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginTop: 3,
  },
  deliveryPrice: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000',
    marginTop: 3,
  },
  qunatity: {
    textAlign: 'center',
    marginTop: 3,
    color: '#000',
    fontWeight: '400',
  },
});
export default CartCard;
