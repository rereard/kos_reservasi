import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  Image,
} from 'react-native';
import { colors } from '../../utils';
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BookHistoryCard from '../../component/molecules/BookHistoryCard';
import { Button } from '../../component/atoms';
import firestore from '@react-native-firebase/firestore';
import Filter from '@react-native-firebase/firestore';
import { formatIDR } from '../../utils';
import { useEffect, useState } from 'react';
import KostCard from '../../component/molecules/KostCard';
import { useIsFocused } from '@react-navigation/native'

export default function Receipt({ navigation }) {
  const user = useSelector(state => state?.login?.user);
  const isFocused = useIsFocused()

  useEffect(() => {
    console.log(user?.id_akun);
    const getDataTransaksi = async () => {
      setLoading(true)
      firestore().collection('transaksi').where(
        Filter.Filter.or(
          Filter.Filter('id_pelanggan', '==', user?.id_akun),
          Filter.Filter('id_pemilik', '==', user?.id_akun)
        )
      ).get().then(qSnap => {
        console.log(qSnap);
        const data = qSnap.docs.map(item => ({ ...item?.data(), id: item?.id }))
        console.log('data1', data);
        setDataTransaksi(data)
        setLoading(false)
      })
    }
    if (isFocused) {
      getDataTransaksi()
    }
  }, [isFocused]);

  const [dataTransaksi, setDataTransaksi] = useState([])
  const [belumBayar, setBelumBayar] = useState([])
  const [menungguKonfirm, setMenungguKonfirm] = useState([])
  const [selesai, setSelesai] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    console.log('...', dataTransaksi);
    if (dataTransaksi.length !== 0) {
      setBelumBayar(dataTransaksi.filter(item => item.status === 'belum_bayar'))
      setMenungguKonfirm(dataTransaksi.filter(item => item.status === 'tunggu_konfirm'))
      setSelesai(dataTransaksi.filter(item => item.status === 'selesai'))
    }
    console.log(belumBayar, menungguKonfirm, selesai);
  }, [dataTransaksi]);

  if (user) {
    return (
      <SafeAreaView>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.darkBlue }}>
          <Text style={{ color: colors.white, fontWeight: 'bold', fontSize: 20, marginHorizontal: 15, marginVertical: 20 }}>Riwayat Transaksi</Text>
        </View>
        {dataTransaksi.length === 0 ? (
          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
            <Text style={{ color: colors.darkGrey, fontStyle: 'italic', fontSize: 20 }}>Masih kosong~</Text>
          </View>
        ) : (
          <ScrollView>
            <View style={{ margin: 20, marginBottom: 70 }}>
              {(belumBayar.length !== 0 && user?.tipeAkun === 1) && (
                <View>
                  <Text style={{ color: colors.black, fontWeight: 'bold', marginBottom: 7, fontSize: 16 }}>Belum dibayar ({belumBayar.length})</Text>
                  {belumBayar?.map(item => (
                    <KostCard
                      key={item?.id}
                      id={item?.id}
                      foto={item?.foto_kamar}
                      nama={item?.nama_kamar}
                      nama2={item?.nama_kos}
                      tanggal={item?.tanggal_transaksi}
                      harga={item?.jumlah_bayar}
                      status={item?.status}
                      onPress={() => {
                        navigation.navigate('Transaksi', {
                          id_transaksi: item?.id,
                          fromConfirm: false
                        })
                      }}
                    />
                  ))}
                </View>
              )}
              {menungguKonfirm.length !== 0 && (
                <View>
                  <Text style={{ color: colors.black, fontWeight: 'bold', marginBottom: 7, fontSize: 16 }}>Menunggu konfirmasi ({menungguKonfirm.length})</Text>
                  {menungguKonfirm?.map(item => (
                    <KostCard
                      key={item?.id}
                      id={item?.id}
                      foto={item?.foto_kamar}
                      nama={item?.nama_kamar}
                      nama2={item?.nama_kos}
                      tanggal={item?.tanggal_transaksi}
                      harga={item?.jumlah_bayar}
                      status={item?.status}
                      onPress={() => {
                        navigation.navigate('Transaksi', {
                          id_transaksi: item?.id,
                          fromConfirm: false
                        })
                      }}
                    />
                  ))}
                </View>
              )}
              {selesai.length !== 0 && (
                <View>
                  <Text style={{ color: colors.black, fontWeight: 'bold', marginBottom: 7, fontSize: 16 }}>Transaksi selesai ({selesai.length})</Text>
                  {selesai?.map(item => (
                    <KostCard
                      key={item?.id}
                      id={item?.id}
                      foto={item?.foto_kamar}
                      nama={item?.nama_kamar}
                      nama2={item?.nama_kos}
                      tanggal={item?.tanggal_transaksi}
                      harga={item?.jumlah_bayar}
                      status={item?.status}
                      onPress={() => {
                        navigation.navigate('Transaksi', {
                          id_transaksi: item?.id,
                          fromConfirm: false
                        })
                      }}
                    />
                  ))}
                </View>
              )}
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={{ flex: 1, margin: 20 }}>
        <View style={[styles.profileBox, { marginBottom: 10 }]}>
          <Text style={[styles.textHeader(colors.black), { marginBottom: 5 }]}>
            Booking History
          </Text>
          <Text style={styles.text(colors.black)}>
            Sign in to see your booking history
          </Text>
        </View>
        <Button
          title="Sign in"
          color={colors.darkBlue}
          onPress={() => navigation.navigate('Sign')}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  profileBox: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  profile: {
    flexDirection: 'row',
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.darkGrey,
  },
  quantity: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  imgBorder: {
    borderRadius: 99,
    borderWidth: 3,
    borderColor: colors.darkBlue,
  },
  img: {
    height: 75,
    width: 75,
    borderRadius: 99,
  },
  textHeader: color => ({
    fontSize: 16,
    fontWeight: '700',
    color: color,
  }),
  text: color => ({
    fontSize: 15,
    color: color,
  }),
});
