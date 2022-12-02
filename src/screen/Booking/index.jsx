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
      <Header
        title="booking"
        color={colors.darkBlue}
        onPress={() => navigation.goBack()}
      />
      <ScrollView>
        <View>
          <Text>Detail Pemesanan</Text>
          <View>
            <View style={{flexDirection: 'row'}}>
              <Image source={{uri: image}} style={{width: 100, height: 100}} />
              <View>
                <Text>{name_room}</Text>
                <Text>
                  {room} x {bed_type}
                </Text>
                <Text>{person} Person</Text>
              </View>
            </View>
            <View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text>Check-in</Text>
                <Text>{checkIn}</Text>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text>Check-out</Text>
                <Text>{checkOut}</Text>
              </View>
            </View>
          </View>
        </View>
        <Text>CONTACT INFORMATION</Text>
        <Input
          placeholder="Full name"
          onChangeText={value => setFullName(value)}
          value={fullName}
        />
        <Input
          placeholder="email@gmail.com"
          onChangeText={value => setEmail(value)}
          value={email}
        />
        <Input
          placeholder="No Telephone"
          onChangeText={value => setTelephone(value)}
          value={telephone}
        />
        <View>
          <View>
            <View>
              <Text></Text>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text>Total</Text>
              <Text>{price * room}</Text>
            </View>
          </View>
        </View>
        <Button title="Booking" color={colors.darkBlue} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
});
