import {
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Button,
  Clipbo,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-simple-toast';
import React, {useEffect, useRef, useState} from 'react';
import productState from '../hooks/productState';
import {useDispatch, useSelector} from 'react-redux';
import AutoHeightImage from 'react-native-auto-height-image';
import {setOrderList, setProductById} from '../actions/product';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import Loader1 from '../Components/commonComp/Loader1';
import Loader from '../Components/commonComp/Loader';
import {Theme} from '../Components/commonComp/Color';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import HomeMiniSlider from '../Components/commonComp/HomeMiniSlider';
import {singleProductSlideData} from '../Components/commonComp/staticData';
import Reviews from '../Components/Reviews';
import Header from '../Components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Clipboard from '@react-native-community/clipboard';
import postAuth from '../hooks/postAuth';
const {width, height} = Dimensions.get('window');

const SingleProduct = ({route, navigation}) => {
  const dispatch = useDispatch();
  const {item, type} = route.params;

  // const {getProductById} = productState();
  const listData = ['S', 'M', 'L', 'XL', 'XXL'];
  const {productUsingId, orderList} = useSelector(state => state.product);
  const {userData} = useSelector(state => state.user);
  const productDescription = productUsingId.description.split('|');

  const {width, height} = Dimensions.get('window');
  const [index, setIndex] = useState(0);
  const SLIDER_WIDTH = Dimensions.get('window').width;
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [size, setSize] = useState(null);

  const isCarousel = useRef(null);

  const handelAddToCart = async (productId, val) => {
    // try {
    //   if (value == null) {
    //     throw Error('please select Quantity');
    //   }
    //   //orderList.push({productId: productId, quantity: val, size: size});
    //   dispatch(setOrderList({productId: productId, quantity: val, size: size}));
    //   //Toast.show('Product added to cart', Toast.LONG);
    //   console.log(i);
    // } catch (error) {
    //   //oast.show(error, Toast.LONG);
    //   console.log(error);
    // }

    try {
      if (value == null) {
        throw Error('please select Quantity');
      }
      dispatch(setOrderList({productId: productId, quantity: val, size: size}));
      Toast.show('Product added to cart, Please Check Your Cart', Toast.LONG);
      console.log('--------->', orderList);
    } catch (error) {
      Toast.show(error.message, Toast.LONG);
    }
  };

  const renderImages = ({item}) => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ff0e0e0e',
        }}>
        <Image
          source={{uri: item.url}}
          style={{
            width: width - 20,
            height: 400,
            borderRadius: 10,
            resizeMode: 'contain',
          }}
        />
      </View>
    );
  };

  const data = [
    {label: '1', value: '1'},
    {label: '2', value: '2'},
    {label: '3', value: '3'},
    {label: '4', value: '4'},
    {label: '5', value: '5'},
    {label: '6', value: '6'},
    {label: '7', value: '7'},
    {label: '8', value: '8'},
  ];

  return (
    <ScrollView>
      <Header
        title={'Product'}
        press={() => navigation.goBack()}
        cart={true}
        cartPress={() => navigation.navigate('cart')}
      />
      <View style={{backgroundColor: '#fff', marginHorizontal: 8}}>
        <View
          style={{
            backgroundColor: Theme.SLIDER_BACKGROUND,
            paddingTop: 10,
            marginLeft: -8,
          }}>
          <Carousel
            ref={isCarousel}
            data={productUsingId.images}
            renderItem={renderImages}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={width}
            onSnapToItem={index => setIndex(index)}
          />
          <Pagination
            dotsLength={productUsingId.images.length}
            activeDotIndex={index}
            dotStyle={{
              width: 7,
              height: 7,
              borderRadius: 10,
              backgroundColor: 'red',
              marginTop: -5,
            }}
          />
        </View>
        <View style={{marginHorizontal: 8}}>
          <View>
            {productUsingId.user._id == userData._id ? (
              <TouchableOpacity
                onPress={() => {
                  Clipboard.setString(item);
                  Toast.show(`Product Id Copied ${item}`, Toast.SHORT);
                }}>
                <Text
                  style={{
                    color: '#fff',
                    backgroundColor: Theme.PRIMARY,
                    width: 130,
                    padding: 5,
                    marginTop: 10,
                    marginBottom: -10,
                    borderRadius: 10,
                    textAlign: 'center',
                  }}>
                  click here Copy ID
                </Text>
              </TouchableOpacity>
            ) : (
              <></>
            )}
            <Text style={styles.mainName}>{productUsingId.name}</Text>
            <Text style={styles.cost}>
              &#x20B9;
              {productUsingId.price}
              &nbsp;|&nbsp;
              <Text
                style={{
                  textDecorationStyle: 'dashed',
                  textDecorationLine: 'line-through',
                  fontSize: 16,
                }}>
                &#x20B9;{productUsingId.price + productUsingId.price * 0.1}
              </Text>
            </Text>
            <Text style={styles.ratings}>
              <FontAwesome5Icon name="star" size={16} /> {productUsingId.rating}{' '}
              |{' '}
              <Text style={{fontSize: 14}}>
                ({productUsingId.reviews.length} Reviews)
              </Text>
            </Text>
          </View>
          {/* <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
              backgroundColor: '#fff',
            }}> */}
          {type == 'Fashion' || type == 'Sports' ? (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginVertical: 10,
              }}>
              {listData.map(item => {
                return (
                  <TouchableOpacity
                    style={{
                      borderColor: size == item ? 'grey' : Theme.PRIMARY,
                      borderWidth: 1,
                      marginHorizontal: 10,
                      paddingVertical: 5,
                      paddingHorizontal: 8,
                      borderRadius: 5,
                    }}
                    onPress={() => setSize(item)}>
                    {size == item ? (
                      <Text style={{color: 'grey'}}>{item}</Text>
                    ) : (
                      <Text style={{color: Theme.PRIMARY}}>{item}</Text>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : (
            <></>
          )}
          <View
            style={{
              justifyContent: 'space-around',
              alignItems: 'center',
              marginTop: 10,
              display: 'flex',
              flexDirection: 'row',
            }}>
            <View style={{width: '40%'}}>
              <Dropdown
                style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select quantity' : '...'}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setValue(item.value);
                  setIsFocus(false);
                }}
                // renderLeftIcon={() => (
                //   <AntDesign
                //     style={styles.icon}
                //     color={isFocus ? 'blue' : 'black'}
                //     name="Safety"
                //     size={20}
                //   />
                // )}
              />
            </View>
            <View style={{width: '45%'}}>
              <Button
                title={'Add To Cart'}
                color={Theme.PRIMARY}
                onPress={() => handelAddToCart(productUsingId, value)}
              />
            </View>
          </View>
          {/* </TouchableOpacity> */}
          <View style={styles.description}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '700',
                marginBottom: 10,
                marginTop: 0,
                color: '#000',
              }}>
              Description
            </Text>
            <View
              style={{
                fontSize: 14,
                fontWeight: '400',
                lineHeight: 20,
                flexWrap: 'wrap',
              }}>
              {productDescription.map(item => {
                return (
                  <>
                    <Text
                      style={{
                        flexWrap: 'wrap',
                        width: '98%',
                        color: '#000',
                        marginTop: 5,
                      }}>
                      •&nbsp;{item}
                    </Text>
                  </>
                );
              })}
            </View>
          </View>

          <View style={styles.seller}>
            <Text
              style={{
                fontSize: 16,
                backgroundColor: 'green',
                width: 80,
                textAlign: 'center',
                color: '#fff',
                padding: 4,
                borderRadius: 10,
              }}>
              Seller
            </Text>
            <Text style={{fontSize: 18, marginLeft: 15, fontWeight: '700'}}>
              {productUsingId.user.name == null
                ? 'Anonymous'
                : productUsingId.user.name}
            </Text>
          </View>
        </View>

        <View style={{marginTop: 20}}>
          <HomeMiniSlider data={singleProductSlideData} />
        </View>
        <View className="productImages">
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            {productUsingId.images.map(item => {
              return (
                <AutoHeightImage
                  width={width - 20}
                  source={{uri: item.url}}
                  style={{marginVertical: 8}}
                />
              );
            })}
          </View>
        </View>
        <View>
          <Reviews productId={item} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainName: {
    fontSize: 18,
    color: Theme.SUB_TEXT,
    fontWeight: '700',
    marginTop: 15,
  },
  cost: {
    fontSize: 20,
    color: 'green',
    fontWeight: '700',
    marginTop: 24,
  },
  ratings: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
  },
  description: {marginVertical: 20},
  stock: {},
  seller: {
    marginTop: 20,
  },
  cartButton: {
    width: '90%',
    backgroundColor: Theme.PRIMARY,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    elevation: 5,
  },
  productImages: {
    // display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});

export default SingleProduct;
