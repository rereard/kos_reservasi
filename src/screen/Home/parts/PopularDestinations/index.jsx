import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import CardDestinations from '../../../../component/molecules/CardDestinations';
import { colors } from '../../../../utils';

export default function PopularDestinations() {
  const data = [
    {
      title: 'Ubud',
      City: 'Bali',
      image:
        'https://theworldtravelguy.com/wp-content/uploads/2021/03/DSCF0040_3x4.jpg',
    },
    {
      title: 'Kuta Beach',
      City: 'Lombok',
      image:
        'http://balipancatour.com/wp-content/uploads/2012/01/kuta-beach-bali.jpg',
    },
    {
      title: 'The Palace of Yogyakarta',
      City: 'Yogyakarta',
      image:
        'https://idetrips.com/wp-content/uploads/2018/06/java-culture-600x451.jpg',
    },
    {
      title: 'Tugu',
      City: 'Yogyakarta',
      image:
        'https://media.suara.com/pictures/653x366/2019/10/14/14093-tugu-pal-putih-atau-tugu-yogyakarta-suaraeleonora-pew.jpg',
    },
  ];

  return (
    <View>
      <Text style={{ color: colors.darkBlue, fontSize: 16, fontWeight: "600" }}>Popular Destinations</Text>
      <ScrollView
        horizontal={true}
        style={{flexDirection: 'row', marginVertical: 10}}>
        {data?.map((item, index) => (
          <CardDestinations key={index} uri={item.image} title={item.title} />
        ))}
      </ScrollView>
    </View>
  );
}
