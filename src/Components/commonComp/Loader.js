import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';

const Loader = () => {
  return (
    <View>
      <Image
        source={require('../../assets/load.gif')}
        width={10}
        height={10}
        style={{
          width: 55,
          height: 55,
          marginTop: '50%',
        }}
      />
    </View>
  );
};

export default Loader;
