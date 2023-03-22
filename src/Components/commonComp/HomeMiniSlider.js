import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {Theme} from './Color';

const HomeMiniSlider = ({data}) => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      horizontal={true}
      style={{paddingVertical: 20, paddingHorizontal: 0}}>
      {data.map(item => {
        const {id, title, color, name} = item;
        return (
          <View style={{marginHorizontal: 15}}>
            <FontAwesome
              style={{
                backgroundColor: Theme.SLIDER_BACKGROUND,
                padding: 12,
                borderRadius: 50,
                textAlign: 'center',
              }}
              name={`${title}`}
              size={25}
              color={`${color}`}
            />
            <Text
              style={{
                textAlign: 'center',
                fontWeight: '600',
                fontSize: 12,
                marginTop: 5,
                color: 'rgba(0,0,0,0.6)',
              }}>
              {name}
            </Text>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default HomeMiniSlider;
