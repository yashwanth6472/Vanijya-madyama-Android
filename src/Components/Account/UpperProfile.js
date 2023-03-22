import {View, Text, Image} from 'react-native';
import React from 'react';
import {Theme} from '../commonComp/Color';
import {useSelector} from 'react-redux';
const UpperProfile = () => {
  const {userData} = useSelector(state => state.user);
  console.log(userData);
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 40,
      }}>
      <Image
        source={{uri: userData.image}}
        style={{width: 120, height: 120, borderRadius: 100}}
      />

      <View style={{paddingTop: 30}}>
        <View>
          <Text
            style={{color: '#000', fontSize: 24, flexWrap: 'wrap', width: 200}}>
            {userData.name}
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignContent: 'center',
          }}>
          <Text style={{color: '#000', fontSize: 16}}>Connections</Text>
          <Text
            style={{
              color: Theme.PRIMARY,
              fontSize: 16,
              paddingLeft: 15,
            }}>
            {userData.connections.length}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default UpperProfile;
