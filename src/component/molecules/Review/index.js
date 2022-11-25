import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {colors} from '../../../utils';
import RatingStar from '../../atoms/RatingStar';

export default function Review() {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.reviewer}>Reviewer Name</Text>
        <Text style={styles.date}>Jun 4, 2020</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <RatingStar />
        <Text style={styles.badge}>Verry Good</Text>
      </View>
      <Text style={styles.description}>
        "Super clean, friendly staff, great location and good price. What more
        can you ask for?""
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  date: {
    color: colors.darkBlue,
  },
  description: {
    paddingVertical: 15,
  },
  badge: {
    marginLeft: 10,
  },
  reviewer: {
    fontWeight: 'bold',
    color: colors.darkBlue,
  },
});
