import {View, Text, ScrollView} from 'react-native';
import React, {useState} from 'react';
import Header from '../Components/Header';
import ProductCard from '../Components/ProductCard';
import {useSelector} from 'react-redux';
import productState from '../hooks/productState';
import Loader1 from '../Components/commonComp/Loader1';
const CategorieProducts = ({route, navigation}) => {
  const {productType} = route.params;
  const {onPressSpecificItem} = productState();
  const {allProductInfo} = useSelector(state => state.product);
  const newArr = allProductInfo.filter(item => item.category == productType);
  const [loader, setLoader] = useState(false);
  const onPressSpecificImage = async itemId => {
    try {
      setLoader(true);
      const res = await onPressSpecificItem(itemId, navigation, productType);
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log(error.message);
    }
  };
  return (
    <View>
      <Header title={'Categorie'} />
      {loader ? (
        <Loader1 title={'HangOn while Loading..'} />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}>
            {newArr.map(item => {
              return (
                <View>
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
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default CategorieProducts;
