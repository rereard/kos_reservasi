import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import React, {useEffect} from 'react';
import {Header, RoomsCard} from '../../component/molecules';
import {colors} from '../../utils';
import {useDispatch, useSelector} from 'react-redux';
import {fetchRooms} from '../../features/getRoomsSlice';

export default function Rooms({route, navigation}) {
  const {hotel_id, checkOut, checkIn, guests, rooms} = route.params;
  const room = useSelector(state => state.rooms.rooms);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRooms(route.params));
  }, []);

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.header}>
        <Header title="Pilih Kamar" onPress={() => navigation.goBack()} />
      </View>
      <ScrollView>
        {room?.block?.map(item => (
          <RoomsCard
            title={item?.name_without_policy}
            price={item?.product_price_breakdown.all_inclusive_amount?.value}
            image={room.rooms[item?.room_id].photos}
            person={guests}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.darkBlue,
    padding: 10,
  },
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
});
