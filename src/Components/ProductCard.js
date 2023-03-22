import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const ProductCard = ({
  productImage,
  productName,
  productRating,
  productPrice,
  pressOnImage,
}) => {
  return (
    <View
      style={{
        // display: 'flex',
        // flexDirection: 'row',
        // flexWrap: 'wrap',
        // justifyContent: 'center',
        marginHorizontal: 2,
        marginVertical: 10,
      }}>
      <View
        style={{
          width: 170,
          marginHorizontal: 2,
          marginVertical: 5,
          elevation: 5,
          backgroundColor: '#fff',
          borderRadius: 5,
        }}>
        <TouchableOpacity
          onPress={pressOnImage}
          style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={{uri: productImage}}
            style={{
              width: 150,
              height: 150,
              justifyContent: 'center',
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginVertical: 10,
          }}>
          <Text style={{fontSize: 14, color: '#000'}}>{productName}</Text>
          <Text>
            <FontAwesome5Icon
              name="star"
              size={18}
              style={{fontSize: 14, fontWeight: '700', color: 'green'}}
            />
            {productRating}{' '}
          </Text>
        </View>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 16,
            textAlign: 'center',
            fontWeight: '700',
            marginTop: 5,
            paddingBottom: 10,
          }}>
          &#x20B9;{productPrice}
        </Text>
      </View>
    </View>
  );
};

export default ProductCard;
