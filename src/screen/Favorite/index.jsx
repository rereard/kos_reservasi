import { useDispatch, useSelector } from 'react-redux';
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
import { Button } from '../../component/atoms';
import Icon from '../../component/atoms/Button/icon';
import HotelCard from '../../component/molecules/HotelCard';
import { colors } from '../../utils';
import KostCard from '../../component/molecules/KostCard';

const formatDate = date => {
  let month = '' + (date.getMonth() + 1);
  let day = '' + date.getDate();
  let year = date.getFullYear();

  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }
  return [year, month, day].join('-');
};

const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

export default function Favorite({ navigation }) {
  const user = useSelector(state => state?.login?.user);
  const favorites = useSelector(
    state => state?.favorite?.favorites[user?.username],
  );

  if (user) {
    return (
      <SafeAreaView>
        <View style={{ backgroundColor: colors.darkBlue, padding: 15 }}>
          <Text
            style={{
              color: colors.white,
              fontSize: 18,
              fontWeight: '700',
              textAlign: 'center',
            }}>
            Daftar Kost
          </Text>
        </View>
        <ScrollView>
          <View style={{ margin: 10, marginBottom: 50 }}>
            <View style={{ marginTop: 10 }}>
              <KostCard
                onPress={() => navigation.navigate('KosDetail')}
              />
            </View>
            {favorites ? (
              <View style={{ marginTop: 10 }}>
                {favorites?.map(item => (
                  <HotelCard
                    key={item?.hotelId}
                    hotelName={item?.hotelName}
                    hotelId={item?.hotelId}
                    image={item?.image}
                    price={item?.price}
                    reviewScore={item?.reviewScore}
                    reviewTotal={item?.reviewTotal}
                    guests={item?.guests}
                    rooms={item?.rooms}
                    address={item?.address}
                    onPress={() =>
                      navigation.navigate('DetailHotel', {
                        hotel_id: item?.hotelId,
                        checkIn: formatDate(today),
                        checkOut: formatDate(tomorrow),
                        guests: item?.guests,
                        rooms: item?.rooms,
                        image: item?.image,
                      })
                    }
                  />
                ))}
              </View>
            ) : (
              <View style={{ marginTop: 50 }}>
                <Text
                  style={{
                    color: colors.black,
                    fontSize: 18,
                    fontStyle: 'italic',
                    textAlign: 'center',
                  }}>
                  No favorite hotel yet~
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={{ flex: 1, margin: 20 }}>
        <View style={[styles.profileBox, { marginBottom: 10 }]}>
          <Text style={[styles.textHeader(colors.black), { marginBottom: 5 }]}>
            Favorite Hotel
          </Text>
          <Text style={styles.text(colors.black)}>
            Sign in to see your favorite hotels
          </Text>
        </View>
        <Button
          title="Sign in"
          color={colors.darkBlue}
          onPress={() => navigation.navigate('Sign')}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  profileBox: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  profile: {
    flexDirection: 'row',
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.darkGrey,
  },
  quantity: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  imgBorder: {
    borderRadius: 99,
    borderWidth: 3,
    borderColor: colors.darkBlue,
  },
  img: {
    height: 75,
    width: 75,
    borderRadius: 99,
  },
  textHeader: color => ({
    fontSize: 16,
    fontWeight: '700',
    color: color,
  }),
  text: color => ({
    fontSize: 15,
    color: color,
  }),
});
