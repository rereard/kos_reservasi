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
  Pressable,
} from 'react-native';
import {colors} from '../../../utils';

export default function BookHistoryCard({onPress, hotel_name, stay_length, checkIn, checkOut, price, mainImage}) {
  const imageResize = mainImage?.replace('square60', 'max500');
  return (
    <View style={styles.container}>
      <Pressable
        style={({pressed}) => [
          {backgroundColor: pressed ? '#e5e5e5' : 'white', borderRadius: 10},
        ]}
        onPress={onPress}>
        <Image
          source={{
            uri: imageResize,
          }}
          style={styles.img}
        />
        <View style={styles.content}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text numberOfLines={2} style={styles.textHeader(colors.black)}>
              {hotel_name}
            </Text>
            <Text style={styles.textHeader(colors.darkGrey)}>
              {checkIn} - {checkOut} ({stay_length} days)
            </Text>
          </View>
          <View style={{flex: 0.1}} />
          <View style={{justifyContent: 'center', alignItems: 'flex-end'}}>
            <Text style={styles.text(colors.darkBlue)}>{price}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    backgroundColor: colors.white,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  img: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: '100%',
    height: 100,
  },
  content: {
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 10,
  },
  textHeader: color => ({
    fontSize: 13,
    fontWeight: '600',
    color: color,
  }),
  text: color => ({
    color: color,
    fontSize: 12,
    fontWeight: '400',
  }),
});
