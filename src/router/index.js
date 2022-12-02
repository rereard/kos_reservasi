import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Booking,
  DetailHotel,
  Favorite,
  GetStarted,
  Home,
  SearchResult,
  Sign,
  Splash,
  Invoice,
  Receipt,
  Profile,
  Review,
  Rooms,
  DetailRoom,
} from '../screen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../utils';
import {useSelector} from 'react-redux';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#0364CE',
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={Favorite}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Ionicons name="heart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Receipt"
        component={Receipt}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Ionicons name="receipt" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Ionicons name="person-circle-sharp" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Router = () => {
  const user = useSelector(state => state.login.user);

  return (
    <Stack.Navigator initialRouteName="Splash">
      {!user && (
        <>
          <Stack.Screen
            name="GetStarted"
            component={GetStarted}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Sign"
            component={Sign}
            options={{headerShown: false}}
          />
        </>
      )}
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="main"
        component={MainApp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Booking"
        component={Booking}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailHotel"
        component={DetailHotel}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SearchResult"
        component={SearchResult}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Review"
        component={Review}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Rooms"
        component={Rooms}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailRoom"
        component={DetailRoom}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Invoice"
        component={Invoice}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
