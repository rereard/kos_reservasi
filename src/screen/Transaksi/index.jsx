import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  ToastAndroid,
  Linking,
  Pressable
} from 'react-native';
import { colors } from '../../utils';
import { Header } from '../../component/molecules';
import Icon from '../../component/atoms/Button/icon';
import Ionicons from 'react-native-vector-icons/Ionicons'
import ImageView from 'react-native-image-viewing'
import { useEffect, useState } from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import { formatIDR } from '../../utils';

const includeExtra = true

export default function Transaksi({ navigation, route }) {

  const { id_transaksi, fromConfirm } = route.params

  useEffect(() => {
    console.log(route.params);
  }, []);

  useEffect(() => {
    const getDetailPemilik = async (id) => {
      const akunDocs = await firestore().collection('akun').doc(id).get()
      console.log(akunDocs.data());
      setDetailPemilik(akunDocs.data())
    }
    const getTransaksiDetail = async () => {
      const transaksiDocs = await firestore().collection('transaksi').doc(id_transaksi).get()
      setDetailTransaksi(transaksiDocs.data())
      return Promise.resolve(transaksiDocs.data())
    }
    getTransaksiDetail().then(tes => {
      console.log(tes);
      console.log('dari then', detailTransaksi)
      getDetailPemilik(tes.id_pemilik)
    })
  }, []);

  // useEffect(() => {
  //   console.log(detailTransaksi ? 'true' : 'false');
  //   if (detailTransaksi) {
  //     const getDetailPemilik = async () => {
  //       const akunDocs = await firestore().collection('akun').doc(detailTransaksi.id_pemilik).get()
  //       console.log(akunDocs.data());
  //       setDetailPemilik(akunDocs.data())
  //     }
  //     getDetailPemilik()
  //   }
  // }, [detailTransaksi]);

  useEffect(() => {
    console.log('pemilik', detailPemilik);
  }, [detailPemilik]);

  const [fotoBuktiVisible, setFotoBuktiVisible] = useState(false)
  const [fotoBukti, setFotoBukti] = useState(null)
  const [detailTransaksi, setDetailTransaksi] = useState(null)
  const [detailPemilik, setDetailPemilik] = useState(null)

  const selectPhotos = (type) => {
    const options = type === 'camera' ? {
      mediaType: 'photo',
      includeExtra,
      includeBase64: true,
      quality: 0.1,
    } : {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: true,
      includeExtra,
      quality: 0.1
    };
    if (type === 'camera') {
      launchCamera(options, (res) => {
        console.log('Response = ', res);
        if (res.didCancel) {
          console.log('User cancelled image picker');
        } else if (res.errorCode) {
          console.log('ImagePicker Error: ', res.errorMessage);
        } else {
          setFotoBukti(`data:image/jpeg;base64,${res.assets[0].base64}`)
        }
      });
    } else {
      launchImageLibrary(options, (res) => {
        console.log('Response = ', res);
        if (res.didCancel) {
          console.log('User cancelled image picker');
        } else if (res.errorCode) {
          console.log('ImagePicker Error: ', res.errorMessage);
        } else {
          setFotoBukti(`data:image/jpeg;base64,${res.assets[0].base64}`)
        }
      });
    }
  }

  return (
    <SafeAreaView style={{ backgroundColor: colors.white, flex: 1 }}>
      <ScrollView>
        <View>
          <Image
            source={{ uri: detailTransaksi?.foto_kamar }}
            style={{
              height: 230,
              width: '100%',
            }}
          />
          <View style={{
            position: 'absolute',
            padding: 5,
            margin: 0,
            zIndex: 1
          }}>
            <Header size={35} onPress={() => {
              if (fromConfirm) {
                navigation.navigate('Receipt')
              } else {
                navigation.goBack()
              }
            }}
            />
          </View>
        </View>
        <View style={{
          padding: 10,
          marginBottom: 20
        }}>
          <View style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <View style={{ flex: 1 }}>
              <Text style={{
                fontSize: 18,
                color: colors.black,
                fontWeight: 'bold',
              }}>
                {detailTransaksi?.nama_kamar}
              </Text>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 5,
              }}>
                <Icon
                  icon={"home-outline"}
                  color={colors.black}
                  size={15}
                />
                <Text style={{
                  marginLeft: 5,
                  color: colors.darkGrey,
                  fontSize: 15
                }}>
                  {detailTransaksi?.nama_kos}
                </Text>
              </View>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Text style={{
                textAlign: 'right',
                color: colors.darkGrey,
              }}>id: {id_transaksi}</Text>
              <Text style={{
                textAlign: 'right',
                color: colors.black,
                fontWeight: 'bold',
                fontSize: 16
              }}>
                Rp {formatIDR.format(detailTransaksi?.jumlah_bayar).replace('IDR', '').trim()}
              </Text>
              {detailTransaksi?.status === 'belum_bayar' && (
                <Text style={{
                  textAlign: 'right',
                  color: 'red',
                }}>Belum dibayar</Text>
              )}
              {detailTransaksi?.status === 'tunggu_konfirm' && (
                <Text style={{
                  textAlign: 'right',
                  color: colors.darkBlue,
                }}>Menunggu konfirmasi</Text>
              )}
            </View>
          </View>
          <View style={{
            paddingTop: 10,
            marginTop: 15,
            borderTopWidth: 2,
            borderTopColor: colors.grey,
          }}>
            <Text style={{
              color: colors.black,
              fontWeight: 'bold',
              marginBottom: 5,
              fontSize: 15
            }}>
              Mulai menempati:
            </Text>
            <Text style={{ color: colors.darkGrey, fontSize: 15, marginRight: 7 }}>
              {detailTransaksi?.mulai_tinggal}
            </Text>
          </View>
          <View style={{
            paddingTop: 10,
            marginTop: 15,
          }}>
            <Text style={{
              color: colors.black,
              fontWeight: 'bold',
              marginBottom: 5,
              fontSize: 15
            }}>
              Info rekening pemilik kos:
            </Text>
            <View>
              <Text style={{ color: colors.darkGrey, fontSize: 15 }}>
                Bank {detailPemilik?.bank_provider}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: colors.darkGrey, fontSize: 15, marginRight: 7 }}>
                  Nomor rekening: {detailPemilik?.noRek}
                </Text>
                <Ionicons
                  name='copy-outline'
                  style={{
                    fontSize: 17,
                    color: colors.black,
                    textAlign: 'center',
                  }}
                  onPress={() => {
                    Clipboard.setString(detailPemilik?.noRek)
                    ToastAndroid.show('Disalin ke clipboard', ToastAndroid.SHORT)
                  }}
                />
              </View>
              <Text style={{ color: colors.darkGrey, fontSize: 15 }}>
                a.n. {detailPemilik?.atas_nama}
              </Text>
            </View>
          </View>
          {(detailTransaksi?.status === 'tunggu_konfirm' || detailTransaksi?.status === 'selesai') && (
            <View style={{
              paddingTop: 10,
              marginTop: 15,
            }}>
              <Text style={{
                color: colors.black,
                fontWeight: 'bold',
                marginBottom: 20,
                fontSize: 15
              }}>
                Bukti pembayaran:
              </Text>
              <ImageView
                images={[{
                  uri: detailTransaksi?.foto_bukti
                }]}
                imageIndex={0}
                visible={fotoBuktiVisible}
                onRequestClose={() => setFotoBuktiVisible(false)}
              />
              <Pressable onPress={() => setFotoBuktiVisible(true)}>
                <Image
                  source={{
                    uri: detailTransaksi?.foto_bukti
                  }}
                  style={{
                    height: 200,
                    width: 200,
                    borderRadius: 15,
                    marginRight: 7
                  }}
                />
              </Pressable>
            </View>
          )}
          {detailTransaksi?.status === 'belum_bayar' && (
            <View style={{
              paddingTop: 10,
              marginTop: 15,
            }}>
              <Text style={{
                color: colors.black,
                fontWeight: 'bold',
                marginBottom: 20,
                fontSize: 15
              }}>
                Upload bukti pembayaran
              </Text>
              {fotoBukti ? (
                <View style={{ flexDirection: 'row' }}>
                  <ImageView
                    images={[{
                      uri: fotoBukti
                    }]}
                    imageIndex={0}
                    visible={fotoBuktiVisible}
                    onRequestClose={() => setFotoBuktiVisible(false)}
                  />
                  <Pressable onPress={() => setFotoBuktiVisible(true)}>
                    <Ionicons name={'trash-outline'}
                      style={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        fontSize: 20,
                        padding: 10,
                        zIndex: 3,
                        color: 'red'
                      }}
                      onPress={() => setFotoBukti(null)}
                    />
                    <Image
                      source={{
                        uri: fotoBukti
                      }}
                      style={{
                        height: 200,
                        width: 200,
                        borderRadius: 15,
                        marginRight: 7
                      }}
                    />
                  </Pressable>
                  <View style={{ flex: 1 }}></View>
                </View>
              ) : (
                <View style={{ flexDirection: 'row' }}>
                  <Pressable
                    style={{
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderStyle: 'dashed',
                      borderColor: colors.darkBlue,
                      borderRadius: 10,
                      padding: 7,
                      margin: 10,
                      marginTop: 0,
                    }}
                    onPress={() => selectPhotos('camera')}
                  >
                    <Ionicons
                      name='camera-outline'
                      style={{
                        fontSize: 30,
                        color: colors.darkBlue,
                        textAlign: 'center',
                      }}
                    />
                    <Text style={{ color: colors.darkBlue, fontSize: 10 }}>Ambil Foto</Text>
                  </Pressable>
                  <Pressable
                    style={{
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderStyle: 'dashed',
                      borderColor: colors.darkBlue,
                      borderRadius: 10,
                      padding: 7,
                      margin: 10,
                      marginTop: 0,
                    }}
                    onPress={() => selectPhotos('gallery')}
                  >
                    <Ionicons
                      name='image-outline'
                      style={{
                        fontSize: 30,
                        color: colors.darkBlue,
                        textAlign: 'center',
                      }}
                    />
                    <Text style={{ color: colors.darkBlue, fontSize: 10 }}>Buka Galeri</Text>
                  </Pressable>
                </View>
              )}
            </View>
          )}

          {fotoBukti && (
            <View style={{
              marginTop: 20,
              borderRadius: 10,
              flexDirection: 'row',
              justifyContent: 'center',
              backgroundColor: colors.darkBlue,
              alignItems: 'center',
              padding: 8
            }}>
              <Pressable style={{
                backgroundColor: colors.darkBlue,
                padding: 6,
                borderRadius: 15,
                flexDirection: 'row',
                alignItems: 'center',
              }}
                onPress={() => {
                  firestore().collection('transaksi').doc(id_transaksi).update({
                    foto_bukti: fotoBukti,
                    status: 'tunggu_konfirm'
                  }).then(
                    navigation.navigate('Transaksi', {
                      id_transaksi,
                      fromConfirm: false
                    })
                  ).catch(e => {
                    console.log(e);
                  })
                }}
              >
                <Text style={{
                  color: colors.white,
                  textAlign: 'center',
                  fontSize: 17
                }}>
                  Konfirmasi Pembayaran
                </Text>
              </Pressable>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}