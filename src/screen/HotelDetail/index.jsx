import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  FlatList,
} from 'react-native';
import React, {useState, useEffect, useRef, useCallback} from 'react';
import Header from '../../component/molecules/Header';
import {colors} from '../../utils';
import Location from './parts/Location';
import Button from '../../component/atoms/Button';
import axios from 'axios';
import ReviewParts from './parts/Review';
import {useDispatch, useSelector} from 'react-redux';
import {fetchDetail} from '../../features/detailHotelSlice';
import {fetchReview} from '../../features/ReviewSlice';
import Kebijakan from './parts/Kebijakan';
import { formatIDR } from '../../utils';
import Swiper from 'react-native-swiper'

export default function DetailHotel({route, navigation}) {
  const {hotel_id, checkIn, checkOut, guests, rooms, image} = route.params;
  const [hotelPhotos, setHotelPhotos] = useState([]);
  const [lineText, setLineText] = useState(3);
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useDispatch();
  const detail = useSelector(state => state.detail.detail);
  const isPending = useSelector(state => state.detail.isPending);
  const review = useSelector(state => state.review.review);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.request({
          method: 'GET',
          url: 'https://apidojo-booking-v1.p.rapidapi.com/properties/get-hotel-photos',
          params: {hotel_ids: hotel_id, languagecode: 'id'},
          headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
            'X-RapidAPI-Host': 'apidojo-booking-v1.p.rapidapi.com',
          },
        });
        setHotelPhotos(response.data.data[hotel_id]);
      } catch (e) {
        throw e;
      }
    };
    if (detail?.hotel_id !== hotel_id) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    console.log('hotel PHOTOS', hotelPhotos);
  }, [hotelPhotos]);

  // const [description, setDescription] = useState([]);

  const readMore = () => {
    if (lineText === 0) {
      setLineText(3);
    } else {
      setLineText(0);
    }
  };

  useEffect(() => {
    if (detail?.hotel_id !== hotel_id) {
      dispatch(fetchReview(route.params));
    }
  }, []);

  useEffect(() => {
    if (detail?.hotel_id !== hotel_id) {
      dispatch(fetchDetail(route.params));
    }
  }, []);

  // console.log('==>', description);

  // useEffect(() => {
  //   axios
  //     .get(
  //       'https://apidojo-booking-v1.p.rapidapi.com/properties/get-description',
  //       {
  //         params: {
  //           hotel_ids: hotel_id,
  //           languagecode: 'id',
  //         },
  //         headers: {
  //           'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
  //           'X-RapidAPI-Host': 'apidojo-booking-v1.p.rapidapi.com',
  //         },
  //       },
  //     )
  //     .then(response => {
  //       setDescription(response.data);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <SafeAreaView style={{backgroundColor: colors.white, flex: 1}}>
      {isPending ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.title}>Loading...</Text>
        </View>
      ) : (
        <>
          <ScrollView>
            <View>
              <Swiper style={{ height: 230 }}>
                {hotelPhotos.slice(0, 5).map((item, index) => {
                  return(
                    <Image
                      key={index}
                      source={{
                        uri: `https://cf.bstatic.com${item[5]}`,
                      }}
                      style={styles.image}
                    />
                  )
                })}
              </Swiper>
              <View style={styles.header}>
                <Header onPress={() => navigation.goBack()} />
              </View>
              <View style={styles.boxPrice}>
                <Text style={styles.price}>{formatIDR.format(detail?.composite_price_breakdown?.all_inclusive_amount?.value)}</Text>
                <Text style={styles.price}>/Night</Text>
              </View>
            </View>
            <View style={styles.container}>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View>
                  <Text style={styles.title}>{detail.hotel_name}</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 5,
                    }}>
                    <Button
                      type="icon"
                      icon={'location-outline'}
                      color={colors.darkBlue}
                      size={15}
                    />
                    <Text style={{marginLeft: 5, color: colors.darkGrey}}>
                      {detail?.city}
                    </Text>
                  </View>
                </View>
              </View>
              <ScrollView
                style={{flexDirection: 'row', marginVertical: 10}}
                horizontal={true}>
                {detail?.facilities_block?.facilities?.map((item, index) => (
                  <Text key={index} style={styles.facilities}>
                    {item.name}
                  </Text>
                ))}
              </ScrollView>
            </View>
            <View style={styles.cardItem}>
              <ReviewParts
                data={review}
                onPress={() => navigation.navigate('Review')}
              />
            </View>
            <View
              style={{
                borderBottomWidth: 2,
                borderBottomColor: colors.grey,
              }}>
              <Location address={detail?.address} />
            </View>
            <View
              style={{
                marginBottom: 90,
              }}>
              <Kebijakan data={detail?.hotel_text} />
            </View>
          </ScrollView>
          <View style={styles.SelectRoom}>
            <View>
              <Text style={{fontSize: 10, color: colors.white}}>
                Harga Mulai
              </Text>
              <Text
                style={{
                  color: colors.yellow,
                  fontWeight: 'bold',
                  fontSize: 15,
                }}>
                {formatIDR.format(detail?.composite_price_breakdown?.all_inclusive_amount?.value)}
                <Text
                  style={{
                    color: colors.white,
                    fontWeight: 'normal',
                    fontSize: 10,
                  }}>
                  /malam
                </Text>
              </Text>
            </View>
            <Button
              onPress={() =>
                navigation.navigate('Rooms', {
                  hotel_id: hotel_id,
                  checkOut: checkOut,
                  checkIn: checkIn,
                  guests: guests,
                  rooms: rooms,
                  image
                })
              }
              title="Pilih Kamar"
              color={colors.yellow}
              size={10}
              width={100}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cardItem: {
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderTopColor: colors.grey,
    borderBottomColor: colors.grey,
  },
  image: {
    height: 230,
    width: "100%",
  },
  header: {
    position: 'absolute',
    padding: 10,
    margin: 10,
  },
  price: {
    textAlign: 'right',
    color: colors.white,
  },
  boxPrice: {
    position: 'absolute',
    backgroundColor: colors.darkBlue,
    right: 0,
    bottom: 10,
    paddingLeft: 20,
    paddingRight: 10,
    paddingVertical: 5,
    borderBottomLeftRadius: 20,
  },
  container: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    color: colors.darkBlue,
    fontWeight: 'bold',
  },
  facilities: {
    backgroundColor: colors.darkBlue,
    color: colors.white,
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
  },
  description: {
    fontSize: 14,
    textAlign: 'justify',
    color: colors.darkGrey,
  },
  SelectRoom: {
    margin: 15,
    borderRadius: 10,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.darkBlue,
    alignItems: 'center',
    padding: 10,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
