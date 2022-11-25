import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../../component/molecules/Header';
import {colors} from '../../utils';
import RatingStar from '../../component/atoms/RatingStar';
import Button from '../../component/atoms/Button';
import Review from '../../component/molecules/Review';

export default function DetailHotel({navigation}) {
  const [lineText, setLineText] = useState(3);
  const [isFavorite, setIsFavorite] = useState(false);

  const readMore = () => {
    if (lineText === 0) {
      setLineText(3);
    } else {
      setLineText(0);
    }
  };
  return (
    <SafeAreaView>
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
              <Text style={styles.title}>Hotel Name</Text>
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
                  <Text style={{marginLeft: 5}}>Jakarta</Text>
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
          <View>
            <Text numberOfLines={lineText} style={styles.description}>
              Located in Jakarta, within 5.7 km of Pondok Indah Mall and 6 km of
              Pacific Place, RedDoorz Plus near Lippo Mall Kemang 2 offers
              accommodation with a garden. The property is around 6.5 km from
              Plaza Senayan, 8.4 km from Ragunan Zoo and 10 km from Selamat
              Datang Monument. The accommodation provides a 24-hour front desk
              and free WiFi throughout the property. At the guest house each
              room includes a private bathroom. Grand Indonesia is 10 km from
              RedDoorz Plus near Lippo Mall Kemang 2, while Sarinah is 11 km
              away. The nearest airport is Halim Perdanakusuma International
              Airport, 11 km from the accommodation.
            </Text>
            {lineText === 0 ? (
              <></>
            ) : (
              <Text onPress={readMore} style={{color: colors.darkBlue}}>
                Read More..
              </Text>
            )}
          </View>
          <View>
            <Text>All Reviews</Text>
            <Review />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  },
});
