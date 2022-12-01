import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import React from 'react';
import {Header} from '../../component/molecules';
import {colors} from '../../utils';
import {Button} from '../../component/atoms';

export default function DetailRoom({route, navigation}) {
  const {name_room, price, bed_type, image} = route.params;

  console.log('price', price);
  console.log('image', image);
  return (
    <SafeAreaView style={styles.page}>
      <View style={{padding: 20}}>
        <Header
          title={name_room}
          color={colors.darkBlue}
          onPress={() => navigation.goBack()}
        />
      </View>
      <ScrollView>
        <Image
          source={{
            uri: 'https://bogordaily.net/wp-content/uploads/2022/09/hotel-ideal-trip.jpg',
          }}
          style={styles.image}
        />
        <View style={styles.roomDescription}>
          <Text style={styles.nameRoom}>{name_room}</Text>
        </View>
        <View>
          <Text>Photos</Text>
          <ScrollView horizontal={true}>
            <Image
              source={{
                uri: 'https://bogordaily.net/wp-content/uploads/2022/09/hotel-ideal-trip.jpg',
              }}
              style={{width: 100, height: 100}}
            />
            <Image
              source={{
                uri: 'https://bogordaily.net/wp-content/uploads/2022/09/hotel-ideal-trip.jpg',
              }}
              style={{width: 100, height: 100}}
            />
            <Image
              source={{
                uri: 'https://bogordaily.net/wp-content/uploads/2022/09/hotel-ideal-trip.jpg',
              }}
              style={{width: 100, height: 100}}
            />
            <Image
              source={{
                uri: 'https://bogordaily.net/wp-content/uploads/2022/09/hotel-ideal-trip.jpg',
              }}
              style={{width: 100, height: 100}}
            />
            <Image
              source={{
                uri: 'https://bogordaily.net/wp-content/uploads/2022/09/hotel-ideal-trip.jpg',
              }}
              style={{width: 100, height: 100}}
            />
            <Image
              source={{
                uri: 'https://bogordaily.net/wp-content/uploads/2022/09/hotel-ideal-trip.jpg',
              }}
              style={{width: 100, height: 100}}
            />
          </ScrollView>
        </View>
      </ScrollView>
      <View style={styles.SelectRoom}>
        <View>
          <Text
            style={{
              color: colors.yellow,
              fontWeight: 'bold',
              fontSize: 15,
            }}>
            {price} 200.000
            <Text
              style={{
                color: colors.white,
                fontWeight: 'normal',
                fontSize: 10,
              }}>
              /malam
            </Text>
          </Text>
          <Text>1 Bed</Text>
        </View>
        <Button title="Book Now" color={colors.yellow} size={10} width={100} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  roomDescription: {
    padding: 20,
  },
  image: {
    width: '100%',
    height: 240,
  },
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  nameRoom: {
    fontWeight: 'bold',
    fontSize: 25,
    color: colors.darkBlue,
  },
  SelectRoom: {
    margin: 15,
    borderRadius: 10,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.darkBlue,
    alignItems: 'center',
    padding: 10,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
