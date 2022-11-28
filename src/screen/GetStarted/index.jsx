import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Logo, Ilustraion1} from '../../assets/img';
import Button from '../../component/atoms/Button';
import {colors} from '../../utils';

export default function GetStarted({navigation}) {
  return (
    <View style={styles.page}>
      <View></View>
      <View style={styles.content}>
        <Logo width={120} />
        <Ilustraion1 />
        <Text style={styles.text}>
          Find your hotel easily and travel anywhere you want with us
        </Text>
      </View>
      <View>
        <Button
          title="Get Started"
          color={colors.yellow}
          onPress={() => navigation.navigate('main')}
        />
        <View style={{height: 10}}></View>
        <Button
          title="Sign in"
          color={colors.white}
          onPress={() => navigation.navigate('Sign')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.darkBlue,
    flex: 1,
    justifyContent: 'space-between',
    padding: 30,
  },
  content: {
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    color: colors.white,
  },
});
