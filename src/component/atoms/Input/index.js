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
  keyboard
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
        keyboardType={keyboard}
        style={styles.Input(type, backgroundColor)}
        placeholder={placeholder}
        onChangeText={onChangeText}
        secureTextEntry={showPassword}
        placeholderTextColor={colors.darkGrey}
        value={value}
        onSubmitEditing={() => {}}
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
      {type === 'email' ? (
        <Ionicons name={'mail-outline'} style={styles.icon(type)} />
      ) : (
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  Input: (type, backgroundColor) => ({
    borderRadius: 10,
    backgroundColor: backgroundColor ? backgroundColor : colors.white,
    paddingRight: type === 'password' || type === 'search' ? 30 : 15,
    paddingLeft:
      type === 'user' || type === 'telephone' || type === 'email' ? 30 : 15,
    color: colors.black,
    borderWidth: 1,
    borderColor: colors.darkGrey
  }),
  icon: type => ({
    position: 'absolute',
    right:
      type === 'user' || type === 'telephone' || type === 'email' ? null : 0,
    top: 0,
    fontSize: 20,
    padding: 14,
    color:
      type === 'search' ||
      type === 'user' ||
      type === 'telephone' ||
      type === 'email'
        ? colors.darkGrey
        : colors.black,
  }),
});
