import {View, Text, ScrollView, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Review from '../../../../component/molecules/Review';
import {fetchReview} from '../../../../features/ReviewSlice';
import {colors} from '../../../../utils';

export default function ReviewParts(props) {
  const {hotel_id, onPress} = props;
  const review = useSelector(state => state.review.review);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchReview(props));
  }, []);

  console.log(review);

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
        {review?.slice(0, 5).map(item => (
          <View style={{marginLeft: 10}}>
            <Review
              date={item?.date}
              description={item?.pros}
              title={item?.title}
              name={item?.author.name}
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
  },
  allReview: {
    color: colors.darkBlue,
    textAlign: 'center',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
