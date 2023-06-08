import { View, StyleSheet, Text, Image } from 'react-native';
import React, { useEffect } from 'react';
import { Logo } from '../../assets/img';
import { colors } from '../../utils';
import { useSelector } from 'react-redux';

export default function Splash({ navigation }) {

  const user = useSelector(state => state.login.user)

  useEffect(() => {
    setTimeout(() => {
      navigation.replace(user ? 'main' : 'GetStarted');
    }, 3000);
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
