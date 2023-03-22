import {View, Text, TextInput, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import {Dimensions} from 'react-native';
import {Theme} from '../Components/commonComp/Color';
import {TouchableOpacity} from 'react-native';
import CommentCard from '../Components/Post/CommentCard';
import Header from '../Components/Header';
import {ScrollView} from 'react-native';
import postAuth from '../hooks/postAuth';
import {useDispatch, useSelector} from 'react-redux';
import {setPostComment} from '../actions/post';
import Toast from 'react-native-simple-toast';
import Loader1 from '../Components/commonComp/Loader1';
const CommentPost = ({route, navigation}) => {
  const {
    putCommentPost,
    handleCommentPostForm,
    commentPostForm,
    getAllPostComments,
  } = postAuth();
  const {postComments} = useSelector(state => state.post);
  const {width, height} = Dimensions.get('window');
  const {id} = route.params;
  const dispatch = useDispatch();

  const onPressCommentSend = async () => {
    try {
      setLoader(true, 'Uploading...');
      const res = putCommentPost(id);
      console.log('=======------->', res);
      Toast.show('Comment Uploaded', Toast.LONG);
      fetchAllComments();
      setLoader(false);
    } catch (error) {
      setLoader(false);

      console.log(error.message);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <Header title={'Comments'} press={() => navigation.goBack()} />
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignSelf: 'center',
          backgroundColor: '#fff',
          zIndex: 1,
          paddingBottom: 10,
          paddingTop: 10,
          elevation: 5,
        }}>
        <TextInput
          placeholder="comment here"
          style={[
            styles.textField,
            {
              width: width,
              paddingEnd: 50,
            },
          ]}
          multiline={true}
          value={commentPostForm.content.text}
          onChangeText={text => handleCommentPostForm('content', text)}
        />
        <TouchableOpacity onPress={onPressCommentSend}>
          <MaterialCommunity
            name="send"
            size={30}
            style={{
              position: 'absolute',
              right: 10,
              bottom: 10,
              justifyContent: 'center',
            }}
            color={Theme.PRIMARY}
          />
        </TouchableOpacity>
      </View>
      <View style={{paddingHorizontal: 10, marginBottom: 130, paddingTop: 10}}>
        <ScrollView>
          <CommentCard />
          <CommentCard />
          <CommentCard />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textField: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 2,
    borderRadius: 10,
    borderBottomStartRadius: 10,
  },
});

export default CommentPost;
