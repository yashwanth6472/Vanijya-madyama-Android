import {View, Text} from 'react-native';
import React from 'react';
import Login from './src/Screens/Login';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Signup from './src/Screens/Signup';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './src/Screens/Home';
import Account from './src/Screens/Account';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Cart from './src/Screens/Cart';
import Orders from './src/Screens/Orders';
import {Theme} from './src/Components/commonComp/Color';
import Categorie from './src/Screens/Categorie';
import Entrance from './src/Screens/Entrance';
import ReduxThunk from 'redux-thunk';
import {applyMiddleware, configureStore} from '@reduxjs/toolkit';
import {productReducer} from './src/Reducers/product';
import {Provider} from 'react-redux';
import SingleProduct from './src/Screens/SingleProduct';
import Media from './src/Screens/Media';
import SimpleLine from 'react-native-vector-icons/Foundation';
import CategorieProducts from './src/Screens/CategorieProducts';
import Message from './src/Screens/Message';
import AddPost from './src/Screens/AddPost';
import {userReducer} from './src/Reducers/user';
import {postReducer} from './src/Reducers/post';
import Advertise from './src/Screens/Advertise';
import SuccessPayment from './src/Screens/SuccessPayment';
import CheckOrders from './src/Screens/CheckOrders';
import CommentPost from './src/Screens/CommentPost';
const store = configureStore(
  {
    reducer: {
      user: userReducer,
      product: productReducer,
      post: postReducer,
    },
  },
  applyMiddleware(ReduxThunk),
);

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Provider store={store}>
      <Stack.Navigator initialRouteName="home">
        <Stack.Screen
          name="home"
          component={Home}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </Provider>
  );
};

const AccountStack = () => {
  return (
    <Stack.Navigator initialRouteName="account">
      <Stack.Screen name="account" component={Account} />
    </Stack.Navigator>
  );
};

// const CartStack = () => {
//   return (
//     <Stack.Navigator initialRouteName="cart">
//       <Stack.Screen
//         name="cart"
//         component={Cart}
//         options={{headerShown: false}}
//       />
//     </Stack.Navigator>
//   );
// };

const AdvertiseStack = () => {
  return (
    <Stack.Navigator initialRouteName="advertise">
      <Stack.Screen
        name="advertise"
        component={Advertise}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const CategorieStack = () => {
  return (
    <Stack.Navigator initialRouteName="categorie">
      <Stack.Screen name="categorie" component={Categorie} />
      <Stack.Screen
        name="categoriePro"
        component={CategorieProducts}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const MediaStack = () => {
  return (
    <Stack.Navigator initialRouteName="mediaHome">
      <Stack.Screen
        name="mediaHome"
        component={Media}
        options={{headerShown: false}}
      />
      <Stack.Screen name="message1" component={Message} />
      <Stack.Screen
        name="addPost"
        component={AddPost}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="commentPost"
        component={CommentPost}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const MainStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="home"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          let iconName = '';

          if (route.name == 'home') {
            iconName = focused ? (
              <MaterialCommunityIcon
                name="home"
                size={28}
                color={Theme.PRIMARY}
              />
            ) : (
              <MaterialCommunityIcon name="home" size={28} color={'#aaa'} />
            );
          } else if (route.name == 'advertise') {
            iconName = focused ? (
              <MaterialCommunityIcon
                name="tag-multiple"
                size={28}
                color={Theme.PRIMARY}
              />
            ) : (
              <MaterialCommunityIcon
                name="tag-multiple"
                size={28}
                color={'#aaa'}
              />
            );
          } else if (route.name == 'account') {
            iconName = focused ? (
              <MaterialCommunityIcon
                name="account-box"
                size={28}
                color={Theme.PRIMARY}
              />
            ) : (
              <MaterialCommunityIcon
                name="account-box"
                size={28}
                color={'#aaa'}
              />
            );
          } else if (route.name == 'categorie') {
            iconName = focused ? (
              <MaterialIcon name="category" size={28} color={Theme.PRIMARY} />
            ) : (
              <MaterialIcon name="category" size={28} color={'#aaa'} />
            );
          } else if (route.name == 'mediaHome') {
            iconName = focused ? (
              <SimpleLine name="social-500px" size={28} color={Theme.PRIMARY} />
            ) : (
              <SimpleLine name="social-500px" size={28} color={'#aaa'} />
            );
          }
          return iconName;
        },
        tabBarShowLabel: false,
      })}>
      <Tab.Screen
        name="home"
        component={HomeStack}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="categorie"
        component={CategorieStack}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="mediaHome"
        component={MediaStack}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="advertise"
        component={AdvertiseStack}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="account"
        component={AccountStack}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="login">
      <Stack.Screen
        name="login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="signup"
        component={Signup}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const HeaderStack = () => {
  return (
    <Stack.Navigator initialRouteName="singleProduct">
      <Stack.Screen
        name="singleProduct"
        component={SingleProduct}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="entrance">
          <Stack.Screen
            name="entrance"
            component={Entrance}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Main"
            component={MainStack}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Auth"
            component={AuthStack}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="header"
            component={HeaderStack}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="cart"
            component={Cart}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="success"
            component={SuccessPayment}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="order"
            component={Orders}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="checkorder"
            component={CheckOrders}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
