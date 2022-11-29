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
import {useState} from 'react';
import Button from '../../atoms/Button';
import {colors} from '../../../utils';

export default function HotelCard({
  onPress,
  image,
  hotelName,
  price,
  reviewScore,
  reviewTotal,
  address,
  city,
}) {
  const imageResize = image?.replace('square60', 'max500');

  const [isFavorite, setIsFavorite] = useState(false);

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
          style={styles.image}
        />
        <View style={styles.favoriteBtn}>
          <Button
            type="icon"
            icon={isFavorite ? 'heart' : 'heart-outline'}
            onPress={() => setIsFavorite(!isFavorite)}
            color={isFavorite ? colors.pink : colors.white}
            size={30}
          />
        </View>
        <View style={styles.rating}>
          <Button
            type="icon"
            icon={'star'}
            color={colors.yellow}
            size={15}></Button>
          <Text style={{color: colors.white, marginLeft: 5}}>
            {reviewScore} | {reviewTotal} Review
          </Text>
        </View>
        <View style={styles.content}>
          <View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text numberOfLines={2} style={styles.title}>
                  {hotelName}
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Button
                    type="icon"
                    color={colors.darkGrey}
                    icon={'location-outline'}
                    size={15}
                  />
                  <Text>{address ? address : city}</Text>
                </View>
              </View>
              <View>
                <Text style={styles.text}>Rp {price}</Text>
                <Text style={styles.text}>/Night</Text>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#0364ce',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
  },
  image: {
    height: 150,
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  favoriteBtn: {
    position: 'absolute',
    padding: 10,
    right: 5,
    top: 5,
  },
  content: {
    padding: 8,
  },
  title: {
    color: '#0364ce',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    maxWidth: 210,
  },
  text: {
    color: '#0364ce',
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'right',
  },
  rating: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    padding: 5,
    backgroundColor: colors.darkBlue,
    borderTopStartRadius: 10,
    borderBottomEndRadius: 10,
  },
});
