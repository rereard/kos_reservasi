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

export default function HotelCard({onPress}) {
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
            uri: 'https://img.inews.co.id/media/822/files/inews_new/2022/03/25/Hotel_Dekat_Malioboro.jpg',
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
        <View style={styles.content}>
          <View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text numberOfLines={2} style={styles.title}>
                Golden Time Hotel
              </Text>
              <View>
                <Text style={styles.text}>Rp 200.000</Text>
                <Text style={styles.text}>/Night</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Button
                type="icon"
                icon={'star'}
                color={colors.yellow}
                size={15}></Button>
              <Text>9.99 | 99 Review</Text>
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
    maxWidth: 230,
  },
  text: {
    color: '#0364ce',
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'right',
  },
});
