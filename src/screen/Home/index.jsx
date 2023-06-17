import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  ToastAndroid,
  Linking
} from 'react-native';
// import Destination from './parts/Destination';
import { colors, DataPopular, DataTop } from '../../utils';
import { Button, Input } from '../../component/atoms';
import Header from '../../component/molecules/Header';
import { useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import InputModal from './parts/InputModal';
import { TextInput } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GetLocation from 'react-native-get-location'
import { useSelector } from 'react-redux';
import KostCard from '../../component/molecules/KostCard';
import firestore from '@react-native-firebase/firestore';
import { useIsFocused } from '@react-navigation/native'

const maxDate = new Date();

maxDate.setMonth(maxDate.getMonth() + 1);

const formatDate = date => {
  const d = new Date(date);

  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  let year = d.getFullYear();

  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }
  return [year, month, day].join('-');
};

export default function Home({ navigation }) {
  const [input, setInput] = useState('');
  const [inputCheckIn, setInputCheckIn] = useState(null);
  const [inputCheckOut, setInputCheckOut] = useState(null);
  const date = new Date();
  const [minimumDate, setMinimumDate] = useState(date);
  const [checkIn, setCheckIn] = useState('Check in');
  const [checkOut, setCheckOut] = useState('Check Out');
  const [openCheckin, setOpenCheckin] = useState(false);
  const [openCheckout, setOpenCheckout] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [guest, setGuest] = useState(1);
  const [room, setRoom] = useState(1);
  const user = useSelector(state => state?.login?.user);
  const [myLocation, setMyLocation] = useState(null)
  const [error, setError] = useState(null);
  const [kosPemilik, setKosPemilik] = useState([])

  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      const getKos = async () => {
        const kosCollection = await firestore().collection('kos').where('id_pemilik', '==', user.id_akun).get()
        const kamar = kosCollection?.docs?.map((item) => ({ ...item?.data(), id: item?.id }))
        console.log('kos', kamar);
        setKosPemilik(kamar)
      }
      getKos()
    }
  }, [isFocused]);

  const requestLocation = () => {
    setError(null)
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    }).then(location => {
      setMyLocation({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      })
    }).catch(error => {
      const { code, message } = error;
      console.warn(code, message);
      setError(code)
    })
  }
  const checkOutButton = () => {
    if (inputCheckIn) {
      setOpenCheckout(true);
    } else {
      alert('Please input Check-in');
    }
  };

  useEffect(() => {
    if (room > guest) {
      setRoom(guest);
    }
  }, [guest, room]);




  if (user?.tipeAkun === 2) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <View style={styles.header}>
            <Header type="user" onPress={() => navigation.navigate('Sign')} />
            <View style={{ marginTop: 15 }}>
              <Text style={{
                color: colors.black,
                fontSize: 18,
                fontWeight: 'bold'
              }}>
                Daftar Kos-ku:
              </Text>
              <View style={{
                marginTop: 15
              }}>
                {kosPemilik.map(item => (
                  <KostCard
                    key={item?.id}
                    nama={item?.nama_kos}
                    alamatKos={item?.alamat}
                    foto={item?.foto_kos[0]?.uri}
                    onPress={() => {
                      navigation.navigate('KosDetail', {
                        id_kos: item?.id
                      })
                    }}
                  />
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
  return (
    <SafeAreaView style={{ backgroundColor: colors.white, flex: 1 }}>
      <ScrollView>
        <View style={styles.header}>
          <Header type="user" onPress={() => navigation.navigate('Sign')} />
          <View style={styles.boxSearch}>
            <View>
              <TextInput
                style={{
                  borderRadius: 10,
                  paddingHorizontal: 10,
                  color: colors.black,
                  borderWidth: 1,
                  borderColor: colors.darkGrey
                }}
                placeholder="Cari lokasi"
                placeholderTextColor={colors.darkGrey}
                onChangeText={value => setInput(value)}
                onSubmitEditing={() => {
                  navigation.navigate('SearchKos', {
                    inputLocation: input
                  })
                  ToastAndroid.show(input, ToastAndroid.SHORT)
                  setInput("")
                }}
                value={input}
              />
              <Ionicons name={'location-outline'}
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  fontSize: 20,
                  padding: 14,
                  color: colors.darkGrey
                }}
                onPress={() => {
                  requestLocation()
                  if (error === 'UNAVAILABLE') {
                    ToastAndroid.show('Lokasi tidak tersedia', ToastAndroid.SHORT)
                  } else {
                    navigation.navigate('SearchKos', {
                      gpsLoc: myLocation
                    })
                  }
                }}
              />
            </View >
            {/* <Input
              placeholder="Cari lokasi"
              type="search"
              onChangeText={value => setInput(value)}
            /> */}
            {/* <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 10,
                alignItems: 'center',
              }}>
              <View>
                <Button
                  title={checkIn}
                  onPress={() => setOpenCheckin(true)}
                  color={colors.yellow}
                  width={120}
                />
                {openCheckin && (
                  <DateTimePicker
                    value={date}
                    mode={'date'}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    minimumDate={date}
                    maximumDate={maxDate}
                    onChange={(event, selectedDate) => {
                      if (event.type == 'set') {
                        setOpenCheckin(false);
                        setInputCheckIn(formatDate(selectedDate));
                        setCheckIn(selectedDate.toLocaleDateString('pt-PT'));
                        setMinimumDate(
                          new Date(
                            selectedDate.setDate(selectedDate.getDate() + 1),
                          ),
                        );
                      } else {
                        setOpenCheckin(false);
                      }
                    }}
                  />
                )}
              </View>
              <Text style={{fontSize: 20, color: colors.black}}>-</Text>
              <View>
                <Button
                  title={checkOut}
                  onPress={checkOutButton}
                  color={colors.yellow}
                  width={120}
                />
                {openCheckout && (
                  <DateTimePicker
                    value={minimumDate}
                    mode={'date'}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    minimumDate={minimumDate}
                    onChange={(event, selectedDate) => {
                      if (event.type == 'set') {
                        setOpenCheckout(false);
                        setInputCheckOut(formatDate(selectedDate));
                        setCheckOut(selectedDate.toLocaleDateString('pt-PT'));
                      } else {
                        setOpenCheckout(false);
                      }
                    }}
                  />
                )}
              </View>
            </View> */}
            {/* <View style={{marginBottom: 10}}>
              <Button
                title={`${guest} Guest & ${room} Room`}
                color={colors.yellow}
                onPress={() => setOpenModal(true)}
              />
            </View> */}
            {/* <InputModal
              guest={guest}
              room={room}
              buttonMinRoom={() => setRoom(room - 1)}
              buttonPlusRoom={() => setRoom(room + 1)}
              buttonMinGuest={() => setGuest(guest - 1)}
              buttonPlusGuest={() => setGuest(guest + 1)}
              onRequestClose={() => setOpenModal(!openModal)}
              onPressOk={() => {
                setOpenModal(false);
              }}
              visible={openModal}
            /> */}
            {/* <Button
              title="Search"
              color={colors.darkBlue}
              onPress={() =>
                input !== '' &&
                inputCheckIn &&
                inputCheckOut &&
                navigation.navigate('SearchResult', {
                  location: input,
                  checkIn: inputCheckIn,
                  checkOut: inputCheckOut,
                  guests: guest,
                  rooms: room,
                })
              }
            /> */}
          </View >
        </View >
        {/* <View style={{marginLeft: 20}}>
          <Destination title="Top Destinations" data={DataTop} />
          <Destination title="Popular Destinations" data={DataPopular} />
        </View> */}
      </ScrollView >
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.darkBlue,
    width: 280,
    marginTop: 30,
  },
  boxSearch: {
    marginTop: 15,
    borderRadius: 20,
  },
});
