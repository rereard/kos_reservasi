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
} from 'react-native';
import { Button } from '../../component/atoms';
import HotelCard from '../../component/molecules/HotelCard';
import { colors } from '../../utils';
export default function Favorite({navigation}) {

  const user = useSelector(state => state?.login?.user)
  const favorites = useSelector(state => state?.favorite?.favorites[user?.username])

  if(user){
    return (
      <SafeAreaView>
        <ScrollView>
          <View style={{ margin: 20 }}>
            <Text style={{ color: colors.black, fontSize: 18, fontWeight: "700" }}>Favorite Hotel</Text>
            {favorites ? (
              <View style={{ marginTop: 15 }}>
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
                  />
                ))}
              </View>
            ) : (
              <View style={{ marginTop: 50 }}>
                <Text style={{ color: colors.black, fontSize: 18, fontStyle: "italic", textAlign: "center" }}>No favorite hotel yet~</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  } else {
    return (
      <SafeAreaView style={{flex: 1, margin: 20}}>
        <View style={[styles.profileBox, {marginBottom: 10}]}>
          <Text style={[styles.textHeader(colors.black), {marginBottom: 5}]}>
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
    )
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
