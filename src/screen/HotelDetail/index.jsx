import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../../component/molecules/Header';
import {colors} from '../../utils';
import RatingStar from '../../component/atoms/RatingStar';
import Button from '../../component/atoms/Button';
import axios from 'axios';
import ReviewParts from './parts/Review';

export default function DetailHotel({route, navigation}) {
  const {hotel_id, checkIn, checkOut, guests, rooms} = route.params;

  const [lineText, setLineText] = useState(3);
  const [isFavorite, setIsFavorite] = useState(false);
  const [detail, setDetailHotel] = useState([]);
  const [description, setDescription] = useState([]);

  const readMore = () => {
    if (lineText === 0) {
      setLineText(3);
    } else {
      setLineText(0);
    }
  };

  console.log('==>', description);

  useEffect(() => {
    axios
      .get(
        'https://apidojo-booking-v1.p.rapidapi.com/properties/get-description',
        {
          params: {
            hotel_ids: hotel_id,
            languagecode: 'id',
          },
          headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
            'X-RapidAPI-Host': 'apidojo-booking-v1.p.rapidapi.com',
          },
        },
      )
      .then(response => {
        setDescription(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  console.log(description);
  useEffect(() => {
    axios
      .get('https://apidojo-booking-v1.p.rapidapi.com/properties/detail', {
        params: {
          hotel_id: hotel_id,
          search_id: 'none',
          departure_date: checkOut,
          arrival_date: checkIn,
          rec_guest_qty: guests,
          rec_room_qty: rooms,
          currency_code: 'IDR',
          languagecode: 'id',
        },
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
          'X-RapidAPI-Host': 'apidojo-booking-v1.p.rapidapi.com',
        },
      })
      .then(response => {
        setDetailHotel(response.data[0]);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: colors.white, flex: 1}}>
      <ScrollView>
        <View>
          <Image
            source={{
              uri: 'https://img.inews.co.id/media/822/files/inews_new/2022/03/25/Hotel_Dekat_Malioboro.jpg',
            }}
            style={styles.image}
          />
          <View style={styles.header}>
            <Header onPress={() => navigation.goBack()} />
          </View>
          <View style={styles.boxPrice}>
            <Text style={styles.price}>RP 200.000</Text>
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
              <View style={{flexDirection: 'row'}}>
                <RatingStar />
                <View
                  style={{
                    marginLeft: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Button
                    type="icon"
                    icon={'location-outline'}
                    color={colors.darkBlue}
                    size={15}
                  />
                  <Text style={{marginLeft: 5}}>{detail?.city}</Text>
                </View>
              </View>
            </View>
            <View>
              <Button
                type="icon"
                icon={isFavorite ? 'heart' : 'heart-outline'}
                onPress={() => setIsFavorite(!isFavorite)}
                color={isFavorite ? colors.pink : colors.darkBlue}
                size={30}
              />
            </View>
          </View>
          <ScrollView
            style={{flexDirection: 'row', marginVertical: 10}}
            horizontal={true}>
            <Text style={styles.facilities}>Bathub in room</Text>
            <Text style={styles.facilities}>Connecting rooms available</Text>
            <Text style={styles.facilities}>Internet Access</Text>
            <Text style={styles.facilities}>Breakfast included</Text>
            <Text style={styles.facilities}>Bar</Text>
            <Text style={styles.facilities}>Airport transfers</Text>
            <Text style={styles.facilities}>24-hour front desk</Text>
          </ScrollView>
          {description ? (
            <View>
              <Text numberOfLines={lineText} style={styles.description}>
                {description[1]
                  ? description[1]?.description
                  : description[0]?.description}
              </Text>
              {lineText === 0 ? (
                <></>
              ) : (
                <Text onPress={readMore} style={{color: colors.darkBlue}}>
                  Read More..
                </Text>
              )}
            </View>
          ) : (
            <></>
          )}
          <View>
            <Text>{detail.address}</Text>
          </View>
        </View>
        <View style={styles.review}>
          <ReviewParts
            hotel_id={hotel_id}
            onPress={() => navigation.navigate('Review')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  review: {
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderTopColor: colors.grey,
    borderBottomColor: colors.grey,
  },
  image: {
    height: 230,
    width: '100%',
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
});
