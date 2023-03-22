import {View, Text} from 'react-native';
import React from 'react';
import MediaHeaderComp from '../Components/MediaHeaderComp';
import {ScrollView, RefreshControl} from 'react-native';
import postAuth from '../hooks/postAuth';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setAllAdPosts} from '../actions/post';
import {useState} from 'react';
import AdvertisementPost from '../Components/AdvertisementPost';
const Advertise = ({navigation}) => {
  const {getAllAdPosts} = postAuth();
  const dispatch = useDispatch();
  const {allAdPosts} = useSelector(state => state.post);
  const [refreshing, setRefreshing] = useState(false);

  const [loader, setLoader] = useState(false);
  const fetchAdvertisementPosts = async () => {
    try {
      setLoader(true);
      const res = await getAllAdPosts();
      dispatch(setAllAdPosts(res.data.result));
      console.log('----------------------------pa', allAdPosts);
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchAdvertisementPosts();
  }, []);
  const onHandleRefresh = () => {
    fetchAdvertisementPosts();
  };
  return (
    <View>
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
        {allAdPosts
          .map(item => {
            console.log('000000000000009999999990', item);
            return (
              <AdvertisementPost
                adTopic={item.adTopic}
                userInfo={item.user}
                adCaption={item.adCaption}
                adDescription={item.adDescription}
                imageUrl={item.image}
                productInfo={item.adLink}
                adBrand={item.adBrand}
                adPrice={item.adPrice}
                adAcutalPrice={item.adAcutalPrice}
                navigation={navigation}
                likes={item.likes}
                comments={item.comment}
              />
            );
          })
          .reverse()}
        <View style={{height: 70}}></View>
      </ScrollView>
    </View>
  );
};

export default Advertise;
