import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SettingsRow from './components/SettingsRow';
import Button from '../../component/atoms/Button';
import {colors} from '../../utils';

export default function SettingScreen() {
  const [username, setUsername] = useState('rerea');
  const [fullname, setFullname] = useState('Rere Ardany');
  const [password, setPassword] = useState('tespassword');

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.boxHeader}>My Account</Text>
          <SettingsRow
            titleIcon={<Ionicons name="person" style={{color: '#0364CE'}} />}
            title="Username"
            dataEditable={true}
            data={username}
            setEditedData={setUsername}
          />
          {/* Work in progress hiding password text */}
          <SettingsRow
            titleIcon={<Ionicons name="key" style={{color: '#0364CE'}} />}
            title="Password"
            dataEditable={true}
            isPassword={true}
            data={password}
            setEditedData={setPassword}
          />
          <SettingsRow
            title="Fullname"
            dataEditable={true}
            data={fullname}
            setEditedData={setFullname}
          />
        </View>
        <Button title="Logout" color={colors.darkBlue} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  box: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
  },
  boxHeader: {
    color: '#000',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 5,
  },
});
