import {View, TextInput, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../../utils';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Input({placeholder, onChangeText, type}) {
  const [showPassword, setShowPassword] = useState(true);
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
    <View>
      <TextInput
        style={styles.Input(type)}
        placeholder={placeholder}
        onChangeText={onChangeText}
        secureTextEntry={showPassword}
      />
      {type === 'password' ? (
        <Ionicons name={iconEye} style={styles.icon} onPress={ShowPw} />
      ) : (
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  Input: type => ({
    borderRadius: 10,
    backgroundColor: colors.white,
    paddingRight: type === 'password' ? 40 : 20,
    paddingLeft: 20,
  }),
  label: {
    color: colors.white,
    marginVertical: 5,
  },
  icon: {
    position: 'absolute',
    right: 0,
    top: 0,
    fontSize: 20,
    padding: 14,
  },
});
