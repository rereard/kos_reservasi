import {View, Text} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import Review from '../../component/molecules/Review';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';

export default function Reviews() {
  const review = useSelector(state => state.review.review);
  return (
    <SafeAreaView>
      <ScrollView>
        {review?.map(item => (
          <View>
            <Review
              date={item?.date}
              description={item?.pros}
              title={item?.title}
              name={item?.author.name}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
