import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {colors} from '../../../utils';

export default function Review({date, description, title, name}) {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.reviewer}>{name}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Text style={styles.badge} numberOfLines={2}>
        {title}
      </Text>
      <Text style={styles.description} numberOfLines={3}>
        {description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.grey,
    padding: 10,
    borderRadius: 10,
    marginRight: 5,
    width: 300,
    height: 180,
  },
  date: {
    color: colors.darkBlue,
  },
  description: {
    paddingVertical: 15,
    color: colors.darkGrey,
  },
  badge: {
    marginTop: 10,
    fontWeight: 'bold',
    color: colors.darkGrey,
  },
  reviewer: {
    fontWeight: 'bold',
    color: colors.darkBlue,
  },
});
