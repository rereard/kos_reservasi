import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {Header, ReviewCard} from '../../component/molecules';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import {colors} from '../../utils';

export default function Reviews({navigation}) {
  const review = useSelector(state => state.review.review);
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ marginBottom: 30 }}>
          <View style={{backgroundColor: colors.darkBlue, padding: 10, marginBottom: 10}}>
            <Header title="Review" onPress={() => navigation.goBack()} />
          </View>
          {review?.map((item, index) => (
            <View key={index} style={styles.container}>
              <ReviewCard
                date={item?.date}
                description={item?.pros}
                title={item?.title}
                name={item?.author.name}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
});
