import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

export default function index({title}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    borderRadius: 10,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
  },
});
