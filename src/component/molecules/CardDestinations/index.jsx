import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';

export default function CardDestinations({uri}) {
  return (
    <View>
      <View style={styles.container}>
        <Image
          source={{
            uri: uri,
          }}
          style={styles.image}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  container: {
    marginRight: 6,
  },
});
