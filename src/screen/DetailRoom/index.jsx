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
import {colors, formatIDR} from '../../utils';
import {Button} from '../../component/atoms';

export default function DetailRoom({route, navigation}) {
  const {name_room, price, bed_type, image, room, person, checkIn, checkOut} =
    route.params;

  return (
    <SafeAreaView style={styles.page}>
      <View style={{padding: 20}}>
        <Header
          numberOfLines={1}
          title={name_room}
          color={colors.darkBlue}
          onPress={() => navigation.goBack()}
        />
      </View>
      <ScrollView>
        <Image
          source={{
            uri: image[1] ? image[1]?.url_original : image[0]?.url_original,
          }}
          style={styles.image}
        />
        <View style={styles.roomDescription}>
          <Text style={styles.nameRoom}>{name_room}</Text>
        </View>
        <View>
          <Text>Photos</Text>
          <ScrollView horizontal={true}>
            {image?.map(item => (
              <Image
                source={{
                  uri: item.url_original,
                }}
                style={{width: 100, height: 100}}
              />
            ))}
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
            {formatIDR.format(price)}
            <Text
              style={{
                color: colors.white,
                fontWeight: 'normal',
                fontSize: 10,
              }}>
              /malam
            </Text>
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Button
              type="icon"
              color={colors.white}
              icon={'bed-outline'}
              size={18}
            />
            <Text style={{color: colors.white, marginLeft: 5}}>{bed_type}</Text>
          </View>
        </View>
        <Button
          title="Book Now"
          color={colors.yellow}
          size={10}
          width={100}
          onPress={() =>
            navigation.navigate('Booking', {
              price: price,
              bed_type: bed_type,
              room: room,
              person: person,
              checkIn: checkIn,
              checkOut: checkOut,
              name_room: name_room,
              image: image[1]?.url_original,
            })
          }
        />
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
