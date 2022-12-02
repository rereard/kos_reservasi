import {View, Text, ScrollView, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ReviewCard} from '../../../../component/molecules';
import {fetchReview} from '../../../../features/ReviewSlice';
import {colors} from '../../../../utils';

export default function ReviewParts({data, onPress}) {
  return (
    <View style={{marginVertical: 10}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 10,
          marginBottom: 10,
        }}>
        <Text style={styles.bestReview}>Best Reviews</Text>
        <Text style={styles.allReview} onPress={onPress}>
          All Review
        </Text>
      </View>
      <ScrollView horizontal={true} style={{flexDirection: 'row'}}>
        {data?.slice(0, 5).map((item,index) => (
          <View key={index} style={{marginLeft: 10}}>
            <ReviewCard
              date={item?.date}
              description={item?.pros}
              title={item?.title}
              name={item?.author.name}
              width={300}
              height={180}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  bestReview: {
    color: colors.darkBlue,
    fontWeight: 'bold',
  },
  allReview: {
    color: colors.darkBlue,
    textAlign: 'center',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
