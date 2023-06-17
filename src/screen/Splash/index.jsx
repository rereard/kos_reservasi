import { View, StyleSheet, Text, Image } from 'react-native';
import React, { useEffect } from 'react';
import { Logo } from '../../assets/img';
import { colors } from '../../utils';
import { useSelector, useDispatch } from 'react-redux';
// import { setIsOnApp } from '../../features/loginSlice';
import { setIsOnApp } from '../../features/onAppSlice';

export default function Splash({ navigation }) {

  const user = useSelector(state => state.login.user)
  const isOnApp = useSelector(state => state.onApp.isOnApp)
  const dispatch = useDispatch()

  useEffect(() => {
    setTimeout(() => {
      navigation.replace(user ? 'main' : 'Sign');
      dispatch(setIsOnApp(true))
    }, 1500);
  }, []);

  return (
    <View style={styles.page}>
      <Text style={styles.text}>
        Reservasi kost
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.darkBlue,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white
  }
});
