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
  KosDetail,
  MapRoom,
  SearchKos,
  DaftarKamar,
  KamarDetail,
  Konfirmasi,
  TambahKos,
  Transaksi,
  InvoiceTransaksi
} from '../screen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import { colors } from '../utils';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const MainApp = () => {
  const user = useSelector(state => state.login.user);
  if(user?.tipeAkun === 1){
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: colors.darkBlue,
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
  } else{
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: colors.darkBlue,
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
          name="Tambah Kos"
          component={TambahKos}
          options={{
            headerShown: false,
            tabBarIcon: ({color, size}) => (
              <Ionicons name="home-outline" color={color} size={size} />
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
  }
  
};

const Router = () => {
  const user = useSelector(state => state.login.user);
  const isOnApp = useSelector(state => state.onApp.isOnApp)

  return (
    <Stack.Navigator initialRouteName="Splash">
      {!isOnApp && (
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
      )}
      {!user ? (
        <>
          <Stack.Screen
            name="Sign"
            component={Sign}
            options={{headerShown: false}}
          />
        </>
      ) : (
        <>
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
            name="KosDetail"
            component={KosDetail}
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
          <Stack.Screen
            name="MapRoom"
            component={MapRoom}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SearchKos"
            component={SearchKos}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="DaftarKamar"
            component={DaftarKamar}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="KamarDetail"
            component={KamarDetail}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Konfirmasi"
            component={Konfirmasi}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Transaksi"
            component={Transaksi}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="InvoiceTransaksi"
            component={InvoiceTransaksi}
            options={{headerShown: false}}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default Router;
