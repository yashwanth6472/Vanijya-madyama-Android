import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import {categorieData} from '../Components/commonComp/staticData';

const Categorie = ({navigation}) => {
  return (
    <ScrollView>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '100%',
          flexWrap: 'wrap',
          backgroundColor: '#fff',
          height: '100%',
        }}>
        {categorieData.map(item => {
          return (
            <View
              style={{width: '49%', alignItems: 'center', marginTop: 10}}
              key={item.id}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('categoriePro', {productType: item.name})
                }>
                <Image
                  resizeMode="center"
                  source={item.image}
                  style={{width: 140, height: 140}}
                />
              </TouchableOpacity>

              <Text style={{fontSize: 16, fontWeight: '600', marginTop: -15}}>
                {item.name}
              </Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default Categorie;
