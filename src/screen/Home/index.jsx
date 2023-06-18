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
  const user = useSelector(state => state?.login?.user);
  const [myLocation, setMyLocation] = useState(null)
  const [error, setError] = useState(null);
  const [kosPemilik, setKosPemilik] = useState([])
  const [loading, setLoading] = useState(false)

  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      setLoading(true)
      const getKos = async () => {
        const kosCollection = await firestore().collection('kos').where('id_pemilik', '==', user.id_akun).get()
        const kamar = kosCollection?.docs?.map((item) => ({ ...item?.data(), id: item?.id }))
        console.log('kos', kamar);
        setKosPemilik(kamar)
        setLoading(false)
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

  if (user?.tipeAkun === 2) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: colors.darkGrey, fontStyle: 'italic', fontSize: 20 }}>Loading...</Text>
          </View>
        ) : (
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
        )}
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
          </View >
        </View >
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
