import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React from 'react';
import {Theme} from '../commonComp/Color';
import postAuth from '../../hooks/postAuth';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AutoHeightImage from 'react-native-auto-height-image';
import Toast from 'react-native-simple-toast';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import Loader1 from '../commonComp/Loader1';
const MediaAddPost = ({navigation}) => {
  const {
    imageUri,
    handlePicker,
    addPostForm,
    postAddPost,
    handelPostForm,
    imageLoader,
  } = postAuth();
  const [loader, setLoader] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoader(true);
      const res = await postAddPost();
      Toast.show(res.data.message, Toast.SHORT);
      navigation.navigate('mediaHome');
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log(error);
      Toast.show(error, Toast.LONG);
    }
  };
  const {width} = Dimensions.get('window');
  return (
    <ScrollView>
      <View style={{marginBottom: 100}}>
        {imageLoader ? <Loader1 title={'uploading image...'} /> : <></>}
        {imageUri == '' ? (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              backgroundColor: Theme.SLIDER_BACKGROUND,
              paddingVertical: 20,
              marginTop: 25,
            }}>
            <TouchableOpacity onPress={handlePicker}>
              <MaterialIcon name="add-photo-alternate" size={100} />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialIcon name="add-a-photo" size={100} />
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 15,
            }}>
            {/* <Image
          source={imageUri}
          style={{width: '100%', marginTop: 25}}
        /> */}
            <AutoHeightImage width={width - 15} source={imageUri} />
          </View>
        )}

        <View>
          <View style={{elevation: 5, backgroundColor: '#fff'}}>
            <TextInput
              multiline={true}
              numberOfLines={5}
              placeholder="caption"
              style={style.inputarea}
              autoCorrect={true}
              value={addPostForm.imgCaption.text}
              onChangeText={text => handelPostForm('imgCaption', text)}
            />
          </View>
          <View style={{elevation: 2, backgroundColor: '#fff'}}>
            <TextInput
              placeholder="Topic"
              style={[style.inputarea, {padding: 10}]}
              autoCorrect={true}
              value={addPostForm.imgTopic.text}
              onChangeText={text => handelPostForm('imgTopic', text)}
            />
          </View>
        </View>
        <View style={{width: '100%', marginTop: 15}}>
          <Button
            title={'Upload Post'}
            color={Theme.PRIMARY}
            onPress={handleSubmit}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  inputarea: {
    backgroundColor: Theme.SLIDER_BACKGROUND,
    paddingBottom: -20,
    marginTop: 15,
    borderRadius: 10,
  },
});

export default MediaAddPost;
