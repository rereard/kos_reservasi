import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import CardDestinations from '../../../../component/molecules/CardDestinations';

export default function TopDestinations() {
  return (
    <View>
      <Text>Top Destinations</Text>
      <ScrollView
        horizontal={true}
        style={{flexDirection: 'row', marginVertical: 10}}>
        <CardDestinations
          uri={
            'https://t3.ftcdn.net/jpg/02/96/18/08/360_F_296180851_r4Mijn7ba8YK2VnWTWAE5XUzIEwlQJ17.jpg'
          }
        />
        <CardDestinations
          uri={
            'https://t3.ftcdn.net/jpg/02/96/18/08/360_F_296180851_r4Mijn7ba8YK2VnWTWAE5XUzIEwlQJ17.jpg'
          }
        />
        <CardDestinations
          uri={
            'https://t3.ftcdn.net/jpg/02/96/18/08/360_F_296180851_r4Mijn7ba8YK2VnWTWAE5XUzIEwlQJ17.jpg'
          }
        />
        <CardDestinations
          uri={
            'https://t3.ftcdn.net/jpg/02/96/18/08/360_F_296180851_r4Mijn7ba8YK2VnWTWAE5XUzIEwlQJ17.jpg'
          }
        />
        <CardDestinations
          uri={
            'https://t3.ftcdn.net/jpg/02/96/18/08/360_F_296180851_r4Mijn7ba8YK2VnWTWAE5XUzIEwlQJ17.jpg'
          }
        />
      </ScrollView>
    </View>
  );
}
