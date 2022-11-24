import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
} from 'react-native';
import HotelCard from '../../component/molecules/HotelCard';
export default function Favorite() {
  return (
    <ScrollView style={{ padding: 10}}>
      <Text>Favorites</Text>
      <HotelCard />
      <HotelCard />
      <HotelCard />
    </ScrollView>
  );
}
