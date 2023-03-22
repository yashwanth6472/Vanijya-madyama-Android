import {View, Text, TouchableOpacity, Touchable} from 'react-native';
import React from 'react';
import {Theme} from './commonComp/Color';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {connect, useSelector} from 'react-redux';
import IconBadge from 'react-native-icon-badge';
const Header = ({title, press, cart, cartPress}) => {
  const {orderList} = useSelector(state => state.product);
  console.log(orderList.length);
  return (
    <View
      style={{
        backgroundColor: Theme.PRIMARY,
        height: 60,
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 15,
        paddingHorizontal: 20,
      }}>
      <View>
        <Text
          style={{
            color: '#fff',
            fontSize: 18,
            fontWeight: '600',
          }}>
          <FontAwesome5Icon name="arrow-left" size={18} onPress={press} />{' '}
          &nbsp; {title}
        </Text>
      </View>

      {cart ? (
        <TouchableOpacity onPress={cartPress}>
          <View style={{marginRight: 5}}>
            <FontAwesome5Icon name="shopping-cart" size={20} color={'#fff'} />
            {orderList.length == 0 ? (
              <></>
            ) : (
              <View
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 100,
                  position: 'absolute',
                  top: -10,
                  left: 18,
                  width: 20,
                  height: 20,
                }}>
                <Text
                  style={{
                    color: Theme.PRIMARY,
                    textAlign: 'center',
                    fontWeight: '700',
                  }}>
                  {orderList.length}
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </View>
  );
};

export default Header;
