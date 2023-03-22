import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import {Theme} from '../commonComp/Color';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
const profileList = [
  {
    id: 1,
    title: 'Edit Profile',
    icon: 'update',
    link: '',
  },
  {
    id: 2,
    title: 'Cart',
    icon: 'cart-outline',
    link: 'cart',
  },
  {
    id: 3,
    title: 'Orders',
    icon: 'truck-cargo-container',
    link: 'order',
  },
  {
    id: 4,
    title: 'Favourite Products',
    icon: 'tag-heart-outline',
    link: '',
  },
  {
    id: 5,
    title: 'FAQ',
    icon: 'head-question-outline',
    link: '',
  },
  {
    id: 6,
    title: 'Start With Vanijya Madhyama',
    icon: 'store-plus-outline',
    link: '',
  },
  {
    id: 7,
    title: 'Help And Support',
    icon: 'face-agent',
    link: '',
  },
  {
    id: 8,
    title: 'Log Out',
    icon: 'logout',
    link: '',
  },
];

const ProfileLists = ({navigation}) => {
  const {userData} = useSelector(state => state.user);
  const onPressItem = (itemRoute, title) => {
    if (title == 'Log Out') {
      AsyncStorage.removeItem('token');
      navigation.navigate('home');

      return null;
    }
    navigation.navigate(itemRoute);
  };
  return (
    <View>
      {profileList.map(item => {
        return (
          <TouchableOpacity
            onPress={() => onPressItem(`${item.link}`, item.title)}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                paddingVertical: 5,
                marginTop: 5,
              }}>
              <Text style={{color: '#000', fontSize: 14, fontWeight: '500'}}>
                <MaterialCommunity
                  name={item.icon}
                  size={20}
                  color={Theme.PRIMARY}
                />
                &nbsp; {item.title}
              </Text>
              <AntDesign name="right" size={18} />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default ProfileLists;
