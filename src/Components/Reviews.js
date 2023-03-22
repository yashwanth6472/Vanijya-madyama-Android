import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {otherButton} from './Style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Theme} from './commonComp/Color';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import productState from '../hooks/productState';
import Toast from 'react-native-simple-toast';
import {useDispatch, useSelector} from 'react-redux';
import {setAllProductReviews} from '../actions/product';
const data1 = [
  {label: '⭐ 1', value: 1},
  {label: '⭐ 2', value: 2},
  {label: '⭐ 3', value: 3},
  {label: '⭐ 4', value: 4},
  {label: '⭐ 5', value: 5},
];

// const data = [
//   {
//     image: require('../assets/person.jpg'),
//     name: 'jhon doei',
//     rating: 4.6,
//     description:
//       'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available',
//   },
//   {
//     image: require('../assets/person.jpg'),
//     name: 'jhon doei',
//     rating: 4.6,
//     description:
//       'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available',
//   },
//   {
//     image: require('../assets/person.jpg'),
//     name: 'jhon doei',
//     rating: 4.6,
//     description:
//       'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available',
//   },
//   {
//     image: require('../assets/person.jpg'),
//     name: 'jhon doei',
//     rating: 4.6,
//     description:
//       'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available',
//   },
// ];

const Reviews = ({productId}) => {
  const [value, setValue] = useState(0);
  const [isFocus, setIsFocus] = useState(false);
  const {postReviewComment, handleCommentInput, getProductReview, commentForm} =
    productState();
  const dispatch = useDispatch();
  const {getAllProductReviews} = useSelector(state => state.product);

  const fetchAllReviews = async () => {
    try {
      const getRes = await getProductReview(productId);
      dispatch(setAllProductReviews(getRes.data.result));
      console.log('---------------------fjhejf-->', getAllProductReviews);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchAllReviews();
  }, []);

  useEffect(() => {
    handleCommentInput('rating', value);
  }, [value]);
  const [loading, setLoading] = useState(false);
  const onClickSubmit = async () => {
    try {
      setLoading(true);
      const getRes = await postReviewComment(productId);
      console.log(getRes);
      fetchAllReviews();
      Toast.show(getRes.data.message, Toast.LONG);
      handleCommentInput('comment', '');
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <View style={{marginHorizontal: 10}}>
      <View>
        <Text
          style={{
            marginTop: 20,
            fontSize: 24,
            fontWeight: '500',
            textDecorationLine: 'underline',
          }}>
          Reviews ({getAllProductReviews.length})
        </Text>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: 20,
        }}>
        <FontAwesome5Icon name="star" size={35} style={{marginTop: 5}} />
        <Text style={{fontSize: 40}}>4.6</Text>
      </View>
      <View style={{marginVertical: 20}}>
        <TextInput
          placeholder="Write your opinion about product.."
          style={styles.reviewInput}
          multiline={true}
          maxLength={200}
          value={commentForm.comment.text}
          onChangeText={text => handleCommentInput('comment', text)}
        />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '95%',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <View style={styles.container}>
            <Dropdown
              style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={data1}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Rate here' : '...'}
              searchPlaceholder="Search..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setValue(item.value);
                setIsFocus(false);
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon}
                  color={isFocus ? Theme.PRIMARY : 'black'}
                  name="Safety"
                  size={20}
                />
              )}
            />
          </View>

          <View>
            <TouchableOpacity onPress={onClickSubmit}>
              <Text
                style={{
                  fontSize: 16,
                  backgroundColor: Theme.PRIMARY,
                  width: 90,
                  color: Theme.BUTTON_TEXT,
                  padding: 8,
                  paddingHorizontal: 8,
                  borderRadius: 5,
                  elevation: 5,
                  height: 45,
                  alignItems: 'center',
                }}>
                submit &nbsp;
                <Ionicons name="send" size={16} />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View>
        {getAllProductReviews.map(item => {
          return (
            <View style={styles.reviewCard}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  style={styles.reviewCardImage}
                  source={{uri: item.user.image}}
                />
                <View>
                  <Text
                    style={{fontSize: 18, marginLeft: 10, fontWeight: '800'}}>
                    {item.user.name}
                  </Text>
                  <Text
                    style={{fontSize: 14, marginLeft: 10, fontWeight: '600'}}>
                    <FontAwesome5Icon name="star" size={14} />
                    &nbsp;{item.rating}
                  </Text>
                </View>
              </View>
              <View style={styles.reviewCardContent}>
                <Text
                  style={{
                    fontSize: 14,
                    marginVertical: 5,
                    fontWeight: '500',
                    lineHeight: 20,
                  }}>
                  {item.comment}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewCardImage: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
    borderRadius: 50,
  },
  reviewCard: {
    marginVertical: 20,
    backgroundColor: '#fff',
    elevation: 5,
    padding: 8,
    borderRadius: 5,
  },
  reviewInput: {
    width: '95%',
    borderWidth: 0.5,
    borderColor: '#aaa',
    resizeMode: 'contain',
    backgroundColor: '#fff',
    elevation: 3,
  },
  container: {
    backgroundColor: 'white',
    padding: 0,
    width: '60%',
    elevation: 2,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default Reviews;
