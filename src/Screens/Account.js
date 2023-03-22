import {View, Text} from 'react-native';
import React from 'react';
import UpperProfile from '../Components/Account/UpperProfile';
import ProfileLists from '../Components/Account/ProfileLists';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
const Account = ({navigation}) => {
  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <UpperProfile />
      <View>
        <View style={{marginTop: 40}}>
          <Text
            style={{
              fontSize: 18,
              color: '#000',
              paddingHorizontal: 10,
              marginBottom: 10,
            }}>
            <MaterialCommunity name="account-settings-outline" size={20} />
            Account Settings
          </Text>
        </View>
        <ProfileLists navigation={navigation} />
      </View>
    </View>
  );
};

export default Account;
