import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  ToastAndroid,
  Linking,
  Pressable,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { colors } from '../../utils';
import { Header } from '../../component/molecules';
import Icon from '../../component/atoms/Button/icon';
import Ionicons from 'react-native-vector-icons/Ionicons'
import ImageView from 'react-native-image-viewing'
import { useEffect, useState } from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import firestore, { firebase } from '@react-native-firebase/firestore';
import Filter from '@react-native-firebase/firestore';
import { formatIDR } from '../../utils';
import { useSelector } from 'react-redux';
import Modal from "react-native-modal";

const includeExtra = true

export default function Transaksi({ navigation, route }) {

  const user = useSelector(state => state?.login?.user);

  const { id_transaksi, fromConfirm } = route.params

  const [fotoBuktiVisible, setFotoBuktiVisible] = useState(false)
  const [fotoBukti, setFotoBukti] = useState(null)
  const [detailTransaksi, setDetailTransaksi] = useState(null)
  const [detailPemilik, setDetailPemilik] = useState(null)
  const [detailPelanggan, setDetailPelanggan] = useState(null)
  const [trigger, setTrigger] = useState(false)
  const [loading, setLoading] = useState(false)
  const [modalTolak, setModalTolak] = useState(false)
  const [noteTolak, setNoteTolak] = useState('')

  useEffect(() => {
    console.log(route.params);
  }, []);

  useEffect(() => {
    const getDetailPemilik = async (idPemilik, idPelanggan) => {
      const akunDocs = await firestore().collection('akun').where(
        Filter.Filter.or(
          Filter.Filter(firebase.firestore.FieldPath.documentId(), '==', idPemilik),
          Filter.Filter(firebase.firestore.FieldPath.documentId(), '==', idPelanggan)
        )
      ).get()
      // console.log(akunDocs.docs[0].data());
      const pemilik = akunDocs.docs.filter(item => item.data().tipeAkun === 2)
      const pelanggan = akunDocs.docs.filter(item => item.data().tipeAkun === 1)
      console.log(pemilik[0].data());
      setDetailPemilik(pemilik[0].data())
      setDetailPelanggan(pelanggan[0].data())
      setLoading(false)
    }
    const getTransaksiDetail = async () => {
      const transaksiDocs = await firestore().collection('transaksi').doc(id_transaksi).get()
      setDetailTransaksi(transaksiDocs.data())
      return Promise.resolve(transaksiDocs.data())
    }
    setLoading(true)
    getTransaksiDetail().then(tes => {
      console.log(tes);
      console.log('dari then', detailTransaksi)
      getDetailPemilik(tes.id_pemilik, tes.id_pelanggan)
    })
    console.log('trigerred');
  }, [trigger]);

  useEffect(() => {
    if (detailTransaksi?.status === 'batal') {
      setFotoBukti(detailTransaksi?.foto_bukti)
    }
  }, [detailTransaksi]);

  useEffect(() => {
    console.log('triggered')
  }, [trigger]);

  useEffect(() => {
    console.log('pemilik', detailPemilik);
    console.log('Pelanggan', detailPelanggan);
  }, [detailPemilik, detailPelanggan]);

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
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: colors.darkGrey, fontStyle: 'italic', fontSize: 20 }}>Loading...</Text>
        </View>
      ) : (
        <ScrollView>
          <Modal
            isVisible={modalTolak}
            useNativeDriver={true}
            backdropOpacity={0.4}
          >
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <View
                style={{
                  backgroundColor: colors.white,
                  borderRadius: 10,
                  maxHeight: 600,
                  maxWidth: 700,
                  width: '95%',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                  padding: 15,
                  paddingVertical: 25
                }}
              >
                <Text style={{ color: colors.black, fontWeight: 'bold', fontSize: 18 }}>
                  Tolak Pembayaran?
                </Text>
                <TextInput
                  style={{
                    borderBottomColor: colors.darkGrey,
                    borderBottomWidth: 1,
                    fontSize: 17,
                    paddingVertical: 5,
                    color: colors.black,
                    paddingHorizontal: 0,
                  }}
                  multiline={true}
                  numberOfLines={4}
                  placeholderTextColor={colors.darkGrey}
                  placeholder={'Masukkan catatan penolakan'}
                  value={noteTolak}
                  onChangeText={(value) => setNoteTolak(value)}
                />
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                  <Pressable
                    style={{ flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: 10, borderWidth: 1, borderColor: 'red' }}
                    onPress={() => {
                      setModalTolak(false)
                      setNoteTolak('')
                    }}
                  >
                    <Text style={{ color: 'red', fontWeight: 'bold' }}>Batal</Text>
                  </Pressable>
                  <View style={{ width: 10 }}></View>
                  <Pressable
                    style={{ flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: 10, borderWidth: 1, borderColor: colors.darkBlue }}
                    onPress={() => {
                      console.log(noteTolak);
                      firestore().collection('transaksi').doc(id_transaksi).update({
                        status: 'batal',
                        catatan_tolak: noteTolak
                      }).then(() => {
                        setTrigger(!trigger)
                        setModalTolak(false)
                      }).catch(e => {
                        console.log(e);
                      })
                    }}
                  >
                    <Text style={{ color: colors.darkBlue, fontWeight: 'bold' }}>Ya</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
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
              flexDirection: 'row',
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
                  marginTop: 3,
                }}>
                  <Icon
                    icon={"person-outline"}
                    color={colors.black}
                    size={15}
                  />
                  <Text style={{
                    marginLeft: 5,
                    color: colors.darkGrey,
                    fontSize: 15
                  }}>
                    {user?.tipeAkun === 1 && detailPemilik?.nama}
                    {user?.tipeAkun === 2 && detailPelanggan?.nama}
                  </Text>
                </View>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 3,
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
                <Text style={{ color: colors.darkGrey, marginTop: 3 }}>{detailTransaksi?.tanggal_transaksi}</Text>
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
                {detailTransaksi?.status === 'batal' && (
                  <Text style={{
                    textAlign: 'right',
                    color: 'red',
                  }}>Transaksi ditolak</Text>
                )}
              </View>
            </View>
            <View style={{
              marginTop: 15,
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
            {(user?.tipeAkun === 1 && detailTransaksi?.status !== 'selesai') && (
              <View style={{
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
            )}
            {(detailTransaksi?.status === 'tunggu_konfirm' || detailTransaksi?.status === 'selesai') && (
              <View style={{
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
                      height: 250,
                      width: '100%',
                      borderRadius: 15,
                      marginRight: 7
                    }}
                  />
                </Pressable>
              </View>
            )}
            {(detailTransaksi?.status === 'belum_bayar' || detailTransaksi?.status === 'batal') && (
              <View style={{
                marginTop: 15,
              }}>
                <Text style={{
                  color: colors.black,
                  fontWeight: 'bold',
                  marginBottom: 20,
                  fontSize: 15
                }}>
                  {detailTransaksi?.status === 'belum_bayar' ? 'Upload bukti pembayaran' : detailTransaksi?.status === 'batal' && 'Bukti pembayaran:'}
                </Text>
                {fotoBukti ? (
                  <View style={{}}>
                    <ImageView
                      images={[{
                        uri: fotoBukti
                      }]}
                      imageIndex={0}
                      visible={fotoBuktiVisible}
                      onRequestClose={() => setFotoBuktiVisible(false)}
                    />
                    <Pressable onPress={() => setFotoBuktiVisible(true)}>
                      {user?.tipeAkun === 1 && (
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
                      )}
                      <Image
                        source={{
                          uri: fotoBukti
                        }}
                        style={{
                          height: 250,
                          width: '100%',
                          borderRadius: 15,
                          marginRight: 7
                        }}
                      />
                    </Pressable>
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
            {detailTransaksi?.status === 'batal' && (
              <View style={{
                marginTop: 15,
              }}>
                <Text style={{
                  color: colors.black,
                  fontWeight: 'bold',
                  marginBottom: 5,
                  fontSize: 15
                }}>
                  Catatan penolakan:
                </Text>
                <Text style={{ color: colors.darkGrey, fontSize: 15, marginRight: 7 }}>
                  {detailTransaksi?.catatan_tolak}
                </Text>
              </View>
            )}
            {((fotoBukti && detailTransaksi.status === 'belum_bayar') || (detailTransaksi?.status === 'batal' && user?.tipeAkun === 1)) && (
              <View style={{
                marginTop: 20,
                borderRadius: 10,
                flexDirection: 'row',
                justifyContent: 'center',
                backgroundColor: colors.darkBlue,
                alignItems: 'center',
                padding: 8
              }}>
                <TouchableOpacity style={{
                  backgroundColor: colors.darkBlue,
                  padding: 6,
                  borderRadius: 15,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                  onPress={() => {
                    firestore().collection('transaksi').doc(id_transaksi).update({
                      foto_bukti: fotoBukti,
                      status: 'tunggu_konfirm',
                      catatan_tolak: ''
                    }).then(
                      setTrigger(!trigger)
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
                    {detailTransaksi?.status === 'batal' ? 'Konfirmasi Ulang' : detailTransaksi.status === 'belum_bayar' && 'Konfirmasi Pembayaran'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            {(user?.tipeAkun === 2 && detailTransaksi?.status === 'tunggu_konfirm') && (
              <View style={{
                marginTop: 20,
                flexDirection: 'row'
              }}>
                <View style={{
                  borderRadius: 10,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  backgroundColor: 'red',
                  alignItems: 'center',
                  padding: 8,
                  flex: 1
                }}>
                  <TouchableOpacity style={{
                    backgroundColor: 'red',
                    padding: 6,
                    borderRadius: 15,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                    onPress={() => {
                      setModalTolak(true)
                    }}
                  >
                    <Text style={{
                      color: colors.white,
                      textAlign: 'center',
                      fontSize: 17
                    }}>
                      Tolak
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{ marginHorizontal: 7 }}></View>
                <View style={{
                  borderRadius: 10,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  backgroundColor: colors.darkBlue,
                  alignItems: 'center',
                  padding: 8,
                  flex: 1
                }}>
                  <TouchableOpacity style={{
                    backgroundColor: colors.darkBlue,
                    padding: 6,
                    borderRadius: 15,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                    onPress={() => {
                      firestore().collection('transaksi').doc(id_transaksi).update({
                        status: 'selesai'
                      }).then(
                        firestore().collection('kamar').doc(detailTransaksi?.id_kamar).update({
                          statusKamar: true
                        }).then(
                          setTrigger(!trigger)
                        )
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
                      Konfirmasi
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            {detailTransaksi?.status === 'selesai' && (
              <></>
            )}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  )
}