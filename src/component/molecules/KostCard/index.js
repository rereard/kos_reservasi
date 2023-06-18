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
import {Button} from '../../atoms';
import Icon from '../../atoms/Button/icon';
import {colors} from '../../../utils';
import { formatIDR } from '../../../utils';

export default function KostCard({onPress, nama, alamatKos, nama2, id, foto, harga, tanggal, status}) {
  return (
    <View
      style={{
        width: '100%',
        backgroundColor: '#0364ce',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: 20,
      }}>
      <Pressable
        style={{borderRadius: 10, backgroundColor: colors.white}}
        onPress={onPress}
      >
        <Image
          source={{
            uri: foto,
          }}
          style={{
            height: 125,
            width: '100%',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
        />
        <View
          style={{
            padding: 10,
          }}>
          <View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{flex: 1}}>
                <Text
                  numberOfLines={2}
                  style={{
                    color: '#0364ce',
                    fontWeight: 'bold',
                    fontSize: 17,
                    marginBottom: 3,
                    maxWidth: 210,
                  }}>
                  {nama}
                </Text>
                {alamatKos && (
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Button
                      type="icon"
                      color={colors.darkGrey}
                      icon={'location'}
                      size={15}
                    />
                    <Text
                      numberOfLines={2}
                      style={{color: colors.darkGrey}}>
                      {alamatKos}
                    </Text>
                  </View>
                )}
                {nama2 && (
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                   <Button
                     type="icon"
                     color={colors.darkGrey}
                     icon={'home-outline'}
                     size={15}
                   />
                   <Text
                     numberOfLines={2}
                     style={{color: colors.darkGrey}}>
                     {nama2}
                   </Text>
                 </View>
                )}
                {tanggal && (
                  <Text style={{ color: colors.darkGrey, marginTop: 3 }}>{tanggal}</Text>
                )}
              </View>
              {harga && (
                <View style={{ flex: 1 }}>
                  
                    <Text
                    style={{
                      color: '#0364ce',
                      fontSize: 15,
                      fontWeight: '400',
                      textAlign: 'right',
                    }}>
                      Rp {formatIDR.format(harga).replace('IDR', '').trim()}
                    </Text>
                  
                  {(status || status !== 'selesai') && (
                    <Text
                      style={{
                        color: status === 'belum_bayar' ? 'red' : colors.darkBlue,
                        fontSize: 15,
                        fontWeight: 'bold',
                        textAlign: 'right',
                      }}>
                        {status === 'belum_bayar' ? 'Belum dibayar' : status === 'tunggu_konfirm' ? 'Menunggu konfirmasi' : status === 'batal' ? 'Dibatalkan' : null}
                    </Text>
                  ) }
                </View>
              )}
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
}
