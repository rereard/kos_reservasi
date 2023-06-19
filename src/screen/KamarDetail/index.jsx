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
import { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from '../../component/atoms/Button/icon';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { formatIDR } from '../../utils';
import { useSelector } from 'react-redux';

const FacilityText = ({ text }) => {
  return (
    <Text style={{ color: colors.darkGrey, flexBasis: '50%', marginBottom: 7, fontSize: 15 }}>
      {text}
    </Text>
  )
}

export default function KamarDetail({ navigation, route }) {
  const { id_kamar, nama_kos } = route.params
  const [visible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [detailKamar, setDetailKamar] = useState([])
  const [imageKamar, setImageKamar] = useState([])
  const [loading, setLoading] = useState(false)
  const user = useSelector(state => state?.login?.user);

  useEffect(() => {
    const getKamarDetail = async () => {
      setLoading(true)
      const kamarDocs = await firestore().collection('kamar').doc(id_kamar).get()
      setDetailKamar(kamarDocs.data())
      setImageKamar(kamarDocs.data().fotoKamar)
      setLoading(false)
    }
    getKamarDetail()
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: colors.darkGrey, fontStyle: 'italic', fontSize: 20 }}>Loading...</Text>
        </View>
      ) : (
        <>
          <ScrollView>
            <View>
              <ImageView
                images={imageKamar}
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
                      {`${imageIndex + 1} / ${imageKamar.length}`}
                    </Text>
                  </View>
                )}
              />
              {imageKamar?.length !== 0 ? (
                <Swiper style={{ height: 230 }} index={currentImageIndex} loop={false} activeDotColor={colors.darkBlue}>
                  {imageKamar.map((item, index) => {
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
              ) : (
                <Image
                  source={{ uri: 'https://htmlcolorcodes.com/assets/images/colors/steel-gray-color-solid-background-1920x1080.png' }}
                  style={{
                    height: 230,
                    width: '100%',
                  }}
                />
              )}
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
                    {detailKamar?.namaKamar}
                  </Text>
                  <View>
                    <Text style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: colors.black
                    }}>Rp {formatIDR.format(detailKamar?.hargaKamar).replace('IDR', '').trim()}</Text>
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
                    Spesifikasi Kamar
                  </Text>
                  <View style={{
                    flex: 1,
                    flexDirection: 'column'
                  }}>
                    <Text style={{ color: colors.darkGrey, marginBottom: 7 }}>
                      Luas kamar {detailKamar?.luasKamar?.panjang}×{detailKamar?.luasKamar?.lebar} m
                    </Text>
                    <Text style={{ color: colors.darkGrey, marginBottom: 7 }}>
                      {detailKamar.listrik ? 'Sudah termasuk listrik' : 'Belum termasuk listrik'}
                    </Text>
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
                    {detailKamar?.fasilitasKamar?.map((item) => (
                      <FacilityText text={item.isi} key={item.id} />
                    ))}
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
          {user?.tipeAkun === 1 && (
            <View style={{
              margin: 15,
              marginBottom: 20,
              borderRadius: 10,
              position: 'absolute',
              flexDirection: 'row',
              justifyContent: 'center',
              backgroundColor: detailKamar?.statusKamar ? 'red' : colors.darkBlue,
              alignItems: 'center',
              padding: 8,
              left: 0,
              right: 0,
              bottom: 0,
            }}>
              {detailKamar?.statusKamar ? (
                <View style={{
                  backgroundColor: 'red',
                  padding: 6,
                  borderRadius: 15,
                  // marginBottom: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                  <Text style={{
                    color: colors.white,
                    textAlign: 'center',
                    fontSize: 17
                  }}>
                    Kamar sudar terisi
                  </Text>
                </View>
              ) : (
                <Pressable style={{
                  backgroundColor: colors.darkBlue,
                  padding: 6,
                  borderRadius: 15,
                  // marginBottom: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                  onPress={() => navigation.navigate('Konfirmasi', {
                    id_kamar,
                    id_kos: detailKamar?.id_kos,
                    nama_kos,
                    nama_kamar: detailKamar?.namaKamar,
                    foto_kamar: imageKamar[0]?.uri,
                    harga: detailKamar?.hargaKamar,
                    id_pemilik: detailKamar?.id_pemilik
                  })}
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
              )}
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  )
}