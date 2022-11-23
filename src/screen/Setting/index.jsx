import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SettingsRow from '../Setting/components/SettingsRow';

export default function SettingScreen() {
  const [username, setUsername] = useState('rerea');
  const [fullname, setFullname] = useState('Rere Ardany');
  const [password, setPassword] = useState('WIP');

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.boxHeader}>My Account</Text>
          <SettingsRow
            titleIcon={<Ionicons name="person" style={{color: '#e75874'}} />}
            title="Username"
            dataEditable={true}
            data={username}
            setEditedData={setUsername}
          />
          {/* Work in progress hiding password text */}
          <SettingsRow
            titleIcon={<Ionicons name="key" style={{color: '#e75874'}} />}
            title="Password"
            dataEditable={true}
            data={password}
            setEditedData={setPassword}
          />
          <SettingsRow
            title="Fullname"
            dataEditable={true}
            data={fullname}
            setEditedData={setFullname}
          />
          <SettingsRow
            titleIcon={<Ionicons name="log-out" style={{color: '#e75874'}} />}
            title="Logout"
            pressable={true}
            onPress={() => {}}
          />
        </View>
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
  },
  boxHeader: {
    color: '#000',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 5,
  },
});
