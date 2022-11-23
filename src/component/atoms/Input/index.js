import {View, Text, TextInput, StyleSheet} from 'react-native';
import React from 'react';

export default function Input({
  label,
  placeholder,
  onChangeText,
  secureTextEntry,
}) {
  return (
    <View>
      <TextInput
        style={styles.Input}
        placeholder={placeholder}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  Input: {
    borderRadius: 10,
    backgroundColor: 'white',
  },
  label: {
    color: 'white',
    marginVertical: 5,
  },
});
