import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {SettingsRow} from './parts';
import Button from '../../component/atoms/Button';
import {colors} from '../../utils';
import {removeLogin} from '../../features/loginSlice';

export default function Profile({navigation}) {
  const dispatch = useDispatch();

  const user = useSelector(state => state?.login?.user);
  const favorites = useSelector(state => state?.favorite?.favorites)
  const bookHistories = useSelector(state => state?.bookHistory?.bookHistories)

  return (
    <SafeAreaView style={styles.page}>
      <ScrollView>
        <View style={styles.container}>
          {user ? (
            <>
              <Text style={styles.header}>Profile</Text>
              <View style={styles.profileUser}>
                <Image source={{uri: user?.image}} style={styles.image} />
                <View style={{marginTop: 10}}>
                  <Text style={styles.userName}>
                    {user?.firstName} {user?.lastName}
                  </Text>
                  <Text style={styles.email}>{user?.email}</Text>
                </View>
              </View>
              <View style={styles.boxActivity}>
                <View style={styles.activity}>
                  <View style={{marginHorizontal: 10}}>
                    <Text
                      style={styles.totalActivity}
                      onPress={() => navigation.navigate('Receipt')}>
                      {bookHistories[user?.username]?.length || 0}
                    </Text>
                    <Text style={styles.titleActivity}>Booking</Text>
                  </View>
                  <View style={{marginHorizontal: 10}}>
                    <Text
                      style={styles.totalActivity}
                      onPress={() => navigation.navigate('Favorite')}>
                      {favorites[user?.username]?.length || 0}
                    </Text>
                    <Text style={styles.titleActivity}>Favorites</Text>
                  </View>
                </View>
              </View>
              <View style={styles.box}>
                <SettingsRow
                  title="Username"
                  dataEditable={true}
                  data={user?.username}
                  prop="username"
                />
                <SettingsRow
                  title="Password"
                  dataEditable={true}
                  isPassword={true}
                  data={user?.pass}
                  prop="pass"
                />
                <SettingsRow
                  title="Email"
                  dataEditable={true}
                  data={user?.email}
                  prop="email"
                />
                <SettingsRow
                  title="First Name"
                  dataEditable={true}
                  data={user?.firstName}
                  prop="firstName"
                />
                <SettingsRow
                  title="Last Name"
                  dataEditable={true}
                  data={user?.lastName}
                  prop="lastName"
                />
                <SettingsRow
                  title="Phone"
                  dataEditable={true}
                  data={user?.phone}
                  prop="phone"
                />
              </View>
            </>
          ) : (
            <View style={[styles.profileBox, {marginBottom: 10}]}>
              <Text style={[styles.textHeader(colors.black), {marginBottom: 5}]}>
                My Profile
              </Text>
              <Text style={styles.text(colors.black)}>
                Sign in to see your account settings
              </Text>
            </View>
          )}

          <Button
            onPress={
              user
                ? () => {
                    dispatch(removeLogin());
                    navigation.navigate('Home');
                  }
                : () => {
                    navigation.navigate('Sign');
                  }
            }
            title={user ? 'Sign out' : 'Sign in'}
            color={colors.darkBlue}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
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
  textHeader: color => ({
    fontSize: 16,
    fontWeight: '700',
    color: color,
  }),
  text: color => ({
    fontSize: 15,
    color: color,
  }),
  header: {
    color: colors.black,
    fontSize: 18,
  },
  container: {
    padding: 20,
  },
  profileUser: {
    alignItems: 'center',
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    color: colors.black,
  },
  email: {
    fontSize: 12,
    textAlign: 'center',
    color: colors.darkGrey,
  },
  page: {
    flex: 1,
  },
  totalActivity: {
    fontWeight: 'bold',
    color: colors.darkBlue,
    fontSize: 18,
    textAlign: 'center',
  },
  titleActivity: {
    color: colors.darkGrey,
    fontSize: 12,
    textAlign: 'center',
  },
  activity: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
  },
  boxActivity: {
    marginVertical: 10,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: colors.grey,
    borderBottomWidth: 1,
  },
  image: {
    width: 90,
    height: 90,
    borderWidth: 2,
    borderRadius: 99,
    borderColor: colors.darkBlue,
  },
  box: {
    padding: 10,
    backgroundColor: colors.white,
    borderRadius: 10,
    marginBottom: 10,
  },
  boxHeader: {
    color: colors.black,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 5,
  },
});
