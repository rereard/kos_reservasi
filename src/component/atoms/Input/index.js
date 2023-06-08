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
        onSubmitEditing={(event) => ToastAndroid.show('A pikachu appeared nearby !', ToastAndroid.SHORT)}
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
<<<<<<< HEAD
    backgroundColor:
      backgroundColor ? backgroundColor : colors.white,
    paddingRight: type === 'password' || type === 'search' ? 40 : 20,
    paddingLeft: type === 'user' || type === 'telephone' ? 40 : 20,
    color: colors.black,
  }),
  icon: type => ({
    position: 'absolute',
    right: type === 'user' || type === 'telephone' ? null : 0,
=======
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
>>>>>>> 8dd6f49ede3a62da3b6c233aa86408cdb3c0b2d6
    top: 0,
    fontSize: 20,
    padding: 14,
    color:
<<<<<<< HEAD
      type === 'search' || type === 'user' || type === 'telephone'
=======
      type === 'search' ||
      type === 'user' ||
      type === 'telephone' ||
      type === 'email'
>>>>>>> 8dd6f49ede3a62da3b6c233aa86408cdb3c0b2d6
        ? colors.darkGrey
        : colors.black,
  }),
});
