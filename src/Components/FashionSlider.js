import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import ProductCard from './ProductCard';
import productState from '../hooks/productState';
const FashionSlider = ({navigation}) => {
  const {allProductInfo} = useSelector(state => state.product);
  const newArr = allProductInfo.filter(item => item.category == 'Fashion');
  console.log(newArr);
  const {onPressSpecificItem} = productState();
  const onPressImageItem = async itemId => {
    try {
      const getres = await onPressSpecificItem(itemId, navigation, 'Fashion');
      console.log(getres);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <View style={{backgroundColor: '#ff0e0e0e', marginVertical: 8}}>
      <Text
        style={{
          fontSize: 16,
          marginHorizontal: 14,
          fontWeight: '700',
          marginTop: 8,
          textAlign: 'center',
        }}>
        - Fashion -
      </Text>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          {newArr.map(item => {
            return (
              <View>
                <ProductCard
                  productImage={item.images[0].url}
                  productName={item.shortName}
                  productPrice={item.price}
                  productRating={item.rating}
                  pressOnImage={() => onPressImageItem(item._id)}
                />
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default FashionSlider;
