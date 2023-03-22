import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import AutoHeightImage from 'react-native-auto-height-image';
import {Theme} from '../Components/commonComp/Color';
import Feather from 'react-native-vector-icons/FontAwesome';
const SuccessPayment = ({route, navigation}) => {
  const {width} = Dimensions.get('window');
  const {savedPrice} = route.params;
  return (
    <View
      style={{
        backgroundColor: Theme.PRIMARY,
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
      }}>
      <AutoHeightImage
        source={require('../assets/paymentDone.gif')}
        width={width}
      />
      <TouchableOpacity onPress={() => navigation.navigate('order')}>
        <Text
          style={{
            marginTop: 40,
            color: '#fff',
            fontWeight: '700',
            fontSize: 16,
            backgroundColor: Theme.PRIMARY,
            padding: 10,
            letterSpacing: 1,
          }}>
          Check Orders&nbsp;&nbsp;
          <Feather name="chevron-right" size={16} />
        </Text>
      </TouchableOpacity>
      <Text style={{color: '#fff', fontSize: 16, fontWeight: '500'}}>
        Hurry!, You saved &#8377;{savedPrice} on this order
      </Text>
    </View>
  );
};

export default SuccessPayment;
