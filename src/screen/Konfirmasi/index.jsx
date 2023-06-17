import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  Pressable,
  Image,
} from 'react-native';
import { colors } from '../../utils';
import { Button } from '../../component/atoms';
import { Header } from '../../component/molecules';
import Icon from '../../component/atoms/Button/icon';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useEffect, useState } from 'react';
import { formatIDR } from '../../utils';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from "react-redux"

export default function Konfirmasi({ navigation, route }) {

  const { id_kamar, id_kos, nama_kos, nama_kamar, foto_kamar, harga, id_pemilik } = route.params

  const user = useSelector((state) => state.login.user)

  const dateNow = new Date()
  const date = new Date()
  const dateMax = new Date(date.setMonth(date.getMonth() + 1))

  useEffect(() => {
    console.log(route.params);
    console.log(tglTinggal);
  }, [tglTinggal]);

  const [openDatePick, setDatePick] = useState(false)
  const [tglTinggal, setTglTinggal] = useState(null)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.darkBlue, padding: 15 }}>
        <Header onPress={() => navigation.goBack()} size={30} title={'Konfirmasi Transaksi'} />
      </View>
      <View>
        <View style={{
          padding: 10,
          backgroundColor: colors.white,
          borderRadius: 10,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
          flexDirection: 'row',
          margin: 15,
          marginBottom: 5
        }}>
          <Image
            source={{
              uri: foto_kamar
            }}
            style={{
              height: 125,
              width: 125,
              borderRadius: 15
            }}
          />
          <View style={{ padding: 10, justifyContent: 'center' }}>
            <Text style={{ color: colors.black, fontSize: 18, fontWeight: 'bold' }}>{nama_kos}</Text>
            <Text style={{ color: colors.black, fontSize: 15, fontWeight: '400' }}>{nama_kamar}</Text>
            <Text style={{ color: colors.darkGrey, fontSize: 15, fontWeight: '400' }}>Rp {formatIDR.format(harga).replace('IDR', '').trim()}/bulan</Text>
          </View>
        </View>
      </View>
      <View style={{
        marginHorizontal: 15,
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center'
      }}>
        <Text style={{ color: colors.black, fontWeight: 'bold', fontSize: 16 }}>
          Tanggal mulai menginap:
        </Text>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Button
            title={tglTinggal ? tglTinggal : 'Tekan'}
            onPress={() => setDatePick(true)}
            color={colors.darkBlue}
            width={120}
          />
        </View>
        {openDatePick && (
          <DateTimePicker
            value={dateNow}
            mode='date'
            minimumDate={dateNow}
            maximumDate={dateMax}
            onChange={(event, selectedDate) => {
              if (event.type == 'set') {
                setDatePick(false);
                setTglTinggal(selectedDate.toLocaleDateString('pt-PT'))
              } else {
                setDatePick(false);
              }
            }}
          />
        )}
      </View>
      <View style={{
        margin: 15,
        marginBottom: 20,
        borderRadius: 10,
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: colors.darkBlue,
        alignItems: 'center',
        padding: 8,
        left: 0,
        right: 0,
        bottom: 0,
      }}>
        <Pressable style={{
          backgroundColor: colors.darkBlue,
          padding: 6,
          borderRadius: 15,
          // marginBottom: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          flex: 1
        }}
          onPress={() => {
            if (tglTinggal) {
              firestore().collection('transaksi').add({
                foto_bukti: '',
                foto_kamar,
                id_kamar,
                id_kos,
                id_pelanggan: user.id_akun,
                id_pemilik,
                jumlah_bayar: harga,
                mulai_tinggal: tglTinggal,
                nama_kamar,
                nama_kos,
                status: 'belum_bayar',
                tanggal_transaksi: new Date().toLocaleString('pt-PT')
              }).then(docRef => {
                console.log(docRef);
                navigation.navigate('Transaksi', {
                  id_transaksi: docRef.id,
                  fromConfirm: true
                })
              })
            }
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon
              color={colors.white}
              icon="book-outline"
              size={17}
            />
            <Text style={{
              color: colors.white,
              textAlign: 'center',
              fontSize: 17
            }}>
              {(" ")}Sewa kamar
            </Text>
          </View>
          <Text style={{ color: colors.white, fontSize: 17, fontWeight: 'bold' }}>Rp {formatIDR.format(harga).replace('IDR', '').trim()}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}