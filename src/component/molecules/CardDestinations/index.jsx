import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import {colors} from '../../../utils';

export default function CardDestinations({uri, title, onPress}) {
  return (
    <Pressable
      style={({pressed}) => [
        {backgroundColor: pressed ? '#e5e5e5' : 'white', borderRadius: 10},
      ]}
      onPress={onPress}>
      <View style={styles.container}>
        <Image
          source={{
            uri: uri,
          }}
          style={styles.image}
        />
        <View style={styles.title}>
          <Text style={{color: colors.white, textAlign: 'center'}}>
            {title}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  title: {
    backgroundColor: colors.darkBlue,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    paddingVertical: 3,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  container: {
    marginRight: 6,
  },
});
