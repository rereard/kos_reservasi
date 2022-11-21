import axios from 'axios';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
} from 'react-native';
import {useEffect, useState} from 'react';
export default function SearchScreen() {
  useEffect(() => {
    axios
      .get('https://hotels4.p.rapidapi.com/properties/get-hotel-photos', {
        params: {
          id: '1178275040',
        },
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
          'X-RapidAPI-Host': 'hotels4.p.rapidapi.com',
        },
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  console.log(process.env.REACT_APP_URL);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home and Search</Text>
    </View>
  );
}
