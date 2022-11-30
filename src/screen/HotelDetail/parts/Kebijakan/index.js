import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../../../../utils';
import React from 'react';

export default function Kebijakan({data}) {
  return (
    <View style={styles.kebijakan}>
      <Text
        style={{
          color: colors.darkBlue,
          fontWeight: 'bold',
          marginBottom: 10,
        }}>
        Kebijakan
      </Text>
      <View>
        {data?.policies?.map((item, index) => (
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: colors.darkGrey}}>{index + 1}.</Text>
            <Text
              style={{
                marginBottom: 5,
                color: colors.darkGrey,
                marginHorizontal: 10,
                textAlign: 'auto',
              }}>
              {item.content}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  kebijakan: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
});
