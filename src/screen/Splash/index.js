import {View, StyleSheet, Text, Image} from 'react-native';
import React, {useEffect} from 'react';
import {Logo} from '../../assets/img';

export default function Splash({navigation}) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('GetStarted');
    }, 3000);
  }, []);

  return (
    <View style={styles.page}>
      <Logo />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#0364CE',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
