import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  Image,
} from 'react-native';
import {colors} from '../../utils';
import {Button} from '../../component/atoms';

export default function Invoice({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Image
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Hotel-room-renaissance-columbus-ohio.jpg/320px-Hotel-room-renaissance-columbus-ohio.jpg',
            }}
            style={styles.img}
          />
          <View style={{padding: 15}}>
            <Text numberOfLines={2} style={styles.textHeader}>
              Lorem ipsum dolor sit amet consectetur adipisicing. Hotel
            </Text>
            <View style={styles.rowContainer}>
              <Text style={styles.text(colors.darkGrey)}>Booking ID:</Text>
              <Text
                style={[
                  styles.text(colors.black),
                  {flex: 1, textAlign: 'right'},
                ]}>
                123456
              </Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.text(colors.darkGrey)}>Length of Stay:</Text>
              <Text
                style={[
                  styles.text(colors.black),
                  {flex: 1, textAlign: 'right'},
                ]}>
                99 days
              </Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.text(colors.darkGrey)}>Check In Date:</Text>
              <Text
                style={[
                  styles.text(colors.black),
                  {flex: 1, textAlign: 'right'},
                ]}>
                22/2/2222
              </Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.text(colors.darkGrey)}>Check Out Date:</Text>
              <Text
                style={[
                  styles.text(colors.black),
                  {flex: 1, textAlign: 'right'},
                ]}>
                33/3/3333
              </Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.text(colors.darkGrey)}>Total Guests:</Text>
              <Text
                style={[
                  styles.text(colors.black),
                  {flex: 1, textAlign: 'right'},
                ]}>
                99 guests
              </Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.text(colors.darkGrey)}>Room Name:</Text>
              <Text
                style={[
                  styles.text(colors.black),
                  {flex: 1, textAlign: 'right'},
                ]}>
                xxxx
              </Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.text(colors.darkGrey)}>Total Payment:</Text>
              <Text
                style={[
                  styles.text(colors.black),
                  {flex: 1, textAlign: 'right', fontWeight: '800'},
                ]}>
                Rp 999.999
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  img: {
    width: '100%',
    height: 160,
  },
  textHeader: {
    color: colors.black,
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: colors.grey,
    paddingVertical: 15,
  },
  text: color => ({
    color: color,
    fontSize: 14,
  }),
});
