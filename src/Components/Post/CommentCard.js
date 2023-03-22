import {View, Text, Image} from 'react-native';
import React from 'react';

const CommentCard = () => {
  return (
    <View
      style={{
        justifyContent: 'center',
        paddingHorizontal: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 2,
        paddingVertical: 10,
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 5,
        }}>
        <Image
          source={require('../../assets/person.jpg')}
          style={{width: 80, height: 80, borderRadius: 50}}
        />
        <Text
          style={{
            fontSize: 16,
            color: '#000',
            fontWeight: '500',
            marginLeft: 10,
          }}>
          Yashwanth
        </Text>
      </View>
      <View>
        <Text
          style={{
            color: '#000',
            fontSize: 14,
            lineHeight: 19,
          }}
          selectable={true}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum
        </Text>
      </View>
    </View>
  );
};

export default CommentCard;
