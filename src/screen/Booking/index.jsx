import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import React, {useState} from 'react';
import {Button, Input} from '../../component/atoms';
import {colors} from '../../utils';
import {Header} from '../../component/molecules';
import { addBookHistory } from '../../features/bookHistorySlice';

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const lengthOfDay = (date1, date2) => {
  let d1 = new Date(date1)
  let d2 = new Date(date2)
  let Difference_In_Time = d2.getTime() - d1.getTime();
  let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  return(Difference_In_Days)
}

export default function Booking({route, navigation}) {
  const dispatch = useDispatch()
  const {price, room, bed_type, person, checkIn, checkOut, name_room, image} = route.params;
  
  const user = useSelector(state => state.login?.user)
  const hotel_name = useSelector(state => state.detail?.detail?.hotel_name)

  const [fullName, setFullName] = useState(user.firstName + " " + user.lastName);
  const [email, setEmail] = useState(user.email);
  const [telephone, setTelephone] = useState(user.phone);

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
        <Button 
          title="Booking" 
          color={colors.darkBlue} 
          onPress={() => dispatch(addBookHistory({
            username: user.username, 
            data: {
              hotel_name,  
              book_id: makeid(5), 
              stay_length: lengthOfDay(checkIn, checkOut), 
              checkIn, 
              checkOut, 
              person, 
              room, 
              name_room, 
              price: price*room 
            } 
          }))
        }/>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
});
