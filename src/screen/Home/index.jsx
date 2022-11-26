import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

import {colors} from '../../utils';
import {Button, Date, Input} from '../../component/atoms';
import Header from '../../component/molecules/Header';

export default function Home({navigation}) {
  return (
    <SafeAreaView style={{backgroundColor: colors.white, flex: 1}}>
      <ScrollView>
        <View style={styles.header}>
          <Header type="user" onPress={() => navigation.navigate('Sign')} />
          <Text style={styles.title}>
            Find deals on hotels, homes, and much more...
          </Text>
          <View style={styles.boxSearch}>
            <Input placeholder="Search place or lacation.." />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 10,
                alignItems: 'center',
              }}>
              <Input type="date" width={120} title="Check in" />
              <Text style={{fontSize: 20}}>-</Text>
              <Input type="date" width={120} title="Check Out" />
            </View>
            <Button title="Search" color={colors.darkBlue} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    color: colors.darkBlue,
    width: 300,
    marginTop: 30,
  },
  boxSearch: {
    backgroundColor: colors.grey,
    padding: 20,
    marginTop: 30,
    borderRadius: 20,
  },
});
