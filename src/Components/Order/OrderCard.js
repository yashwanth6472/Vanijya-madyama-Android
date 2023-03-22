import {View, Text} from 'react-native';
import React from 'react';
import {Image} from 'react-native';

const OrderCard = ({
  productImage,
  orderNames,
  orderStatus,
  orderDeliveryDate,
  orderLength,
  paidMode,
}) => {
  let todayDate = new Date();
  todayDate = todayDate.toDateString();

  let deliveryDate = new Date(orderDeliveryDate);
  deliveryDate = deliveryDate.toDateString();
  console.log(deliveryDate, todayDate);
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderBottomColor: '#eee',
        paddingVertical: 25,
        paddingHorizontal: 20,
      }}>
      <View>
        {/* <Image source={{uri: productImage}} style={{width: 90, height: 90}} /> */}

        {orderLength.length > 1 ? (
          <View>
            <Image
              source={{uri: productImage}}
              style={{
                width: 60,
                height: 60,
                resizeMode: 'contain',
                marginHorizontal: 15,
              }}
            />
            <Text
              style={{
                color: 'green',
                fontWeight: '500',
                marginTop: 5,
                textAlign: 'center',
              }}>
              & + {orderLength.length - 1} more
            </Text>
          </View>
        ) : (
          <Image
            source={{uri: productImage}}
            style={{width: 90, height: 90, resizeMode: 'contain'}}
          />
        )}
      </View>
      <View style={{marginLeft: 10, justifyContent: 'center'}}>
        <View>
          <Text style={{fontSize: 16, color: '#000'}}>{orderNames} ....</Text>
        </View>

        <View
          style={{
            display: 'flex',
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}>
            <Text style={{color: '#000', fontWeight: '400', marginTop: 5}}>
              status : <Text style={{color: 'green'}}>confirmed</Text>{' '}
            </Text>

            <Text style={{color: '#000', fontWeight: '400', marginTop: 5}}>
              | mode : <Text style={{color: 'green'}}>{paidMode}</Text>{' '}
            </Text>
          </View>
          <Text style={{marginTop: 15, color: '#000'}}>
            Delivery At: {deliveryDate}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default OrderCard;
