import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import productState from '../hooks/productState';
import ProductCard from './ProductCard';
const SportSlider = ({navigation}) => {
  const {allProductInfo} = useSelector(state => state.product);
  const newArr = allProductInfo.filter(item => item.category == 'Sports');
  const {onPressSpecificItem} = productState();
  const onPressSpecificImage = async itemId => {
    try {
      const res = await onPressSpecificItem(itemId, navigation, 'Sports');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={{backgroundColor: '#ff0e0e0e', marginTop: 8}}>
      <Text
        style={{
          fontSize: 16,
          marginHorizontal: 14,
          fontWeight: '700',
          marginTop: 8,
          textAlign: 'center',
        }}>
        - Sports -
      </Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {newArr.map((item, index) => {
          return (
            <View key={index}>
              <ProductCard
                productImage={item.images[0].url}
                productName={item.shortName}
                productPrice={item.price}
                productRating={item.rating}
                pressOnImage={() => onPressSpecificImage(item._id)}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default SportSlider;
