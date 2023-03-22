import {View, Text, ScrollView, Image, RefreshControl} from 'react-native';
import React, {useEffect, useState} from 'react';
import MediaHeaderComp from '../Components/MediaHeaderComp';
import PostComponent from '../Components/PostComponent';
import {useDispatch, useSelector} from 'react-redux';
import postAuth from '../hooks/postAuth';
import {setAllAdPosts, setAllPosts} from '../actions/post';
import {Theme} from '../Components/commonComp/Color';
import AntDesign from 'react-native-vector-icons/AntDesign';
const Media = ({navigation}) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const {allPosts, allAdPosts} = useSelector(state => state.post);
  const {getAllPosts, getAllAdPosts} = postAuth();
  const fetchMediaPosts = async () => {
    try {
      setLoader(true);
      const res = await getAllPosts();
      dispatch(setAllPosts(res.data.result));
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchMediaPosts();
  }, []);

  const onHandleRefresh = () => {
    fetchMediaPosts();
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <MediaHeaderComp
        pressOnButton={() => navigation.navigate('message1')}
        pressOnAddButton={() => navigation.navigate('addPost')}
      />

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={loader ? true : false}
            onRefresh={onHandleRefresh}
          />
        }>
        {/* {loader ? (
          <Image
            source={require('../assets/load3.gif')}
            style={{
              width: 60,
              height: 60,
              alignSelf: 'center',
              marginTop: 20,
            }}
          />
        ) : (
          <></>
        )} */}
        <View style={{marginHorizontal: 5, marginTop: loader ? 100 : 0}}>
          <View>
            {allPosts
              .map(item => {
                return (
                  <PostComponent
                    info={item}
                    userInitial={item.user.name[0]}
                    userName={item.user.name}
                    imageTopic={item.imgTopic}
                    imageUrl={item.image}
                    imageDescritpion={item.imgCaption}
                    imageLikes={item.likes}
                    imageComments={item.comment}
                    imageBookMark={item.bookmark}
                    imageId={item._id}
                    navigation={navigation}
                  />
                );
              })
              .reverse()}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Media;
