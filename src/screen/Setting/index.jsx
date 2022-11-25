import { StyleSheet, Text, View} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SettingsRow from './components/SettingsRow';
import Button from '../../component/atoms/Button';
import {colors} from '../../utils';
import { removeLogin } from '../../features/loginSlice';

export default function SettingScreen({navigation}) {

  const dispatch = useDispatch()

  const user = useSelector((state) => state.login.user)

  return (
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.boxHeader}>My Account</Text>
          {user ? (
            <>
              <SettingsRow
                titleIcon={<Ionicons name="person" style={{color: '#0364CE'}} />}
                title="Username"
                dataEditable={true}
                data={user?.username}
                prop="username"
              />
              <SettingsRow
                titleIcon={<Ionicons name="key" style={{color: '#0364CE'}} />}
                title="Password"
                dataEditable={true}
                isPassword={true}
                data={user?.pass}
                prop="pass"
              />
              <SettingsRow
                titleIcon={<Ionicons name="mail" style={{color: '#0364CE'}} />}
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
            </>
          ) : (
              <Text style={{ color: colors.black }}>Sign in to see your account settings</Text>
          )}
        </View>
        <Button 
          onPress={user ? 
            () => {
              dispatch(removeLogin())
              navigation.navigate("Home")
            } :
            () => {
              navigation.navigate("Sign")
            }
          } 
          title={user ? "Sign out" : "Sign in"} 
          color={colors.darkBlue} 
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  box: {
    padding: 10,
    backgroundColor: colors.white,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000", 
    shadowOffset: { 
        width: 0, 
        height: 2 
    }, 
    shadowOpacity: 0.25, 
    shadowRadius: 4, 
    elevation: 5,
  },
  boxHeader: {
    color: colors.black,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 5,
  },
});
