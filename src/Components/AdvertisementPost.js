import {View, Text, Image, Dimensions, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Svg, Polygon} from 'react-native-svg';
import {Theme} from './commonComp/Color';
import AntDesign from 'react-native-vector-icons/AntDesign';
import OctoIcons from 'react-native-vector-icons/Octicons';
import {useDispatch} from 'react-redux';
import productState from '../hooks/productState';
import {setProductById} from '../actions/product';
import Toast from 'react-native-simple-toast';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {useEffect} from 'react';
const AdvertisementPost = ({
  adTopic,
  userInfo,
  adCaption,
  adDescription,
  imageUrl,
  productInfo,
  adBrand,
  adPrice,
  adAcutalPrice,
  navigation,
  likes,
  comments,
}) => {
  const {width} = Dimensions.get('window');
  const data = adDescription;
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const {getProductById} = productState();

  const onPressItem = async itemId => {
    try {
      setLoader(true);
      Toast.show('Redirecting Please Wait...', Toast.SHORT);
      const getRes = await getProductById(itemId);
      dispatch(setProductById(getRes.data.result));
      navigation.navigate('header', {
        screen: 'singleProduct',
        params: {item: itemId, type: ''},
      });
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log(error.message);
    }
  };
  const [textLength, setTextLength] = useState(false);
  return (
    <View style={{marginVertical: 3}}>
      <View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 15,
            backgroundColor: 'rgba(255,0,0,0.08)',
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginHorizontal: 8,
            }}>
            <View>
              <Text
                style={{
                  backgroundColor: Theme.PRIMARY,

                  color: '#fff',
                  fontSize: 20,
                  width: 45,
                  height: 45,
                  borderRadius: 50,
                  textAlign: 'center',
                  paddingTop: 8,
                  elevation: 5,
                }}>
                Y
              </Text>
            </View>
            <View style={{marginLeft: 5}}>
              <Text style={{fontSize: 16, color: '#000'}}>{userInfo.name}</Text>
              <Text style={{fontSize: 14}}>Advertisement • {adTopic}</Text>
            </View>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 20, paddingHorizontal: 5}}>
              <TouchableOpacity>
                <AntDesign
                  style={{marginHorizontal: 5}}
                  name="like2"
                  size={22}
                />
              </TouchableOpacity>

              {likes.length}
            </Text>
            <Text style={{fontSize: 20, paddingHorizontal: 5}}>
              <TouchableOpacity>
                <FontAwesome5Icon
                  style={{marginHorizontal: 5}}
                  name="comment-alt"
                  size={22}
                />
              </TouchableOpacity>

              {comments.length}
            </Text>
          </View>
        </View>
      </View>
      <View style={{width: '100%', backgroundColor: '#ff0e0e0e'}}>
        <Svg
          style={{
            backgroundColor: 'transparent',
            position: 'absolute',
            zIndex: 3,
          }}
          height="150"
          width={150}>
          <Polygon
            points="150 0, 0 0, 0 150"
            fill={Theme.PRIMARY}
            stroke={'#fff'}
            strokeWidth="2"
          />
          <View style={{marginTop: 30, marginLeft: 10}}>
            <Text style={{color: '#fff', fontSize: 24, fontWeight: '600'}}>
              &#x20B9;{adPrice}
            </Text>
            <Text
              style={{
                color: '#fff',
                fontSize: 20,
                fontWeight: '600',
                textDecorationLine: 'line-through',
              }}>
              &#x20B9;{adAcutalPrice}
            </Text>
          </View>
        </Svg>
        <View
          style={{
            width: '100%',
            height: 400,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View>
            {/* <Image
              source={require('../assets/adidas.png')}
              style={{
                width: 80,
                height: 55,
                position: 'absolute',
                left: '22%',
                marginTop: -20,
              }}
            /> */}
          </View>
          <Image
            source={{uri: imageUrl}}
            style={{
              resizeMode: 'contain',
              width: 300,
              height: 300,
              marginBottom: 10,
            }}
          />
          {/* <Image
            source={require('../assets/white.png')}
            style={{width: 200, height: 60}}
          /> */}
          <View style={{marginLeft: -80, marginTop: 10, width: 240}}>
            <Text style={{color: '#000', fontWeight: '500'}}>{adCaption}</Text>
          </View>
        </View>
        <Svg
          style={{
            backgroundColor: 'transparent',
            transform: [{rotate: '180deg'}],
            right: 0,
            position: 'absolute',
            bottom: 0,
          }}
          height="150"
          width={150}>
          <Polygon
            points="150 0, 0 0, 0 150"
            fill={Theme.PRIMARY}
            stroke={'#fff'}
            strokeWidth="2"
          />
          <View style={{marginTop: 30, marginRight: 75}}>
            <Text
              style={{
                color: '#fff',
                fontSize: 12,
                fontWeight: '400',
                transform: [{rotate: '180deg'}],
                textAlign: 'center',
              }}>
              discount
            </Text>
            <Text
              style={{
                color: '#fff',
                fontSize: 24,
                fontWeight: '600',
                transform: [{rotate: '180deg'}],
              }}>
              * {Math.round(((adAcutalPrice - adPrice) / adAcutalPrice) * 100)}%
            </Text>
          </View>
        </Svg>
      </View>
      <TouchableOpacity onPress={() => onPressItem(productInfo._id)}>
        <View
          style={{
            width: '100%',
            backgroundColor: Theme.PRIMARY,
            padding: 10,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{color: '#fff', fontWeight: '700', fontSize: 16}}>
            Check Product
          </Text>
          <AntDesign name="right" size={16} color="#fff" />
        </View>
      </TouchableOpacity>
      <View
        style={{
          backgroundColor: 'rgba(255,0,0,0.08)',
          padding: 10,
        }}>
        {textLength ? (
          <Text style={{color: '#000'}} onPress={() => setTextLength(false)}>
            {data}
          </Text>
        ) : (
          <Text style={{color: '#000'}} onPress={() => setTextLength(true)}>
            {data.slice(0, 80)} ...
          </Text>
        )}
      </View>
    </View>
  );
};

export default AdvertisementPost;
