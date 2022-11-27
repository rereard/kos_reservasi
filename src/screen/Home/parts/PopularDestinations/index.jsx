import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import CardDestinations from '../../../../component/molecules/CardDestinations';

export default function PopularDestinations() {
  return (
    <View>
      <Text>Popular Destinations</Text>
      <ScrollView
        horizontal={true}
        style={{flexDirection: 'row', marginVertical: 10}}>
        <CardDestinations
          uri={
            'https://res.klook.com/image/upload/fl_lossy.progressive,w_800,c_fill,q_85/destination/nm3w9yv9tvofc4oncbsd.jpg'
          }
        />
        <CardDestinations
          uri={
            'https://res.klook.com/image/upload/fl_lossy.progressive,w_800,c_fill,q_85/destination/nm3w9yv9tvofc4oncbsd.jpg'
          }
        />
        <CardDestinations
          uri={
            'https://res.klook.com/image/upload/fl_lossy.progressive,w_800,c_fill,q_85/destination/nm3w9yv9tvofc4oncbsd.jpg'
          }
        />
        <CardDestinations
          uri={
            'https://res.klook.com/image/upload/fl_lossy.progressive,w_800,c_fill,q_85/destination/nm3w9yv9tvofc4oncbsd.jpg'
          }
        />
      </ScrollView>
    </View>
  );
}
