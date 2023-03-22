import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import React from 'react';
import {Theme} from './Color';

const Loader1 = ({title}) => {
  const {width, height} = Dimensions.get('window');
  return (
    <View
      style={{
        position: 'absolute',
        width: width,
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={styles.loaderBG}>
        <Image
          style={styles.loadImage}
          source={require('../../assets/load1.gif')}
        />
        <Text style={styles.loadText}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loadImage: {
    width: 100,
    height: 100,
  },
  loaderBG: {
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 10,
    zIndex: 3,
    paddingVertical: 18,
    paddingHorizontal: 30,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadText: {
    color: Theme.SUB_TEXT,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default Loader1;
