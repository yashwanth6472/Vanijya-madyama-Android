import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Theme} from '../commonComp/Color';

const BillCard = ({totalPrice, discountPrice, savedPrice, numberOfProduct}) => {
  return (
    <View style={{marginHorizontal: 20, marginVertical: 10}}>
      <View style={styles.subTotal}>
        <Text style={styles.subTotalText}>Price({numberOfProduct})</Text>
        <Text style={styles.subTotalText}>&#8377; {totalPrice}</Text>
      </View>
      <View style={styles.subTotal}>
        <Text style={[styles.subTotalText, {color: 'green'}]}>Discount</Text>
        <Text style={[styles.subTotalText, {color: 'green'}]}>
          -&nbsp;&#8377; {savedPrice}
        </Text>
      </View>
      <View style={styles.subTotal}>
        <Text style={styles.subTotalText}>Delivery Charges</Text>
        <Text style={styles.subTotalText}>&#8377; 40</Text>
      </View>
      <View style={styles.total}>
        <Text style={styles.totalText}>Total Amount</Text>
        <Text style={styles.totalText}>&#8377; {discountPrice + 40}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  subTotal: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    borderColor: '#eee',
    borderBottomWidth: 1,
    paddingBottom: 4,
  },
  subTotalText: {
    color: '#000',
    fontWeight: '400',
  },
  total: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalText: {
    fontSize: 16,
    fontWeight: '500',
    color: Theme.SUB_TEXT,
  },
});

export default BillCard;
