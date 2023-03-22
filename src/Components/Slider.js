import {View, Text, Dimensions, Image} from 'react-native';
import React, {useRef, useState} from 'react';
import Carousel, {Pagination} from 'react-native-snap-carousel';
const carouselData = [
  {
    id: 1,
    image: require('../assets/ban2.jpg'),
  },
  {
    id: 2,
    image: require('../assets/ban1.jpg'),
  },

  {
    id: 3,
    image: require('../assets/ban3.jpg'),
  },

  {
    id: 3,
    image: require('../assets/ban4.webp'),
  },
];
const Slider = () => {
  const {width, height} = Dimensions.get('window');

  const isCarousel = useRef(null);
  const SLIDER_WIDTH = Dimensions.get('window').width;
  const [index, setIndex] = useState(0);

  const renderImages = ({item}) => {
    return (
      <View>
        <Image
          source={item.image}
          style={{
            width: width,
            height: 170,
            resizeMode: 'cover',
          }}
        />
      </View>
    );
  };
  return (
    <View style={{marginTop: 1}}>
      <View style={{backgroundColor: '#eee'}}>
        <Carousel
          ref={isCarousel}
          data={carouselData}
          renderItem={renderImages}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={width}
          onSnapToItem={index => setIndex(index)}
          autoplay={true}
          autoplayInterval={8000}
        />
        {/* <Pagination
          dotsLength={carouselData.length}
          activeDotIndex={index}
          dotStyle={{
            width: 7,
            height: 7,
            borderRadius: 10,
            backgroundColor: 'red',
            marginTop: -5,
          }}
        /> */}
      </View>
    </View>
  );
};

export default Slider;
