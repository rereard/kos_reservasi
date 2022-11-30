import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {colors} from '../../../../utils';

export default function Location({address}) {
  return (
    <View style={styles.location}>
      <Text style={{color: colors.darkBlue, fontWeight: 'bold'}}>Location</Text>
      <Text>{address}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  location: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
});
