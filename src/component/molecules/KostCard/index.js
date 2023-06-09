import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  Pressable,
  Image,
} from 'react-native';
import {Button} from '../../atoms';
import Icon from '../../atoms/Button/icon';
import {colors} from '../../../utils';

export default function KostCard({onPress}) {
  return (
    <View
      style={{
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
      }}>
      <Pressable
        style={({pressed}) => [
          {backgroundColor: pressed ? '#e5e5e5' : 'white', borderRadius: 10},
        ]}
        onPress={onPress}
      >
        <Image
          source={{
            uri: 'https://www.99.co/id/panduan/wp-content/uploads/2022/11/memulai-bisnis-kos-kosan-1000x630.png',
          }}
          style={{
            height: 150,
            width: '100%',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
        />
        <View
          style={{
            padding: 8,
          }}>
          <View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{flex: 1}}>
                <Text
                  numberOfLines={2}
                  style={{
                    color: '#0364ce',
                    fontWeight: 'bold',
                    fontSize: 16,
                    marginBottom: 5,
                    maxWidth: 210,
                  }}>
                  Kos Testing
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Button
                    type="icon"
                    color={colors.darkGrey}
                    icon={'bed-outline'}
                    size={15}
                  />
                  <Text
                    numberOfLines={1}
                    style={{color: colors.darkGrey, maxWidth: 170}}>
                    Kamar tes 1
                  </Text>
                </View>
                
              </View>
              <View>
                <Text
                  style={{
                    color: '#0364ce',
                    fontSize: 15,
                    fontWeight: '400',
                    textAlign: 'right',
                  }}>
                  Rp 500.000,00
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
}
