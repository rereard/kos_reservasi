import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import CardDestinations from '../../../../component/molecules/CardDestinations';

export default function TopDestinations({onPress, navigation}) {
  const data = [
    {
      title: 'Jakarta',
      City: 'Jakarta',
      image:
        'https://www.dentons.com/-/media/images/website/background-images/offices/jakarta/jakarta-office.ashx?sc_lang=en',
    },
    {
      title: 'Bandung',
      City: 'Bandung',
      image:
        'https://res.klook.com/image/upload/Mobile/City/dkjlntyqcbcqwqlbmaf8.jpg',
    },
    {
      title: 'Bogor',
      City: 'Bogor',
      image:
        'https://cdn-asset.jawapos.com/wp-content/uploads/2022/10/gunung-mas-560x390.jpg',
    },
    {
      title: 'Bali',
      City: 'Bali',
      image: 'https://media.timeout.com/images/105240189/image.jpg',
    },
  ];

  const date = new Date();
  return (
    <View>
      <Text>Top Destinations</Text>
      <ScrollView
        horizontal={true}
        style={{flexDirection: 'row', marginVertical: 10}}>
        {data?.map(item => (
          <CardDestinations uri={item.image} title={item.title} />
        ))}
      </ScrollView>
    </View>
  );
}
