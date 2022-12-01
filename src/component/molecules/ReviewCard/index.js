import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {colors} from '../../../utils';

export default function ReviewCard({
  date,
  description,
  title,
  name,
  width,
  height,
}) {
  return (
    <View style={styles.container(width, height)}>
      <View style={styles.header}>
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
  container: (width, height) => ({
    backgroundColor: colors.grey,
    padding: 10,
    borderRadius: 10,
    width: width,
    height: height,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  }),
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingBottom: 8,
    borderColor: colors.darkGrey,
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
