import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Booking,
  DetailHotel,
  Favorite,
  Home,
  Profile,
  SearchResult,
  Setting,
  Sign,
} from '../screen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#e75874',
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
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Ionicons name="person-circle-sharp" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Ionicons name="settings" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
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
        name="Sign"
        component={Sign}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
