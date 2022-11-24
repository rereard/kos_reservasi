import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Button from '../../atoms/Button';
import {colors} from '../../../utils';

export default function Header({title, onPress}) {
  return (
    <View style={styles.container}>
      <Button
        type="icon"
        icon={'chevron-back-outline'}
        size={25}
        color={colors.white}
        onPress={onPress}
      />
      <Text style={styles.text}>{title}</Text>
      <View style={{width: 25}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: colors.white,
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
