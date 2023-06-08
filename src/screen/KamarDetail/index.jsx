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
import { colors } from '../../utils';
import { Button } from '../../component/atoms';
import { Header } from '../../component/molecules';
import ImageView from 'react-native-image-viewing'
import Swiper from 'react-native-swiper';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from '../../component/atoms/Button/icon';

const FacilityText = ({ text }) => {
  return (
    <Text style={{ color: colors.darkGrey, flexBasis: '50%', marginBottom: 7, fontSize: 15 }}>
      {text}
    </Text>
  )
}

const images = [
  {
    uri: "https://www.99.co/id/panduan/wp-content/uploads/2022/11/memulai-bisnis-kos-kosan-1000x630.png",
  },
  {
    uri: "https://mojok.co/wp-content/uploads/2021/05/Jasa-info-kos-dibutuhkan-atau-meresahkan.jpeg",
  },
  {
    uri: "https://www.pajak.com/storage/2022/08/indekos-1024x662.png",
  },
];
export default function KamarDetail({ navigation }) {
  const [visible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <ScrollView>
        <View>
          <ImageView
            images={images}
            imageIndex={currentImageIndex}
            visible={visible}
            onRequestClose={() => setIsVisible(false)}
            FooterComponent={({ imageIndex }) => (
              <View style={{
                height: 64,
                backgroundColor: "#00000077",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <Text style={{
                  fontSize: 17,
                  color: "#FFF"
                }}>
                  {`${imageIndex + 1} / ${images.length}`}
                </Text>
              </View>
            )}
          />
          <Swiper style={{ height: 230 }} index={currentImageIndex} loop={false} activeDotColor={colors.darkBlue}>
            {images.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => {
                  setIsVisible(true)
                  setCurrentImageIndex(index)
                }}
                  activeOpacity={1}
                >
                  <Image
                    key={index}
                    source={{ uri: item.uri }}
                    style={{
                      height: 230,
                      width: '100%',
                    }}
                  />
                </TouchableOpacity>
              )
            })}
          </Swiper>
          <View style={{
            position: 'absolute',
            padding: 5,
            margin: 0,
            zIndex: 1
          }}>
            <Header onPress={() => navigation.goBack()} size={35} />
          </View>
          <View style={{
            padding: 10,
            paddingTop: 0
          }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 15,
              borderBottomWidth: 0.2,
              borderBottomColor: colors.darkGrey,
            }}>
              <Text style={{
                fontSize: 18,
                color: colors.black,
                fontWeight: 'bold',
              }}>
                Kamar 1
              </Text>
              <View>
                <Text style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: colors.black
                }}>Rp 200.000,00</Text>
                <Text style={{ color: colors.darkGrey, textAlign: 'right' }}>/bulan</Text>
              </View>
            </View>
            <View style={{
              marginTop: 20
            }}>
              <Text style={{
                color: colors.black,
                fontWeight: 'bold',
                marginBottom: 5,
                fontSize: 15
              }}>
                Fasilitas Kamar
              </Text>
              <View style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'flex-start',
                flex: 1,
              }}>
                <FacilityText text={"Dapur"} />
                <FacilityText text={"Kamar mandi luar"} />
                <FacilityText text={"Kamar mandi luar"} />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={{
        margin: 15,
        marginBottom: 20,
        borderRadius: 10,
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: colors.darkBlue,
        alignItems: 'center',
        padding: 8,
        left: 0,
        right: 0,
        bottom: 0,
      }}>
        <Pressable style={{
          backgroundColor: colors.darkBlue,
          padding: 6,
          borderRadius: 15,
          // marginBottom: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}
          onPress={() => navigation.navigate('Konfirmasi')}
        >
          <Icon
            color={colors.white}
            icon="book-outline"
            size={17}
          />
          <Text style={{
            color: colors.white,
            textAlign: 'center',
            fontSize: 17
          }}>
            {(" ")}Sewa kamar ini
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}