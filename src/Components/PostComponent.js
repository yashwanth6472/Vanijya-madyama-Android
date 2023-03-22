import {View, Text, Image, Dimensions, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import OctoIcons from 'react-native-vector-icons/Octicons';
import {Theme} from './commonComp/Color';
const {width, height} = Dimensions.get('window');
import AutoHeightImage from 'react-native-auto-height-image';
import postAuth from '../hooks/postAuth';
const PostComponent = ({
  userInitial,
  userName,
  imageTopic,
  imageDescritpion,
  imageUrl,
  info,
  imageLikes,
  imageComments,
  imageBookMark,
  imageId,
  navigation,
}) => {
  const [textLength, setTextLength] = useState(false);
  const data = imageDescritpion ? imageDescritpion : ' ';
  const timeToString = new Date(info.time);
  const {putLikesPost, putRemoveLikePost} = postAuth();
  const [likeStatus, setLikeStatus] = useState(false);
  const onPressLike = async () => {
    // try {
    //   setLikeStatus(!likeStatus);
    //   if (likeStatus) {
    //     const res = await putLikesPost(imageId);
    //     console.log('like', res);
    //   } else {
    //     const res = await putRemoveLikePost(imageId);
    //     console.log('dislike', res);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };
  return (
    <View
      style={{
        backgroundColor: '#ff0e0e0e',
        paddingVertical: 15,
        marginVertical: 3,
      }}>
      <View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginHorizontal: 10,
            }}>
            <View>
              <Text
                style={{
                  backgroundColor: Theme.PRIMARY,

                  color: '#fff',
                  fontSize: 20,
                  width: 45,
                  height: 45,
                  borderRadius: 50,
                  textAlign: 'center',
                  paddingTop: 8,
                  elevation: 5,
                }}>
                {userInitial}
              </Text>
            </View>
            <View style={{marginLeft: 5}}>
              <Text style={{fontSize: 16, color: '#000'}}>{userName}</Text>
              <Text style={{fontSize: 14}}>{imageTopic}</Text>
            </View>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={onPressLike}>
              <Text style={{marginHorizontal: 5, fontSize: 18}}>
                <AntDesign name="like2" size={25} />
                &nbsp;{imageLikes.length}&nbsp;
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('commentPost', {id: imageId})}>
              <Text style={{marginHorizontal: 5, fontSize: 18}}>
                <OctoIcons name="comment" size={25} />
                &nbsp;{imageComments.length}
              </Text>
            </TouchableOpacity>

            {/* <OctoIcons style={{marginHorizontal: 5}} name="share" size={25} /> */}
          </View>
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <AutoHeightImage width={width - 15} source={{uri: imageUrl}} />
          {/* <Image
            source={{uri: imageUrl}}
            style={{
              width: width - 15,
              elevation: 5,
              height: 250,
              resizeMode: 'contain',
            }}
          /> */}
        </View>
      </View>
      <View style={{marginTop: 10, marginHorizontal: 10}}>
        {textLength ? (
          <Text style={{color: '#000'}} onPress={() => setTextLength(false)}>
            {data}
          </Text>
        ) : (
          <Text style={{color: '#000'}} onPress={() => setTextLength(true)}>
            {data.slice(0, 80)} ...
          </Text>
        )}
      </View>

      {/* --------------------------------------------------------------------------- */}
      <View style={{alignItems: 'flex-end', marginRight: 20}}>
        <Text style={{color: Theme.PRIMARY, opacity: 0.7, fontSize: 12}}>
          {timeToString.toUTCString().slice(5, 16)}
        </Text>
      </View>
    </View>
  );
};

export default PostComponent;
