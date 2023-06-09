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
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function TambahKos({ navigation }) {
  return (
    <SafeAreaView>
      <ScrollView>
        <Text style={{ color: colors.black, fontWeight: '600', fontSize: 20, marginHorizontal: 15, marginVertical: 25 }}>Tambah Kos Baru</Text>
        <ScrollView horizontal style={{
          margin: 10,
          marginTop: 0
        }}>
          <Image
            source={{
              uri: "https://picsum.photos/200"
            }}
            style={{
              height: 150,
              width: 150,
              borderRadius: 15,
              marginRight: 10
            }}
          />
          <Pressable style={{
            justifyContent: 'center'
          }}>
            <Ionicons
              name='add-circle-outline'
              style={{
                fontSize: 45,
                color: colors.darkBlue,
                textAlign: 'center',
              }}
            />
            <Text style={{ color: colors.darkBlue, fontSize: 11 }}>Tambah Foto Kos</Text>
          </Pressable>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  )
}