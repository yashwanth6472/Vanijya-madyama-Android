import {View, Text, Touchable, TouchableOpacity} from 'react-native';
import React from 'react';
import {Theme} from './commonComp/Color';
import OctIcons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
const MediaHeaderComp = ({pressOnButton, pressOnAddButton}) => {
  return (
    <View
      style={{
        backgroundColor: Theme.PRIMARY,
        width: '100%',
        height: 70,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <TouchableOpacity onPress={pressOnAddButton}>
        <OctIcons
          name="diff-added"
          size={28}
          style={{color: '#fff', paddingHorizontal: 20}}
        />
      </TouchableOpacity>

      <Text style={{color: '#fff', fontSize: 16, fontWeight: '500'}}>
        Vanijya Madhyama
      </Text>
      <TouchableOpacity>
        <AntDesign
          name="message1"
          size={28}
          style={{color: '#fff', paddingHorizontal: 20}}
          onPress={pressOnButton}
        />
      </TouchableOpacity>
    </View>
  );
};

export default MediaHeaderComp;
