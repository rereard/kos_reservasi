import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
} from 'react-native';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { colors } from '../../utils';
import HotelCard from '../../component/molecules/HotelCard';
import { Button } from '../../component/atoms';
import { fetchHotels } from '../../features/hotelSlice';

export default function SearchResult({ route, navigation}) {

  const dispatch = useDispatch()

  const { location, checkIn, checkOut, guests, rooms } = route.params

  useEffect(() => {
    dispatch(fetchHotels(route.params))
  }, []);

  return (
    <SafeAreaView>
      <View style={{ backgroundColor: colors.white, flexDirection: "row", margin: 10, borderRadius: 10, padding: 10, alignItems: "center" }}>
        <Button type="icon" icon="chevron-back" color={colors.darkBlue} size={30} onPress={() => navigation.goBack()} />
        <View style={{ flex: 0.3 }} />
        <View style={{  }}>
          <Text style={{ color: colors.darkBlue, fontSize: 16, fontWeight: "600" }}>Search result for "{location}"</Text>
          <Text style={{ color: colors.darkBlue, fontSize: 15 }}>{checkIn} - {checkOut}</Text>
          <Text style={{ color: colors.darkBlue, fontSize: 15 }}>{guests} person | {rooms} rooms</Text>

        </View>
      </View>
      <View style={{ padding: 10, paddingTop: 0 }}>
        <HotelCard />
        <HotelCard />
        <HotelCard />
        <HotelCard />
      </View>
    </SafeAreaView>
  );
}
