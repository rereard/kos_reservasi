import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  FlatList,
} from 'react-native';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {colors} from '../../utils';
import HotelCard from '../../component/molecules/HotelCard';
import {Button} from '../../component/atoms';
import {fetchHotels} from '../../features/hotelSlice';

export default function SearchResult({route, navigation}) {
  const dispatch = useDispatch();
  const hotels = useSelector(state => state.hotel.hotels);
  const isPending = useSelector(state => state.hotel.isPending);

  const {location, checkIn, checkOut, guests, rooms} = route.params;

  useEffect(() => {
    dispatch(fetchHotels(route.params));
  }, []);

  return (
    <SafeAreaView>
      <View
        style={{
          backgroundColor: colors.white,
          flexDirection: 'row',
          margin: 10,
          borderRadius: 10,
          padding: 10,
          alignItems: 'center',
        }}>
        <Button
          type="icon"
          icon="chevron-back"
          color={colors.darkBlue}
          size={30}
          onPress={() => navigation.goBack()}
        />
        <View style={{flex: 0.3}} />
        <View style={{}}>
          <Text
            style={{color: colors.darkBlue, fontSize: 16, fontWeight: '600'}}>
            Search result for "{location}"
          </Text>
          <Text style={{color: colors.darkBlue, fontSize: 15}}>
            {checkIn} - {checkOut}
          </Text>
          <Text style={{color: colors.darkBlue, fontSize: 15}}>
            {guests} person | {rooms} rooms
          </Text>
        </View>
      </View>
      {isPending ? (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{color: colors.darkBlue, fontSize: 18, fontWeight: '600'}}>
            Loading...
          </Text>
        </View>
      ) : (
        <ScrollView>
          <View style={{padding: 10, paddingTop: 0, marginBottom: 100}}>
            {hotels.map(item => (
              <HotelCard
                key={item?.hotel_id}
                onPress={() =>
                  navigation.navigate('DetailHotel', {
                    hotel_id: item?.hotel_id,
                    checkIn: checkIn,
                    checkOut: checkOut,
                    guests: guests,
                    rooms: rooms,
                    image: item?.main_photo_url
                  })
                }
                hotelId={item?.hotel_id}
                image={item?.main_photo_url}
                hotelName={item?.hotel_name}
                price={item?.price_breakdown?.all_inclusive_price}
                address={item?.address}
                // city={item?.city}
                reviewScore={item?.review_score}
                reviewTotal={item?.review_nr}
                guests={guests}
                rooms={rooms}
              />
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
