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
  TouchableOpacity,
  TextInput,
  ToastAndroid
} from 'react-native';
import { colors } from '../../utils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useState, useEffect, memo, useCallback } from 'react';
import ImageView from 'react-native-image-viewing'
// import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Modal from "react-native-modal";
import MapView from "react-native-maps";
import GetLocation from 'react-native-get-location'

const includeExtra = true

const InputText = memo(function InputText({ label, onChangeText, numberOfLines, placeholder, itemArray, onPressDelete, value, onSubmitEditing, multiline }) {
  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ color: colors.black, fontSize: 16, fontWeight: '900' }}>{label}</Text>
      <View style={{
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flex: 1,
      }}>
        {itemArray?.map((item, index) => (
          <View key={item.id} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 7, borderBottomWidth: 0.3, borderBottomColor: colors.darkGrey }}>
            <Text style={{ color: colors.black, fontSize: 15, marginBottom: 7, marginEnd: 30 }}>{index + 1}{'. '}{item.isi}</Text>
            <Ionicons
              name='trash-outline'
              style={{
                fontSize: 18,
                color: 'red',
                textAlign: 'center',
              }}
              onPress={() => onPressDelete(item.id)}
            />
          </View>
        ))}
      </View>
      <TextInput
        style={{
          borderBottomColor: colors.darkGrey,
          borderBottomWidth: 1,
          fontSize: 17,
          paddingVertical: 5,
          color: colors.black,
          paddingHorizontal: 0
        }}
        onChangeText={onChangeText}
        numberOfLines={numberOfLines}
        multiline={multiline}
        placeholder={placeholder}
        placeholderTextColor={colors.darkGrey}
        onSubmitEditing={onSubmitEditing}
        value={value}
      />
    </View>
  )
})

const ModalAddPhotos = memo(function ModalAddPhotos({ isVisible, onPressCamera, onPressGallery, setIsVisible }) {
  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.4}
      onBackButtonPress={() => setIsVisible(false)}
      onBackdropPress={() => setIsVisible(false)}
      useNativeDriver={true}
    >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View
          style={{
            backgroundColor: colors.white,
            borderRadius: 20,
            width: '75%',
            flexDirection: 'row',
            padding: 10,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', margin: 20 }}>
            <Ionicons name={'camera-outline'}
              style={{
                fontSize: 40,
                color: colors.darkBlue
              }}
              onPress={onPressCamera}
            />
            <Text style={{ color: colors.darkBlue, fontWeight: '600' }}>Ambil foto</Text>
          </View>
          <View style={{ borderEndWidth: 0.4, borderEndColor: colors.darkGrey }}></View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', margin: 20 }}>
            <Ionicons name={'image-outline'}
              style={{
                fontSize: 40,
                color: colors.darkBlue
              }}
              onPress={onPressGallery}
            />
            <Text style={{ color: colors.darkBlue, fontWeight: '600' }}>Buka galeri</Text>
          </View>
        </View>
      </View>
    </Modal>
  )
})

export default function TambahKos({ navigation }) {

  useEffect(() => {
    console.log('fasilitas', fasilitas);
  }, [fasilitas]);

  useEffect(() => {
    console.log('imageTemp', imageTemp);
  }, [imageTemp]);

  useEffect(() => {
    console.log('isModalVisible', isModalVisible);
  }, [isModalVisible]);

  useEffect(() => {
    console.log('dataKamar', dataKamar);
  }, [dataKamar]);

  useEffect(() => {
    console.log('idForEditKamat', idForEditKamar);
  }, [idForEditKamar]);

  useEffect(() => {
    console.log('latitude longitude', latitude, longitude);
  }, [latitude, longitude]);

  const selectPhotos = (type, isKamar) => {
    setModalVisible(false)
    const options = type === 'camera' ? {
      mediaType: 'photo',
      includeExtra,
      includeBase64: false,
      quality: 0.5,
    } : {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra,
      quality: 0.5
    };
    if (type === 'camera') {
      launchCamera(options, (res) => {
        console.log('Response = ', res);
        if (res.didCancel) {
          console.log('User cancelled image picker');
        } else if (res.errorCode) {
          console.log('ImagePicker Error: ', res.errorMessage);
        } else {
          console.log('response', JSON.stringify(res));
          isKamar ?
            setImageKamarTemp([...imageKamarTemp, { uri: res.assets[0].uri }]) :
            setImageTemp([...imageTemp, { uri: res.assets[0].uri }])
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
          console.log('response', JSON.stringify(res));
          isKamar ?
            setImageKamarTemp([...imageKamarTemp, { uri: res.assets[0].uri }]) :
            setImageTemp([...imageTemp, { uri: res.assets[0].uri }])
        }
      });
    }
  }

  const requestLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    }).then(location => {
      setRegion({
        latitude: location?.latitude,
        longitude: location?.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      })
    }).catch(error => {
      const { code, message } = error;
      // console.warn(code, message);
      ToastAndroid.show('Lokasi tidak tersedia', ToastAndroid.SHORT)
    })
  }

  const [region, setRegion] = useState({
    latitude: 35.6762,
    longitude: 139.6503,
    latitudeDelta: 3,
    longitudeDelta: 3,
  })

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [visible, setIsVisible] = useState(false);
  const [kamarVisible, setKamarVisible] = useState(false)

  const [fasilitas, setFasilitas] = useState([])
  const [peraturan, setPeraturan] = useState([])
  const [nama, setNama] = useState('')
  const [alamat, setAlamat] = useState('')
  const [deskripsi, setDeskripsi] = useState('')
  const [fasilitasInput, setFasilitasInput] = useState('')
  const [peraturanInput, setPeraturanInput] = useState('')

  const [imageKamarTemp, setImageKamarTemp] = useState([])
  const [namaKamar, setNamaKamar] = useState('')
  const [fasilitasKamar, setFasilitasKamar] = useState([])
  const [hargaKamar, setHargaKamar] = useState('')

  const [dataKamar, setDataKamar] = useState([])

  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalAddKamarVisible, setModalAddKamarVisible] = useState(false);
  const [isModalMapVisible, setIsModalMapVisible] = useState(false)
  const [imageTemp, setImageTemp] = useState([])
  const [idForEditKamar, setIdForEditKamar] = useState(null)
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)

  const deleteTempImg = (uri) => {
    const img = imageTemp.filter((name) => uri !== name.uri)
    setImageTemp(img)
  }
  const deleteTempKamarImg = (uri) => {
    const img = imageKamarTemp.filter((name) => uri !== name.uri)
    setImageKamarTemp(img)
  }
  const deleteFasilitasById = (id) => {
    const filteredFasil = fasilitas.filter((item) => item.id !== id)
    setFasilitas(filteredFasil)
  }
  const deleteFasilitasKamarById = (id) => {
    const filteredFasil = fasilitasKamar.filter((item) => item.id !== id)
    setFasilitasKamar(filteredFasil)
  }
  const deletePeraturanById = (id) => {
    const filteredFasil = peraturan.filter((item) => item.id !== id)
    setPeraturan(filteredFasil)
  }
  const deleteDataKamarById = (id) => {
    const filteredHasil = dataKamar.filter((item) => item.idKamar !== id)
    setDataKamar(filteredHasil)
  }
  const editDataKamarById = (id, namaKamarEdit, fasilitasKamarEdit, hargaKamarEdit, fotoKamarEdit) => {
    let dataKamarTemp = dataKamar
    const indexFind = dataKamarTemp.findIndex((item) => item.idKamar === id)
    dataKamarTemp[indexFind] = {
      idKamar: id,
      namaKamar: namaKamarEdit,
      fotoKamar: fotoKamarEdit,
      fasilitasKamar: fasilitasKamarEdit,
      hargaKamar: hargaKamarEdit
    }
    setDataKamar(dataKamarTemp)
  }
  return (
    <SafeAreaView>
      <ModalAddPhotos
        isVisible={isModalVisible}
        setIsVisible={setModalVisible}
        onPressCamera={() => selectPhotos('camera')}
        onPressGallery={() => selectPhotos('gallery')}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.darkBlue }}>
        <Text style={{ color: colors.white, fontWeight: 'bold', fontSize: 20, marginHorizontal: 15, marginVertical: 20 }}>Tambah Kos Baru</Text>
        <TouchableOpacity
          style={{ marginHorizontal: 15, marginVertical: 20, flexDirection: 'row', alignItems: 'center' }}
        >
          <Ionicons name={'add'}
            style={{
              color: colors.white,
              fontSize: 30
            }}
          />
          <Text style={{ color: colors.white, fontWeight: 'bold', fontSize: 18 }}>Selesai</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <ImageView
          images={imageTemp}
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
                {`${imageIndex + 1} / ${imageTemp.length}`}
              </Text>
            </View>
          )}
        />
        <ScrollView horizontal style={{
          marginHorizontal: 15,
          marginVertical: 20
        }}>
          <View style={{ alignItems: 'center', flexDirection: 'row' }}>
            {imageTemp.map((img, index) =>
              <Pressable key={index} onPress={() => {
                setIsVisible(true)
                setCurrentImageIndex(index)
              }}>
                <Ionicons key={index} name={'trash-outline'}
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    fontSize: 20,
                    padding: 10,
                    zIndex: 3,
                    color: 'red'
                  }}
                  onPress={() => {
                    deleteTempImg(img.uri)
                  }}
                />
                <Image
                  source={{
                    uri: img.uri
                  }}
                  style={{
                    height: 150,
                    width: 150,
                    borderRadius: 15,
                    marginRight: 7
                  }}
                />
              </Pressable>
            )}
            <Pressable
              style={{
                justifyContent: 'center',
                borderWidth: 1,
                borderStyle: 'dashed',
                borderColor: colors.darkBlue,
                borderRadius: 10,
                padding: 7,
                margin: 10,
                marginTop: 10,
                display: imageTemp.length === 5 ? 'none' : 'flex'
              }}
              onPress={() => setModalVisible(true)}
            >
              <Ionicons
                name='add'
                style={{
                  fontSize: 45,
                  color: colors.darkBlue,
                  textAlign: 'center',
                }}
              />
              <Text style={{ color: colors.darkBlue, fontSize: 13 }}>Tambah Foto Kos</Text>
            </Pressable>
          </View>
        </ScrollView>
        <View style={{ marginHorizontal: 20 }}>
          <InputText
            label={'Nama Kos:'}
            placeholder={'Masukkan nama kos'}
            onChangeText={(value) => setNama(value)}
            value={nama}
            multiline={true}
          />
          <InputText
            label={'Alamat:'}
            placeholder={'Masukkan alamat kos'}
            onChangeText={(value) => setAlamat(value)}
            value={alamat}
            multiline={true}
          />
          <TouchableOpacity style={{ backgroundColor: colors.darkBlue, alignItems: 'center', padding: 7, borderRadius: 99, marginBottom: 20 }} onPress={() => {
            setIsModalMapVisible(true)
            requestLocation()
          }}>
            <Text style={{ color: colors.white, fontWeight: 'bold' }}>Tambahkan lokasi pada peta</Text>
          </TouchableOpacity>
          <ModalMap
            isVisible={isModalMapVisible}
            setIsVisible={setIsModalMapVisible}
            region={region}
            setLatitude={setLatitude}
            setLongitude={setLongitude}
          />
          <InputText
            label={'Deskripsi:'}
            placeholder={'Masukkan deskripsi kos'}
            onChangeText={(value) => setDeskripsi(value)}
            value={deskripsi}
            multiline={true}
          />
          <InputText
            label={'Fasilitas Bersama:'}
            onChangeText={(value) => setFasilitasInput(value)}
            onSubmitEditing={() => {
              setFasilitas([...fasilitas, { id: Date.now(), isi: fasilitasInput }])
              setFasilitasInput('')
            }}
            value={fasilitasInput}
            itemArray={fasilitas}
            placeholder={'Masukkan fasilitas kos'}
            multiline={false}
            onPressDelete={deleteFasilitasById}
          />
          <InputText
            label={'Peraturan Kos:'}
            onChangeText={(value) => setPeraturanInput(value)}
            onSubmitEditing={() => {
              setPeraturan([...peraturan, { id: Date.now(), isi: peraturanInput }])
              setPeraturanInput('')
            }}
            value={peraturanInput}
            itemArray={peraturan}
            placeholder={'Masukkan peraturan kos'}
            multiline={false}
            onPressDelete={deletePeraturanById}
          />
        </View>
        {dataKamar.length !== 0 && (
          <Text style={{ color: colors.black, marginHorizontal: 20, fontSize: 16, fontWeight: '900', marginBottom: 10 }}>Kamar:</Text>
        )}
        {dataKamar.map((item) => (
          <KamarCard
            key={item.idKamar}
            nama={item?.namaKamar}
            img={item?.fotoKamar[0]?.uri}
            harga={item?.hargaKamar}
            onPressDelete={() => deleteDataKamarById(item.idKamar)}
            onPress={() => {
              setIdForEditKamar(item?.idKamar)
              setNamaKamar(item?.namaKamar)
              setHargaKamar(item?.hargaKamar)
              setFasilitasKamar(item?.fasilitasKamar)
              setImageKamarTemp(item?.fotoKamar)
              setModalAddKamarVisible(true)
            }}
          />
        ))}
        <Pressable style={{ marginBottom: 100 }} onPress={() => setModalAddKamarVisible(true)}>
          <View style={{ borderWidth: 1, borderStyle: 'dashed', marginHorizontal: 20, borderRadius: 10, borderColor: colors.darkBlue, alignItems: 'center', paddingVertical: 2 }}>
            <Ionicons
              name='add'
              style={{
                fontSize: 30,
                color: colors.darkBlue,
              }}
            />
            <Text style={{ color: colors.darkBlue }}>Tambah Kamar</Text>
          </View>
        </Pressable>
      </ScrollView>
      <ModalKamar
        imageKamarTemp={imageKamarTemp}
        setImageKamarTemp={setImageKamarTemp}
        namaKamar={namaKamar}
        setNamaKamar={setNamaKamar}
        fasilitasKamar={fasilitasKamar}
        setFasilitasKamar={setFasilitasKamar}
        hargaKamar={hargaKamar}
        setHargaKamar={setHargaKamar}
        isModalAddKamarVisible={isModalAddKamarVisible}
        setModalAddKamarVisible={setModalAddKamarVisible}
        deleteImgKamar={deleteTempKamarImg}
        selectCameraPhotos={() => selectPhotos('camera', true)}
        selectGalleryPhotos={() => selectPhotos('gallery', true)}
        deleteFasilitasKamarById={deleteFasilitasKamarById}
        kamarVisible={kamarVisible}
        setKamarVisible={setKamarVisible}
        dataKamar={dataKamar}
        setDataKamar={setDataKamar}
        setIdForEditKamar={setIdForEditKamar}
        idForEditKamar={idForEditKamar}
        editDataKamarById={editDataKamarById}
      />
    </SafeAreaView>
  )
}

const ModalMap = memo(function ModalMap({ isVisible, setIsVisible, region, setLatitude, setLongitude }) {
  const [tempRegion, setTempRegion] = useState(null)
  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.4}
      useNativeDriver={true}
      onBackButtonPress={() => {
        setIsVisible(false)
      }}
      onBackdropPress={() => {
        setIsVisible(false)
      }}
    >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ position: 'absolute', zIndex: 3 }}>
          <Text style={{ color: colors.black, fontSize: 25 }}>+</Text>
        </View>
        <View
          style={{
            backgroundColor: colors.white,
            borderRadius: 10,
            width: '95%',
            height: '95%',
            maxHeight: 600,
            maxWidth: 700,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            // paddingHorizontal: 5,
          }}
        >
          <Text style={{ color: colors.black, fontWeight: 'bold', fontSize: 18, marginHorizontal: 15, marginVertical: 10 }}>Tentukan lokasi kos:</Text>
          <Ionicons name={'location-outline'}
            style={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              fontSize: 20,
              padding: 14,
              color: colors.darkBlue
            }}
          // onPress={() => {
          // 	requestLocation()
          // }}
          />
          <MapView
            // style={styles.map}
            style={{ flex: 1 }}
            region={region}
            showsUserLocation={true}
            onRegionChangeComplete={(region) => setTempRegion(region)}
          />
          <TouchableOpacity
            style={{ backgroundColor: colors.darkBlue, alignItems: 'center', padding: 15, borderBottomEndRadius: 10, borderBottomLeftRadius: 10 }}
            onPress={() => {
              setLatitude(tempRegion.latitude)
              setLongitude(tempRegion.longitude)
              setIsVisible(false)
            }}
          >
            <Text style={{ color: colors.white, fontWeight: 'bold', fontSize: 16 }}>Pilih</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
})

const ModalKamar = memo(function ModalKamar({ imageKamarTemp, namaKamar, fasilitasKamar, hargaKamar, setImageKamarTemp, setNamaKamar, setFasilitasKamar, setHargaKamar, isModalAddKamarVisible, setModalAddKamarVisible, idForEditKamar, setIdForEditKamar, deleteImgKamar, selectCameraPhotos, selectGalleryPhotos, deleteFasilitasKamarById, kamarVisible, setKamarVisible, dataKamar, setDataKamar, editDataKamarById }) {
  const [fasilitasKamarInput, setFasilitasKamarInput] = useState('')
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  return (
    <Modal
      isVisible={isModalAddKamarVisible}
      backdropOpacity={0.4}
      onBackButtonPress={() => {
        setNamaKamar('')
        setFasilitasKamar([])
        setFasilitasKamarInput('')
        setHargaKamar('')
        setImageKamarTemp([])
        idForEditKamar && setIdForEditKamar(null)
        setModalAddKamarVisible(false)
      }}
      onBackdropPress={() => {
        setNamaKamar('')
        setFasilitasKamar([])
        setFasilitasKamarInput('')
        setHargaKamar('')
        setImageKamarTemp([])
        idForEditKamar && setIdForEditKamar(null)
        setModalAddKamarVisible(false)
      }}
      useNativeDriver={true}
    >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View
          style={{
            backgroundColor: colors.white,
            borderRadius: 10,
            width: '95%',
            height: '95%',
            maxHeight: 500,
            maxWidth: 500,
            flexDirection: 'row',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            padding: 5
          }}
        >
          <ScrollView>
            <ImageView
              images={imageKamarTemp}
              imageIndex={currentImageIndex}
              visible={kamarVisible}
              onRequestClose={() => setKamarVisible(false)}
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
                    {`${imageIndex + 1} / ${imageKamarTemp.length}`}
                  </Text>
                </View>
              )}
            />
            <Text style={{ color: colors.black, fontWeight: 'bold', fontSize: 16, marginHorizontal: 15, marginVertical: 20 }}>{idForEditKamar ? 'Edit Kamar Kos' : 'Tambah Kamar Kos'}</Text>
            <ScrollView horizontal style={{
              marginHorizontal: 20,
              marginBottom: 20,
              marginTop: 0,
            }}>
              <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                {imageKamarTemp.map((img, index) => (
                  <Pressable key={index} onPress={() => {
                    setKamarVisible(true)
                    setCurrentImageIndex(index)
                  }}>
                    <Ionicons key={index} name={'trash-outline'}
                      style={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        fontSize: 20,
                        padding: 10,
                        zIndex: 3,
                        color: 'red'
                      }}
                      onPress={() => deleteImgKamar(img.uri)}
                    />
                    <Image
                      source={{
                        uri: img.uri
                      }}
                      style={{
                        height: 150,
                        width: 150,
                        borderRadius: 15,
                        marginRight: 7
                      }}
                    />
                  </Pressable>
                ))}
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
                    display: imageKamarTemp.length === 5 ? 'none' : 'flex'
                  }}
                  onPress={selectCameraPhotos}
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
                    display: imageKamarTemp.length === 5 ? 'none' : 'flex'
                  }}
                  onPress={selectGalleryPhotos}
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
            </ScrollView>
            <View style={{ marginHorizontal: 20 }}>
              <InputText
                label={'Nama Kamar:'}
                placeholder={'Masukkan nama kamar'}
                onChangeText={(value) => setNamaKamar(value)}
                value={namaKamar}
                multiline={true}
              />
              <InputText
                label={'Fasilitas Kamar:'}
                placeholder={'Masukkan fasilitas kamar'}
                onChangeText={(value) => setFasilitasKamarInput(value)}
                onSubmitEditing={() => {
                  setFasilitasKamar([...fasilitasKamar, { id: Date.now(), isi: fasilitasKamarInput }])
                  setFasilitasKamarInput('')
                }}
                value={fasilitasKamarInput}
                itemArray={fasilitasKamar}
                onPressDelete={deleteFasilitasKamarById}
              />
              <InputText
                label={'Harga Kamar per Bulan:'}
                placeholder={'Masukkan harga kamar'}
                onChangeText={(value) => setHargaKamar(value)}
                value={hargaKamar}
              />
            </View>
            <View style={{ margin: 20, flexDirection: 'row' }}>
              <Pressable
                style={{ flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: 10, borderWidth: 1, borderColor: 'red' }}
                onPress={() => {
                  setNamaKamar('')
                  setFasilitasKamar([])
                  setFasilitasKamarInput('')
                  setHargaKamar('')
                  setImageKamarTemp([])
                  setModalAddKamarVisible(false)
                  idForEditKamar && setIdForEditKamar(null)
                }}
              >
                <Text style={{ color: 'red', fontWeight: 'bold' }}>Batal</Text>
              </Pressable>
              <View style={{ width: 10 }}></View>
              <Pressable
                style={{ flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: 10, borderWidth: 1, borderColor: colors.darkBlue }}
                onPress={() => {
                  if (namaKamar !== '' && fasilitasKamar.length !== 0 && hargaKamar !== '' && imageKamarTemp.length !== 0) {
                    if (!idForEditKamar) {
                      setDataKamar([...dataKamar, {
                        idKamar: Date.now(),
                        namaKamar,
                        fasilitasKamar,
                        hargaKamar,
                        fotoKamar: imageKamarTemp
                      }])
                      setModalAddKamarVisible(false)
                      setNamaKamar('')
                      setFasilitasKamar([])
                      setFasilitasKamarInput('')
                      setHargaKamar('')
                      setImageKamarTemp([])
                    } else {
                      editDataKamarById(idForEditKamar, namaKamar, fasilitasKamar, hargaKamar, imageKamarTemp)
                      setModalAddKamarVisible(false)
                      setNamaKamar('')
                      setFasilitasKamar([])
                      setFasilitasKamarInput('')
                      setHargaKamar('')
                      setImageKamarTemp([])
                      setIdForEditKamar(null)
                    }
                  }
                }}
              >
                <Text style={{ color: colors.darkBlue, fontWeight: 'bold' }}>{idForEditKamar ? 'Edit' : 'Tambah'}</Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  )
})

const KamarCard = memo(function KamarCard({ nama, harga, img, onPressDelete, onPress }) {
  return (
    <Pressable onPress={onPress}>
      <View style={{
        padding: 10,
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
        flexDirection: 'row',
        marginHorizontal: 15,
        marginVertical: 5,
        marginBottom: 20
      }}>
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
          onPress={onPressDelete}
        />
        <Image
          source={{
            uri: img
          }}
          style={{
            height: 105,
            width: 105,
            borderRadius: 15
          }}
        />
        <View style={{ padding: 10, justifyContent: 'center' }}>
          <Text style={{ color: colors.black, fontSize: 17, fontWeight: '500' }}>{nama}</Text>
          <Text style={{ color: colors.darkGrey, fontSize: 17, fontWeight: '500' }}>Rp {harga}/bulan</Text>
        </View>
      </View>
    </Pressable>
  )
})

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});