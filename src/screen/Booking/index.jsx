import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {Button, Input} from '../../component/atoms';
import {colors} from '../../utils';
import {Header} from '../../component/molecules';

export default function Booking({route, navigation}) {
  const {price, room, bed_type, person, checkIn, checkOut, name_room, image} =
    route.params;

  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [telephone, setTelephone] = useState(0);

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.header}>
        <Header
          title="booking"
          color={colors.white}
          onPress={() => navigation.goBack()}
        />
      </View>
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Text style={styles.titleHeader}>Detail Pemesanan</Text>
            <View style={{marginTop: 20}}>
              <View style={styles.summaryBooking}>
                <Image
                  source={{uri: image}}
                  style={{width: 90, height: 90, borderRadius: 10}}
                />
                <View style={{marginLeft: 10}}>
                  <Text style={styles.nameRoom} numberOfLines={2}>
                    {name_room}
                  </Text>
                  <Text style={styles.countBed}>
                    {room} x {bed_type}
                  </Text>
                  <Text style={styles.person}>{person} Person</Text>
                </View>
              </View>
              <View style={styles.arrivalDate}>
                <View style={styles.arrivaTitle}>
                  <Text>Check-in</Text>
                  <Text>{checkIn}</Text>
                </View>
                <View style={styles.arrivaTitle}>
                  <Text>Check-out</Text>
                  <Text>{checkOut}</Text>
                </View>
              </View>
            </View>
          </View>
          <Text style={styles.titleHeader}>Contact Information</Text>
          <View style={styles.contentInput}>
            <Input
              placeholder="Full name"
              type="user"
              onChangeText={value => setFullName(value)}
              value={fullName}
              backgroundColor={colors.grey}
            />
            <View style={{marginVertical: 10}}>
              <Input
                placeholder="email@gmail.com"
                type="user"
                onChangeText={value => setEmail(value)}
                value={email}
                backgroundColor={colors.grey}
              />
            </View>
            <Input
              placeholder="No Telephone"
              type="telephone"
              onChangeText={value => setTelephone(value)}
              value={telephone}
              backgroundColor={colors.grey}
            />
          </View>
          <View>
            <Text style={styles.titleHeader}>Total Payment</Text>
            <View style={styles.totalPrice}>
              <Text>Total</Text>
              <Text>IDR {price * room}</Text>
            </View>
          </View>
          <Button title="Booking" color={colors.darkBlue} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  summaryBooking: {
    borderColor: colors.darkGrey,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
  },
  header: {
    padding: 20,
    backgroundColor: colors.darkBlue,
  },
  contentInput: {
    marginVertical: 20,
  },
  container: {
    padding: 20,
  },
  titleHeader: {
    color: colors.darkBlue,
    fontWeight: 'bold',
  },
  nameRoom: {
    color: colors.black,
    fontWeight: 'bold',
  },
  countBed: {
    marginVertical: 5,
    color: colors.black,
    fontSize: 13,
  },
  arrivaTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: colors.darkGrey,
  },
  arrivalDate: {
    marginVertical: 15,
  },
  person: {
    fontSize: 13,
    color: colors.darkGrey,
  },
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  totalPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: colors.darkGrey,
    borderWidth: 1,
    padding: 8,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
});
