import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native';
import {StyleSheet} from 'react-native';
import {Theme} from '../commonComp/Color';
import AutoHeightImage from 'react-native-auto-height-image';
import postAuth from '../../hooks/postAuth';
import {Dimensions} from 'react-native';
import Loader1 from '../commonComp/Loader1';
import Toast from 'react-native-simple-toast';
import {useState} from 'react';
const MediaAdvertisePost = ({navigation}) => {
  const {
    handleAdPostForm,
    postAdvertisePost,
    addAdvertisePostForm,
    handlePicker,
    imageUri,
    imageLoader,
  } = postAuth();
  const [loader, setLoader] = useState(false);
  const pressToUpload = async () => {
    try {
      setLoader(true);
      const res = await postAdvertisePost();
      navigation.navigate('mediaHome');
      Toast.show('Ad Updated', Toast.SHORT);
      setLoader(false);
    } catch (error) {
      setLoader(false);

      console.log(error.message);
    }
  };
  const {width, height} = Dimensions.get('window');
  return (
    <ScrollView>
      {imageLoader || loader ? <Loader1 title={'Loading'} /> : <></>}
      <View style={{marginHorizontal: 10}}>
        <View style={{alignItems: 'center', marginTop: 20}}>
          <TouchableOpacity onPress={handlePicker}>
            {imageUri == '' ? (
              <Image
                source={require('../../assets/productSelect.png')}
                style={{width: 200, height: 200}}
              />
            ) : (
              <AutoHeightImage source={imageUri} width={width - 15} />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.inputFieldFrame}>
          <TextInput
            style={styles.inputField}
            placeholder="Brand Name"
            value={addAdvertisePostForm.adBrand.text}
            onChangeText={text => handleAdPostForm('adBrand', text)}
          />
        </View>

        <View style={styles.inputFieldFrame}>
          <TextInput
            style={styles.inputField}
            placeholder="Product Name"
            value={addAdvertisePostForm.adCaption.text}
            onChangeText={text => handleAdPostForm('adCaption', text)}
          />
        </View>

        <View style={styles.inputFieldFrame}>
          <TextInput
            style={styles.inputField}
            placeholder="Product Categorie"
            value={addAdvertisePostForm.adTopic.text}
            onChangeText={text => handleAdPostForm('adTopic', text)}
          />
        </View>

        <View style={styles.inputFieldFrame}>
          <TextInput
            style={styles.inputField}
            placeholder="Product ID"
            value={addAdvertisePostForm.adLink.text}
            onChangeText={text => handleAdPostForm('adLink', text)}
          />
          <Text>
            If you want to know your product ID, please check product
            description page
          </Text>
        </View>

        <View style={styles.inputFieldFrame}>
          <TextInput
            style={styles.inputField}
            placeholder="Actual Price"
            value={addAdvertisePostForm.adAcutalPrice.text}
            onChangeText={text => handleAdPostForm('adAcutalPrice', text)}
          />
        </View>

        <View style={styles.inputFieldFrame}>
          <TextInput
            style={styles.inputField}
            placeholder="Your Price"
            value={addAdvertisePostForm.adPrice.text}
            onChangeText={text => handleAdPostForm('adPrice', text)}
          />
          <Text style={{color: Theme.PRIMARY}}>
            *
            {(
              ((addAdvertisePostForm.adAcutalPrice.text -
                addAdvertisePostForm.adPrice.text) /
                addAdvertisePostForm.adAcutalPrice.text) *
              100
            ).toFixed()}
            % Discount
          </Text>
        </View>

        <View style={styles.inputFieldFrame}>
          <TextInput
            style={styles.inputField}
            placeholder="Product Description"
            value={addAdvertisePostForm.adDescription.text}
            onChangeText={text => handleAdPostForm('adDescription', text)}
          />
        </View>

        <View
          style={{
            marginBottom: 100,
            marginTop: 20,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity>
            <Image
              source={require('../../assets/logoSelect.png')}
              style={{width: 50, height: 50}}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: '80%',
              backgroundColor: Theme.PRIMARY,
              justifyContent: 'center',
            }}
            onPress={pressToUpload}>
            <Text
              style={{
                color: '#fff',
                fontSize: 14,
                fontWeight: '500',
                textAlign: 'center',
                height: 20,
              }}>
              Upload Ad Post
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  inputField: {
    borderBottomColor: Theme.SLIDER_BACKGROUND,
    borderBottomWidth: 2,
    marginTop: 5,
  },
});

export default MediaAdvertisePost;
