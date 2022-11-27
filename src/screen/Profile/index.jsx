import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  Image,
} from 'react-native';
import {colors} from '../../utils';
import {useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BookHistoryCard from '../../component/molecules/BookHistoryCard';
import {Button} from '../../component/atoms';

export default function Profile({navigation}) {
  const user = useSelector(state => state.login.user);

  if (user) {
    return (
      <SafeAreaView>
        <ScrollView>
          <View style={{margin: 20}}>
            <Text style={[styles.textHeader(colors.black), {marginBottom: 10}]}>
              <Ionicons
                name="md-person-outline"
                style={{fontSize: 18, color: colors.darkBlue}}
              />{' '}
              My Profile
            </Text>
            <View style={styles.profileBox}>
              <View style={styles.profile}>
                <View style={styles.imgBorder}>
                  <Image source={{uri: user?.image}} style={styles.img} />
                </View>
                <View style={{flex: 0.1}}></View>
                <View style={{justifyContent: 'center'}}>
                  <Text style={styles.textHeader(colors.black)}>
                    {user?.firstName} {user?.lastName}
                  </Text>
                  <Text
                    style={[styles.text(colors.darkGrey), {marginVertical: 3}]}>
                    @{user?.username}
                  </Text>
                  <Text style={styles.text(colors.darkGrey)}>
                    {user?.email}
                  </Text>
                </View>
              </View>
              <View style={styles.quantity}>
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.textHeader(colors.black)}>Bookings</Text>
                  <Text style={styles.textHeader(colors.darkBlue)}>99</Text>
                </View>
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.textHeader(colors.black)}>Favorites</Text>
                  <Text style={styles.textHeader(colors.darkBlue)}>99</Text>
                </View>
              </View>
            </View>
            <Text
              style={[
                styles.textHeader(colors.black),
                {marginTop: 20, marginBottom: 10},
              ]}>
              <Ionicons
                name="md-timer-outline"
                style={{fontSize: 18, color: colors.darkBlue}}
              />{' '}
              Booking History
            </Text>
            <BookHistoryCard
              onPress={() => navigation.navigate('DetailHotel')}
            />
            <BookHistoryCard
              onPress={() => navigation.navigate('DetailHotel')}
            />
            <BookHistoryCard
              onPress={() => navigation.navigate('DetailHotel')}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={{flex: 1, margin: 20}}>
        <View style={[styles.profileBox, {marginBottom: 10}]}>
          <Text style={[styles.textHeader(colors.black), {marginBottom: 5}]}>
            My Profile
          </Text>
          <Text style={styles.text(colors.black)}>
            Sign in to see your account's profile
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
    fontSize: 18,
    fontWeight: '700',
    color: color,
  }),
  text: color => ({
    fontSize: 15,
    color: color,
  }),
});
