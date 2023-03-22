import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React from 'react';
import {Theme} from '../Components/commonComp/Color';
import {useState} from 'react';
import axios from 'axios';
import MediaAddPost from '../Components/Media/MediaAddPost';
import MediaAdvertisePost from '../Components/Media/MediaAdvertisePost';
import postAuth from '../hooks/postAuth';
const AddPost = ({navigation}) => {
  const [optionButton, setOptionButton] = useState('post');
  const {imageUri, handlePicker} = postAuth();

  return (
    <View style={{backgroundColor: '#fff', flex: 1, paddingHorizontal: 5}}>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'row',
          marginTop: 25,
          paddingBottom: 10,
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: optionButton == 'post' ? Theme.PRIMARY : '#fff',
            borderRadius: 50,
          }}
          onPress={() => setOptionButton('post')}>
          <Text
            style={[
              styles.optionButtonText,
              {color: optionButton == 'post' ? '#fff' : '#000'},
            ]}>
            Post
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor:
              optionButton == 'advertisement' ? Theme.PRIMARY : '#fff',
            borderRadius: 50,
          }}
          onPress={() => setOptionButton('advertisement')}>
          <Text
            style={[
              styles.optionButtonText,
              {color: optionButton == 'advertisement' ? '#fff' : '#000'},
            ]}>
            Advertisement
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        {optionButton == 'post' ? (
          <MediaAddPost navigation={navigation} />
        ) : (
          <MediaAdvertisePost navigation={navigation} />
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  optionButtonText: {
    color: '#000',
    fontSize: 16,
    marginHorizontal: 8,
    padding: 7,
  },
});
export default AddPost;
