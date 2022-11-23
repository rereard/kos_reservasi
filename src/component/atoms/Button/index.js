import {Text, StyleSheet} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function Button({title, type, onPress}) {
  return (
    <TouchableOpacity style={styles.container(type)} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: type => ({
    backgroundColor: type === 'secondary' ? 'white' : '#FFDD00',
    paddingVertical: 10,
    borderRadius: 10,
  }),
  text: {
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
  },
});
