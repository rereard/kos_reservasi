import {View, Text, StyleSheet, TextInput} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Logo} from '../../assets/img';
import Input from '../../component/atoms/Input';
import Button from '../../component/atoms/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Sign() {
  const [showPassword, setShowPassword] = useState(false);
  const [iconEye, setIconEye] = useState('eye-off-outline');

  const ShowPw = () => {
    if (showPassword === false) {
      setIconEye('eye-off-outline');
      setShowPassword(!showPassword);
    } else {
      setIconEye('eye-outline');
      setShowPassword(false);
    }
  };

  return (
    <View style={styles.page}>
      <View style={styles.logo}>
        <Text style={styles.title}>Log in</Text>
      </View>

      <View style={styles.Input}>
        <Input label="Email" placeholder="Email" />
        <View style={{height: 10}}></View>
        <View>
          <Input
            label="password"
            placeholder="Password"
            secureTextEntry={showPassword}
          />
          <Ionicons name={iconEye} style={styles.icon} onPress={ShowPw} />
        </View>
      </View>
      <Button title="Login" />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#0364CE',
    flex: 1,
    padding: 40,

    justifyContent: 'center',
  },
  logo: {
    alignItems: 'center',
  },
  Input: {
    marginTop: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  icon: {
    position: 'absolute',
    right: 0,
    top: 0,
    fontSize: 20,
    padding: 14,
  },
});
