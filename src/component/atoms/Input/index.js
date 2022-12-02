import {View, TextInput, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../../utils';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Input({
  placeholder,
  onChangeText,
  type,
  backgroundColor,
  value,
}) {
  const [showPassword, setShowPassword] = useState(
    type === 'password' ? true : false,
  );
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
        style={styles.Input(type, backgroundColor)}
        placeholder={placeholder}
        onChangeText={onChangeText}
        secureTextEntry={showPassword}
        placeholderTextColor={colors.darkGrey}
        value={value}
      />
      {type === 'password' ? (
        <Ionicons name={iconEye} style={styles.icon(type)} onPress={ShowPw} />
      ) : (
        <></>
      )}
      {type === 'search' ? (
        <Ionicons name={'search-outline'} style={styles.icon(type)} />
      ) : (
        <></>
      )}
      {type === 'user' ? (
        <Ionicons name={'person-outline'} style={styles.icon(type)} />
      ) : (
        <></>
      )}
      {type === 'telephone' ? (
        <Ionicons name={'call-outline'} style={styles.icon(type)} />
      ) : (
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  Input: (type, backgroundColor) => ({
    borderRadius: 10,
    backgroundColor:
      backgroundColor === backgroundColor ? backgroundColor : colors.white,
    paddingRight: type === 'password' || type === 'search' ? 40 : 20,
    paddingLeft: type === 'user' || type === 'telephone' ? 40 : 20,
    color: colors.black,
  }),
  icon: type => ({
    position: 'absolute',
    right: type === 'user' || type === 'telephone' ? null : 0,
    top: 0,
    fontSize: 20,
    padding: 14,
    color:
      type === 'search' || type === 'user' || type === 'telephone'
        ? colors.darkGrey
        : colors.black,
  }),
});
