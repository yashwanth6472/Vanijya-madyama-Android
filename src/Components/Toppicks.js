import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Theme} from './commonComp/Color';
import {useDispatch, useSelector} from 'react-redux';
import {setAllProductReviews, setAllproducts} from '../actions/product';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {setProductById} from '../actions/product';
import productState from '../hooks/productState';
import Loader1 from './commonComp/Loader1';
const data = [
  {
    name: 'MI 80 cm (32 inches) 5A Series HD Ready Smart Android LED TV L32M7-5AIN (Black)',
    shortName: 'MI 80 cm (32 inches)',
    description:
      'Note : The brands, Mi and Xiaomi, are part of the same multinational conglomerate. Resolution : HD Ready (1366 x 768) Resolution | Refresh Rate : 60 Hertz | 178 Degree wide viewing angle. Connectivity: Dual Band Wi-Fi | 2 HDMI ports to connect latest gaming consoles, set top box, Blu-ray Players | 2 USB ports to connect hard drives and other USB devices | ALLM | ARC | Bluetooth 5.0 | Ethernet. Sound: 20 Watts Output | Dolby Audio, DTS Virtual: X, DTS-HD. Smart TV Features : Android TV 11 | PatchWall | IMDb Integration | Universal Search | 300+ Free Live Channels | Kids Mode with Parental lock | Smart Recommendations | Language Universe – 15+ Languages | User Centre | Okay Google | Chromecast suporting Apps : Netflix, Prime Video, Disney+ Hotstar | 5000+ apps from Play Store |Quad core Cortex A35 | Chromecast built-in | Ok Google | Auto Low Latency Mode | 1GB RAM + 8GB Storage',
    price: 13599,
    rating: 4.7,
    images: [
      {url: 'https://m.media-amazon.com/images/I/41PuxtGMdhL._UX679_.jpg'},
      {url: 'https://m.media-amazon.com/images/I/61-LihKQnOL._SL1280_.jpg'},
    ],
    avgRating: 4.7,
    category: 'TopPick',
    reviews: [],
  },
  {
    name: 'MI 80 cm (32 inches) 5A Series HD Ready Smart Android LED TV L32M7-5AIN (Black)',
    shortName: 'MI 80 cm (32 inches)',
    description:
      'Note : The brands, Mi and Xiaomi, are part of the same multinational conglomerate. Resolution : HD Ready (1366 x 768) Resolution | Refresh Rate : 60 Hertz | 178 Degree wide viewing angle. Connectivity: Dual Band Wi-Fi | 2 HDMI ports to connect latest gaming consoles, set top box, Blu-ray Players | 2 USB ports to connect hard drives and other USB devices | ALLM | ARC | Bluetooth 5.0 | Ethernet. Sound: 20 Watts Output | Dolby Audio, DTS Virtual: X, DTS-HD. Smart TV Features : Android TV 11 | PatchWall | IMDb Integration | Universal Search | 300+ Free Live Channels | Kids Mode with Parental lock | Smart Recommendations | Language Universe – 15+ Languages | User Centre | Okay Google | Chromecast suporting Apps : Netflix, Prime Video, Disney+ Hotstar | 5000+ apps from Play Store |Quad core Cortex A35 | Chromecast built-in | Ok Google | Auto Low Latency Mode | 1GB RAM + 8GB Storage',
    price: 13599,
    rating: 4.7,
    images: [
      {url: 'https://m.media-amazon.com/images/I/41PuxtGMdhL._UX679_.jpg'},
      {url: 'https://m.media-amazon.com/images/I/61-LihKQnOL._SL1280_.jpg'},
    ],
    avgRating: 4.7,
    category: 'TopPick',
    reviews: [],
  },
  {
    name: 'MI 80 cm (32 inches) 5A Series HD Ready Smart Android LED TV L32M7-5AIN (Black)',
    shortName: 'MI 80 cm (32 inches)',
    description:
      'Note : The brands, Mi and Xiaomi, are part of the same multinational conglomerate. Resolution : HD Ready (1366 x 768) Resolution | Refresh Rate : 60 Hertz | 178 Degree wide viewing angle. Connectivity: Dual Band Wi-Fi | 2 HDMI ports to connect latest gaming consoles, set top box, Blu-ray Players | 2 USB ports to connect hard drives and other USB devices | ALLM | ARC | Bluetooth 5.0 | Ethernet. Sound: 20 Watts Output | Dolby Audio, DTS Virtual: X, DTS-HD. Smart TV Features : Android TV 11 | PatchWall | IMDb Integration | Universal Search | 300+ Free Live Channels | Kids Mode with Parental lock | Smart Recommendations | Language Universe – 15+ Languages | User Centre | Okay Google | Chromecast suporting Apps : Netflix, Prime Video, Disney+ Hotstar | 5000+ apps from Play Store |Quad core Cortex A35 | Chromecast built-in | Ok Google | Auto Low Latency Mode | 1GB RAM + 8GB Storage',
    price: 13599,
    rating: 4.7,
    images: [
      {url: 'https://m.media-amazon.com/images/I/41PuxtGMdhL._UX679_.jpg'},
      {url: 'https://m.media-amazon.com/images/I/61-LihKQnOL._SL1280_.jpg'},
    ],
    avgRating: 4.7,
    category: 'TopPick',
    reviews: [],
  },
  {
    name: 'MI 80 cm (32 inches) 5A Series HD Ready Smart Android LED TV L32M7-5AIN (Black)',
    shortName: 'MI 80 cm (32 inches)',
    description:
      'Note : The brands, Mi and Xiaomi, are part of the same multinational conglomerate. Resolution : HD Ready (1366 x 768) Resolution | Refresh Rate : 60 Hertz | 178 Degree wide viewing angle. Connectivity: Dual Band Wi-Fi | 2 HDMI ports to connect latest gaming consoles, set top box, Blu-ray Players | 2 USB ports to connect hard drives and other USB devices | ALLM | ARC | Bluetooth 5.0 | Ethernet. Sound: 20 Watts Output | Dolby Audio, DTS Virtual: X, DTS-HD. Smart TV Features : Android TV 11 | PatchWall | IMDb Integration | Universal Search | 300+ Free Live Channels | Kids Mode with Parental lock | Smart Recommendations | Language Universe – 15+ Languages | User Centre | Okay Google | Chromecast suporting Apps : Netflix, Prime Video, Disney+ Hotstar | 5000+ apps from Play Store |Quad core Cortex A35 | Chromecast built-in | Ok Google | Auto Low Latency Mode | 1GB RAM + 8GB Storage',
    price: 13599,
    rating: 4.7,
    images: [
      {url: 'https://m.media-amazon.com/images/I/41PuxtGMdhL._UX679_.jpg'},
      {url: 'https://m.media-amazon.com/images/I/61-LihKQnOL._SL1280_.jpg'},
    ],
    avgRating: 4.7,
    category: 'TopPick',
    reviews: [],
  },
];

const Toppicks = ({navigation}) => {
  const {getProductById} = productState();
  const {allProductInfo} = useSelector(state => state.product);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const {productUsingId, getAllProductReviews} = useSelector(
    state => state.product,
  );

  const onPressItem = async itemId => {
    try {
      setLoader(true);
      const getRes = await getProductById(itemId);
      dispatch(setProductById(getRes.data.result));
      console.log('---->', productUsingId);
      // const getRes1 = await getProductReview(productId);
      // dispatch(setAllProductReviews())
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
  return (
    <>
      {loader ? (
        <Loader1 title={'HangOn while loading ..'} />
      ) : (
        <View>
          <View style={{backgroundColor: '#ff0e0e0e'}}>
            <View style={{backgroundColor: 'rgba(255,0,0,0.05)'}}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 18,
                  paddingVertical: 10,
                  fontWeight: '700',
                  color: Theme.PRIMARY,
                }}>
                - Top Pick -
              </Text>
            </View>
            <View
              style={{
                paddingHorizontal: 4,
                display: 'flex',
                flexDirection: 'row',
                marginBottom: 4,
                flexWrap: 'wrap',
                paddingVertical: 10,
                backgroundColor: '#ff0e0e0e',
                borderRadius: 10,
              }}>
              {allProductInfo.map(item => {
                if (item.category == 'TopPick') {
                  return (
                    <View style={styles.card}>
                      <View>
                        <TouchableOpacity
                          onPress={() => onPressItem(item._id)}
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Image
                            source={{uri: `${item.images[0].url}`}}
                            style={{
                              width: 130,
                              height: 130,
                              resizeMode: 'contain',
                            }}
                          />
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                        }}>
                        <Text style={styles.shortname}>
                          {item.shortName.slice(0, 15)}..
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: '700',
                            color: 'green',
                          }}>
                          <FontAwesome5Icon name="star" size={15} />
                          {item.rating}
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontSize: 16,
                          textAlign: 'center',
                          fontWeight: '700',
                          marginTop: 5,
                        }}>
                        &#x20B9;{item.price}
                      </Text>
                    </View>
                  );
                }
              })}
            </View>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '47%',
    backgroundColor: '#fff',
    elevation: 5,
    padding: 10,
    marginHorizontal: 4,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  shortname: {
    fontSize: 14,
    color: '#000',
  },
});

export default Toppicks;
