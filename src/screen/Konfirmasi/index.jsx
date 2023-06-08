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

export default function Konfirmasi({ navigation }) {
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
              uri: 'https://parboaboa.com/data/foto_berita/kamar-kost-kmd.webp'
            }}
            style={{
              height: 125,
              width: 125,
              borderRadius: 15
            }}
          />
          <View style={{ padding: 10, justifyContent: 'center' }}>
            <Text style={{ color: colors.black, fontSize: 18, fontWeight: 'bold' }}>Kos Testing</Text>
            <Text style={{ color: colors.black, fontSize: 15, fontWeight: '400' }}>Kamar 1</Text>
            <Text style={{ color: colors.darkGrey, fontSize: 15, fontWeight: '400' }}>Rp 200.000,00/bulan</Text>
          </View>
        </View>
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
          onPress={() => navigation.navigate('Konfirmasi')}
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
          <Text style={{ color: colors.white, fontSize: 17, fontWeight: 'bold' }}>Rp 200.000,00</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}