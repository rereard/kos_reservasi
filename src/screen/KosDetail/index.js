import {
	View,
	Text,
	Image,
	StyleSheet,
	SafeAreaView,
	ScrollView,
	Dimensions,
	Linking,
	TouchableOpacity,
	Pressable,
	TextInput,
	ToastAndroid
} from 'react-native';
import { Header } from '../../component/molecules';
import { colors } from '../../utils';
import Swiper from 'react-native-swiper';
import { useState, useEffect } from 'react';
import Icon from '../../component/atoms/Button/icon';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import ImageView from 'react-native-image-viewing'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useSelector } from 'react-redux';
import firestore, { firebase } from '@react-native-firebase/firestore';
import Modal from "react-native-modal";
import { fasilitas_kos, peraturan_kos, fasilitas_kamar } from '../../assets/db/data';
import { memo } from 'react';
import { formatIDR } from '../../utils';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const FacilityText = ({text}) => {
	return(
		<Text style={{color: colors.darkGrey, flexBasis: '50%', marginBottom: 7, fontSize: 15}}>
			{text}
		</Text>
	)
}

const EditIcon = ({onPress}) => {
	return(
		<Ionicons 
			name={'create-outline'}
			style={{
				color: colors.black,
				marginLeft: 5,
				fontSize: 20
			}}
			onPress={onPress}
		/>
	)
}

const ModalEdit = ({ isVisible, setVisible, inputValue, setInputValue, header, setHeader, idKos, trigger, setTrigger, modeEdit }) => {

	const forEdit = (modeEdit) => {
		if(modeEdit === 'nama_kos'){
			return {
				nama_kos: inputValue
			}
		} else if(modeEdit === 'alamat'){
			return {
				alamat: inputValue
			}
		} else if(modeEdit === 'deskripsi'){
			return {
				deskripsi: inputValue
			}
		} else if(modeEdit === 'fasilitas'){
			return {
				fasilitas: inputValue
			}
		} else if(modeEdit === 'peraturan'){
			return {
				peraturan: inputValue
			}
		}
	}

	const checkIfChoosed = (input) => {
		const tes = inputValue?.find(item => item.isi === input)
		if (tes !== undefined) {
      return true
    } else {
      return false
    }
	}

	const deleteChoosedById = (id) => {
		const filtered = inputValue.filter(item => item.id !== id)
		setInputValue(filtered)
	}

	const choosable = modeEdit === 'fasilitas' ? fasilitas_kos : modeEdit === 'peraturan' && peraturan_kos

	return(
		<Modal
			isVisible={isVisible}
			useNativeDriver={true}
			backdropOpacity={0.4}
			onBackButtonPress={() => {
				setVisible(false)
				setInputValue('')
				setHeader('')
			}}
			onBackdropPress={() => {
				setVisible(false)
				setInputValue('')
				setHeader('')
			}}
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
						padding: 20
					}}
				>
					<ScrollView>
						<Text style={{ color: colors.black, fontWeight: 'bold', fontSize: 20, marginVertical: 10 }}>
							Edit {header}
						</Text>
						{typeof inputValue === 'object' ? (
							<View style={{
								flexDirection: 'row',
								flexWrap: 'wrap',
								alignItems: 'flex-start',
								flex: 1,
								marginBottom: 25
							}}>
								{choosable.map((item, index) => (
									<Pressable
										key={index}
										style={{
											flexBasis: '50%',
											flexDirection: 'row',
											borderWidth: 1,
											padding: 7,
											borderColor: colors.darkGrey,
											height: 50,
											borderRadius: 7,
											borderWidth: checkIfChoosed(item) ? 2 : 1,
											borderColor: checkIfChoosed(item) ? colors.darkBlue : colors.darkGrey
										}}
										onPress={() => {
											if(!checkIfChoosed(item)){
												setInputValue([...inputValue, { id: Date.now(), isi: item }])
											} else{
												const isi = inputValue.find(itema => itema.isi === item)
												deleteChoosedById(isi.id)
											}
										}}
									>
										<Text
											style={{
												color: checkIfChoosed(item) ? colors.darkBlue : colors.darkGrey,
												flex: 1,
												fontWeight: 'bold',
												fontSize: modeEdit === 'peraturan' ? 12 : 14
											}}
										>
											{item}
										</Text>
									</Pressable>
								))}
							</View>
						) : (
							<>
								<TextInput 
									style={{
										borderBottomColor: colors.darkGrey,
										borderBottomWidth: 1,
										fontSize: 17,
										marginBottom: 25,
										color: colors.black,
									}}
									multiline={true}
									placeholder='Type something'
									placeholderTextColor={colors.darkGrey}
									value={inputValue}
									onChangeText={(value) => {
										setInputValue(value)
										console.log(inputValue);
									}}
								/>
							</>
						)}
						<View style={{ flexDirection: 'row' }}>
							<Pressable
								style={{ flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: 10, borderWidth: 1, borderColor: 'red' }}
								onPress={() => {
									setVisible(false)
									setInputValue('')
									setHeader('')
								}}
							>
								<Text style={{ color: 'red', fontWeight: 'bold' }}>Batal</Text>
							</Pressable>
							<View style={{ width: 25 }}></View>
							<Pressable
								style={{ flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: 10, borderWidth: 1, borderColor: colors.darkBlue }}
								onPress={() => {
									firestore().collection('kos').doc(idKos).update(forEdit(modeEdit)).then(() => {
										setTrigger(!trigger)
										setVisible(false)
										setInputValue('')
										setHeader('')
										ToastAndroid.show('Berhasil edit', ToastAndroid.SHORT)
									}).catch(e => {
										console.log(e);
										ToastAndroid.show('Yahh error', ToastAndroid.SHORT)
									})
								}}
							>
								<Text style={{ color: colors.darkBlue, fontWeight: 'bold' }}>Edit</Text>
							</Pressable>
						</View>
					</ScrollView>
				</View>
			</View>
		</Modal>
	)
}

const RuleText = ({text, index}) => {
	return(
		<View style={{flexDirection: 'row'}}>
			<Text style={{color: colors.darkGrey}}>{index}.</Text>
			<Text
				style={{
					marginBottom: 5,
					color: colors.darkGrey,
					marginHorizontal: 10,
					textAlign: 'auto',
					fontSize: 15
				}}
			>
				{text}
			</Text>
		</View>
	)
}

export default function KosDetail({navigation, route}){
	const id = route.params.id_kos

	const user = useSelector(state => state?.login?.user);
	
	const [visible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [imageKos, setImageKos] = useState([])
	const [detailKos, setDetailKos] = useState(null)
	const [loading, setLoading] = useState(false)
	const [noWaPemilik, setNoWaPemilik] = useState('')
	const [isModelEditVisible, setModalEditVisible] = useState(false)
	const [inputEdit, setInputEdit] = useState('')
	const [headerEdit, setHeaderEdit] = useState('')
	const [trigger, setTrigger] = useState(false)
	const [modeEdit, setModeEdit] = useState('')
	const [daftarKamar, setDaftarKamar] = useState([])
	const [modalKamar, setModalKamar] = useState(false)
	const [selectedKamar, setSelectedKamar] = useState(null)
	const [loadingWrite, setLoadingWrite] = useState(false)
	const [rangeKamar, setRangeKamar] = useState({})

	useEffect(() => {
		console.log('imageKos', imageKos);
	}, [imageKos]);

	const getDetailKos = async () => {
		setLoading(true)
		const kosData = await firestore().collection('kos').doc(id).get()
		setDetailKos(kosData.data())
		setImageKos(kosData.data().foto_kos)
	}

	useEffect(() => {
		getDetailKos().then(async () => {
			const kamarData = await firestore().collection('kamar').where('id_kos', '==', id).get()
			const kamar = kamarData?.docs?.map((item) => ({ ...item?.data(), id: item?.id }))
			console.log('kamar', kamar);
			setDaftarKamar(kamar)
			setLoading(false)
		})
	}, [trigger]);

	useEffect(() => {
		if(user?.tipeAkun === 1){
			if(daftarKamar.length !== 0){
				const array = []
				daftarKamar.map(item => array.push(item.hargaKamar))
				console.log('array', array);
				const min = Math.min(...array)
				const max = Math.max(...array)
				setRangeKamar({
					min,
					max
				})
			}
		}
	}, [daftarKamar]);

	useEffect(() => {
		const getDetailPemilik = async () => {
			const detailPemilik = await firestore().collection('akun').where(firebase.firestore.FieldPath.documentId(), '==', detailKos?.id_pemilik).get()
			const data = detailPemilik.docs[0].data()
			const noWA = data.noWa
			console.log('pemilik', noWA);
			setNoWaPemilik(noWA)
		}
		if(detailKos){
			getDetailPemilik()
		}
	}, [detailKos]);

	useEffect(() => {
		console.log('loading', loading);
	}, [loading]);

	useEffect(() => {
		console.log('detail kos', detailKos);

	}, [detailKos]);		
	
	return(
		<SafeAreaView style={{backgroundColor: colors.white, flex: 1}}>
			<Modal
        isVisible={loadingWrite}
        useNativeDriver={true}
        backdropOpacity={0.4}
      >
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View
            style={{
              backgroundColor: colors.white,
              borderRadius: 5,
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
            }}
          >
            <Text style={{ color: colors.black, fontWeight: 'bold', fontSize: 18, marginHorizontal: 15, marginVertical: 10 }}>
              Mengupload data...
            </Text>
          </View>
        </View>
      </Modal>
			{user?.tipeAkun === 2 && (
				<ModalEdit 
					isVisible={isModelEditVisible}
					setVisible={setModalEditVisible}
					inputValue={inputEdit}
					setInputValue={setInputEdit}
					header={headerEdit}
					setHeader={setHeaderEdit}
					idKos={id}
					trigger={trigger}
					setTrigger={setTrigger}
					modeEdit={modeEdit}
				/>
			)}
			{loading ? (
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<Text style={{ color: colors.darkGrey, fontStyle: 'italic', fontSize: 20 }}>Loading...</Text>
				</View>
			) : (
				<ScrollView>
					<View>
						<ImageView
							images={imageKos}
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
										{`${imageIndex + 1} / ${imageKos.length}`}
									</Text>
								</View>
							)}
						/>
						{imageKos.length !== 0 ? (
							<Swiper style={{height: 230}} index={currentImageIndex} loop={false} activeDotColor={colors.darkBlue}>
								{imageKos.map((item, index) => {
									return(
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
					</View>
					<View style={{
						padding: 10,
						marginBottom: 20
					}}>
						{user?.tipeAkun === 1 && (
							<View style={{
								marginBottom: 10
							}}>
								<TouchableOpacity style={{
										backgroundColor: colors.darkBlue,
										padding: 10,
										borderRadius: 99,
										flexDirection: 'row',
										alignItems: 'center',
										justifyContent: 'center'
									}}
									onPress={() => navigation.navigate('DaftarKamar', {
										id_kos: id,
										nama_kos: detailKos?.nama_kos
									})}
								>
									<Icon 
										color={colors.white}
										icon="bed-outline"
									/>
									<Text style={{
										color: colors.white,
										textAlign: 'center'
									}}>
										{(" ")}Daftar Kamar
									</Text>
								</TouchableOpacity>
							</View>
						)}
						<View style={{
							justifyContent: 'space-between',
							flexDirection: 'row',
							alignItems: 'center',
						}}>
							<View style={{ flex: 1 }}>
								<View style={{
									flexDirection: 'row',
									alignItems: 'center',
								}}>
									<Text style={{
										fontSize: 18,
										color: colors.black,
										fontWeight: 'bold',
									}}>
										{detailKos?.nama_kos}
									</Text>
									{user?.tipeAkun === 2 && (
										<EditIcon 
											onPress={() => {
												setModalEditVisible(true)
												setHeaderEdit('nama kos')
												setInputEdit(detailKos?.nama_kos)
												setModeEdit('nama_kos')
											}}
										/>
									)}
								</View>
								<View style={{
									flexDirection: 'row',
									alignItems: 'center',
									marginTop: 5,
								}}>
									<Icon 
										icon={"location-outline"}
										color={colors.black}
										size={15} 
									/>
									<Text style={{
										marginLeft: 5,
										color: colors.darkGrey,
										fontSize: 15
									}}>
										{detailKos?.alamat}
									</Text>
									{user?.tipeAkun === 2 && (
										<EditIcon 
											onPress={() => {
												setModalEditVisible(true)
												setHeaderEdit('alamat kos')
												setInputEdit(detailKos?.alamat)
												setModeEdit('alamat')
											}}
										/>
									)}
								</View>
							</View>
							{user?.tipeAkun !== 2 && (
								<View style={{ flex: 1, alignItems: 'flex-end' }}>
									<Text style={{
										textAlign: 'right',
										color: colors.darkGrey,
									}}>Sewa kamar mulai</Text>
									{rangeKamar?.min === rangeKamar?.max ? (
										<Text style={{
											textAlign: 'right',
											color: colors.black,
											fontWeight: 'bold',
											fontSize: 16
										}}>
											Rp {formatIDR.format(rangeKamar?.min).replace('IDR', '').trim()}
										</Text>
									) : (
										<Text style={{
											textAlign: 'right',
											color: colors.black,
											fontWeight: 'bold',
											fontSize: 16
										}}>
											Rp {formatIDR.format(rangeKamar?.min).replace('IDR', '').trim()} - {formatIDR.format(rangeKamar?.max).replace('IDR', '').trim()}
										</Text>
									)}
									<Text style={{
										textAlign: 'right',
										color: colors.darkGrey,
									}}>/bulan</Text>
								</View>
							)}
						</View>
						<View style={{
							paddingTop: 10,
							marginTop: 15,
							borderTopWidth: 2,
							borderTopColor: colors.grey,
						}}>
							<View style={{
								flexDirection: 'row',
								alignItems: 'center',
								marginBottom: 5,
							}}>
								<Text style={{
									color: colors.black,
									fontWeight: 'bold',
									fontSize: 15
								}}>
									Deskripsi Kos
								</Text>
								{user?.tipeAkun === 2 && (
									<EditIcon 
										onPress={() => {
											setModalEditVisible(true)
											setHeaderEdit('deskripsi kos')
											setInputEdit(detailKos?.deskripsi)
											setModeEdit('deskripsi')
										}}
									/>
								)}
							</View>
							<View>
								<Text style={{color: colors.darkGrey, fontSize: 15}}>
									{detailKos?.deskripsi}
								</Text>
							</View>
						</View>
						<View style={{
							marginTop: 20
						}}>
							<View style={{
								flexDirection: 'row',
								alignItems: 'center',
								marginBottom: 5,
							}}>
								<Text style={{
									color: colors.black,
									fontWeight: 'bold',
									fontSize: 15
								}}>
									Fasilitas Bersama
								</Text>
								{user?.tipeAkun === 2 && (
									<EditIcon 
										onPress={() => {
											setModalEditVisible(true)
											setHeaderEdit('fasilitas kos')
											setInputEdit(detailKos?.fasilitas)
											setModeEdit('fasilitas')
										}}
									/>
								)}
							</View>
							<View style={{
								flexDirection: 'row',
								flexWrap: 'wrap',
								alignItems: 'flex-start',
								flex: 1,
							}}>
								{detailKos?.fasilitas?.map((item) => (
									<FacilityText key={item.id} text={item.isi} />
								))}
							</View>
						</View>
						<View style={{
							marginTop: 20
						}}>
							<View style={{
								flexDirection: 'row',
								alignItems: 'center',
								marginBottom: 5,
							}}>
								<Text style={{
									color: colors.black,
									fontWeight: 'bold',
									fontSize: 15
								}}>
									Peraturan Kos
								</Text>
								{user?.tipeAkun === 2 && (
									<EditIcon 
										onPress={() => {
											setModalEditVisible(true)
											setHeaderEdit('peraturan kos')
											setInputEdit(detailKos?.peraturan)
											setModeEdit('peraturan')
										}}
									/>
								)}
							</View>
							{detailKos?.peraturan?.map((item, index) => (
								<RuleText key={index} index={index+1} text={item.isi}  />
							))}
						</View>
						{user?.tipeAkun !== 2 && (
							<View style={{
								marginTop: 20
							}}>
								<Text style={{
									color: colors.black,
									fontWeight: 'bold',
									marginBottom: 10,
									fontSize: 15
								}}>
									Hubungi Pemilik Kos
								</Text>
								<Pressable 
									style={{ flexDirection: 'row', alignItems: 'center' }}
									onPress={() => {
										Linking.openURL(`https://wa.me/${noWaPemilik}`)
									}}
								>
									<Ionicons
										name='logo-whatsapp' 
										style={{
											color: '#28D146',
											fontSize: 40,
										}}
									/>
									<Text style={{ color: colors.darkGrey, fontWeight: 'bold', marginLeft: 10 }}>WhatsApp</Text>
								</Pressable>
							</View>
						)}
						{user.tipeAkun === 2 && (
							<View style={{ marginTop: 20 }}>
								<Text style={{
									color: colors.black,
									fontWeight: 'bold',
									marginBottom: 10,
									fontSize: 15
								}}>
									Daftar kamar:
								</Text>
								{daftarKamar.map((item) => (
									<KamarCard
										key={item.id}
										nama={item?.namaKamar}
										img={item?.fotoKamar[0]?.uri}
										harga={item?.hargaKamar}
										// onPressDelete={() => deleteDataKamarById(item.idKamar)}
										onPress={() => {
											setSelectedKamar(item)
											setModalKamar(true)
										}}
									/>
								))}
								<Pressable
									onPress={() => {
										setModalKamar(true)
										setSelectedKamar(null)
									}}
								>
									<View style={{ borderWidth: 1, borderStyle: 'dashed', borderRadius: 10, borderColor: colors.darkBlue, alignItems: 'center', paddingVertical: 2 }}>
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
							</View>
						)}
					</View>
					
					{/* {daftarKamar.map} */}
				</ScrollView>
			)}
			<ModalKamar
				isVisible={modalKamar}
				setVisible={setModalKamar}
				dataKamar={selectedKamar}
				setDataKamar = {setSelectedKamar}
				loadingWrite={loadingWrite}
				setLoadingWrite={setLoadingWrite}
				id_kos={id}
				id_pemilik={user?.id_akun}
				trigger={trigger}
				setTrigger={setTrigger}
			/>
		</SafeAreaView>
	)
}

const includeExtra = true

const ModalKamar = memo(function ModalKamar({ isVisible, setVisible, dataKamar, setDataKamar, loadingWrite, setLoadingWrite, id_kos, id_pemilik, trigger, setTrigger }) {

	const [fasilitasKamar, setFasilitasKamar] = useState([])
	const [fotoKamar, setFotoKamar] = useState([])
	const [hargaKamar, setHargaKamar] = useState('')
	const [listrik, setListrik] = useState(false)
	const [luasKamar, setLuasKamar] = useState({})
	const [namaKamar, setNamaKamar] = useState('')
	const [statusKamar, setStatusKamar] = useState(false)
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [imageVisible, setImageVisible] = useState(false)

	useEffect(() => {
		if(dataKamar){
			setFasilitasKamar(dataKamar.fasilitasKamar)
			setFotoKamar(dataKamar.fotoKamar)
			setHargaKamar(dataKamar.hargaKamar)
			setListrik(dataKamar.listrik)
			setLuasKamar(dataKamar.luasKamar)
			setNamaKamar(dataKamar.namaKamar)
			setStatusKamar(dataKamar.statusKamar)
		}
	}, [dataKamar]);

	const checkIfFasilitasKamar = (fasilitasInput) => {
    const tes = fasilitasKamar?.find(item => item.isi === fasilitasInput)
    if (tes !== undefined) {
      return true
    } else {
      return false
    }
  }

	const deleteFasilitasKamarById = (id) => {
    const filteredFasil = fasilitasKamar?.filter((item) => item.id !== id)
    setFasilitasKamar(filteredFasil)
  }

	const deleteImgKamar = (uri) => {
    const img = fotoKamar.filter((name) => uri !== name.uri)
    setFotoKamar(img)
  }

	const selectPhotos = (type, isKamar) => {
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
          setFotoKamar([...fotoKamar, { uri: `data:image/jpeg;base64,${res.assets[0].base64}` }]) 
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
          setFotoKamar([...fotoKamar, { uri: `data:image/jpeg;base64,${res.assets[0].base64}` }])
        }
      });
    }
  }

	return(
		<Modal
			isVisible={isVisible}
			backdropOpacity={0.4}
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
							images={fotoKamar}
							imageIndex={currentImageIndex}
							visible={imageVisible}
							onRequestClose={() => setImageVisible(false)}
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
										{`${imageIndex + 1} / ${fotoKamar.length}`}
									</Text>
								</View>
							)}
						/>
						<Text style={{ color: colors.black, fontWeight: 'bold', fontSize: 16, marginHorizontal: 15, marginVertical: 20 }}>{dataKamar ? 'Edit Kamar Kos' : 'Tambah Kamar Kos'}</Text>
						<ScrollView horizontal style={{
							marginHorizontal: 20,
							marginBottom: 20,
							marginTop: 0,
						}}>
							<View style={{ alignItems: 'center', flexDirection: 'row' }}>
								{fotoKamar?.map((img, index) => (
									<Pressable key={index} onPress={() => {
										setImageVisible(true)
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
										display: fotoKamar.length === 5 ? 'none' : 'flex'
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
										display: fotoKamar.length === 5 ? 'none' : 'flex'
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
						</ScrollView>
						<View style={{ marginHorizontal: 20 }}>
							<InputText
								label={'Nama Kamar:'}
								placeholder={'Masukkan nama kamar'}
								onChangeText={(value) => setNamaKamar(value)}
								value={namaKamar}
								multiline={true}
							/>
							<Text style={{ color: colors.black, fontSize: 16, fontWeight: '900' }}>Luas Kamar:</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <InputText
                  inputMode={'numeric'}
                  keyboardType={'numeric'}
                  centerAlign={true}
                  value={luasKamar.panjang}
                  onChangeText={(value) => setLuasKamar({ panjang: value, lebar: luasKamar.lebar })}
                  placeholder={'0'}
                />
                <Text style={{ color: colors.black, fontSize: 16, fontWeight: '900', marginHorizontal: 10 }}>×</Text>
                <InputText
                  inputMode={'numeric'}
                  keyboardType={'numeric'}
                  centerAlign={true}
                  value={luasKamar.lebar}
                  onChangeText={(value) => setLuasKamar({ panjang: luasKamar.panjang, lebar: value })}
                  placeholder={'0'}
                />
                <Text style={{ color: colors.black, fontSize: 16, fontWeight: '900', marginLeft: 10 }}>m</Text>
              </View>
							<View style={{
                marginBottom: 20
              }}>
                <Text style={{ color: colors.black, fontSize: 16, fontWeight: '900', marginBottom: 5 }}>Fasilitas Kamar:</Text>
                <View style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  alignItems: 'flex-start',
                  flex: 1,
                }}>
                  {fasilitas_kamar.map((item, index) => (
                    <Pressable
                      key={index}
                      style={{ flexBasis: '50%', flexDirection: 'row', borderWidth: checkIfFasilitasKamar(item) ? 2 : 1, flexWrap: 'wrap', alignItems: 'center', padding: 7, borderColor: checkIfFasilitasKamar(item) ? colors.darkBlue : colors.darkGrey, height: 40, borderRadius: 7 }}
                      onPress={() => {
                        if (!checkIfFasilitasKamar(item)) {
                          setFasilitasKamar([...fasilitasKamar, { id: Date.now(), isi: item }])
                        } else {
                          const isi = fasilitasKamar.find(itema => itema.isi === item)
                          deleteFasilitasKamarById(isi.id)
                        }
                      }}
                    >
                      <Text style={{ color: checkIfFasilitasKamar(item) ? colors.darkBlue : colors.darkGrey, flex: 1, fontWeight: 'bold', fontSize: 14 }}>{item}</Text>
                    </Pressable>
                  ))}
                </View>
              </View>
							<InputText
                label={'Harga Kamar per Bulan:'}
                placeholder={'Masukkan harga kamar'}
                onChangeText={(value) => setHargaKamar(value)}
                value={hargaKamar}
                inputMode={'numeric'}
                keyboardType={'numeric'}
              />
							<View style={{}}>
                <Pressable
                  style={{ borderWidth: listrik ? 2 : 1, flexWrap: 'wrap', alignItems: 'center', padding: 10, borderColor: listrik ? colors.darkBlue : colors.darkGrey, borderRadius: 7, flex: 1 }}
                  onPress={() => {
                    setListrik(!listrik)
                  }}
                >
                  <Text style={{ color: listrik ? colors.darkBlue : colors.darkGrey, flex: 1, fontWeight: 'bold', fontSize: 14 }}>Termasuk Listrik</Text>
                </Pressable>
                <View style={{ marginVertical: 5 }}></View>
                <Pressable
                  style={{ borderWidth: statusKamar ? 2 : 1, flexWrap: 'wrap', alignItems: 'center', padding: 10, borderColor: statusKamar ? colors.darkBlue : colors.darkGrey, borderRadius: 7, flex: 1 }}
                  onPress={() => {
                    setStatusKamar(!statusKamar)
                  }}
                >
                  <Text style={{ color: statusKamar ? colors.darkBlue : colors.darkGrey, flex: 1, fontWeight: 'bold', fontSize: 14 }}>Kamar sudah terisi</Text>
                </Pressable>
              </View>
						</View>
						<View style={{ margin: 20, flexDirection: 'row', marginTop: 30 }}>
              <Pressable
                style={{ flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: 10, borderWidth: 1, borderColor: 'red' }}
                onPress={() => {
									setDataKamar(null)
                  setNamaKamar('')
                  setFasilitasKamar([])
                  setHargaKamar('')
                  setFotoKamar([])
                  setVisible(false)
                  setLuasKamar({ panjang: '', lebar: '' })
                  setListrik(false)
                  setStatusKamar(false)
                }}
              >
                <Text style={{ color: 'red', fontWeight: 'bold' }}>Batal</Text>
              </Pressable>
              <View style={{ width: 10 }}></View>
              <Pressable
                style={{ flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: 10, borderWidth: 1, borderColor: colors.darkBlue }}
                onPress={() => {
                  if (namaKamar !== '' && fasilitasKamar.length !== 0 && hargaKamar !== '' && fotoKamar.length !== 0 && luasKamar.panjang !== '' && luasKamar.lebar !== '') {
                    if (!dataKamar) {
											setVisible(false)
											setLoadingWrite(true)
											firestore().collection('kamar').add({
												fasilitasKamar,
												fotoKamar,
												hargaKamar,
												id_kos,
												id_pemilik,
												listrik,
												luasKamar,
												namaKamar,
												statusKamar
											}).then(() => {
												setNamaKamar('')
												setFasilitasKamar([])
												setHargaKamar('')
												setFotoKamar([])
												setLuasKamar({ panjang: '', lebar: '' })
												setListrik(false)
												setStatusKamar(false)
												setLoadingWrite(false)
												setTrigger(!trigger)
												ToastAndroid.show('Berhasil menambah kamar', ToastAndroid.SHORT)
											}).catch((e) => {
												console.log('error', e)
												setLoadingWrite(false)
												ToastAndroid.show('Yahh error', ToastAndroid.SHORT)
											})
                    } else {
											setVisible(false)
											setLoadingWrite(true)
											firestore().collection('kamar').doc(dataKamar?.id).update({
												fasilitasKamar,
												fotoKamar,
												hargaKamar,
												id_kos,
												id_pemilik,
												listrik,
												luasKamar,
												namaKamar,
												statusKamar
											}).then(() => {
												setNamaKamar('')
												setFasilitasKamar([])
												setHargaKamar('')
												setFotoKamar([])
												setLuasKamar({ panjang: '', lebar: '' })
												setListrik(false)
												setStatusKamar(false)
												setLoadingWrite(false)
												setTrigger(!trigger)
												setDataKamar(null)
												ToastAndroid.show('Berhasil edit kamar', ToastAndroid.SHORT)
											}).catch((e) => {
												console.log('error', e)
												setLoadingWrite(false)
												ToastAndroid.show('Yahh error', ToastAndroid.SHORT)
											})
                    }
                  }
                }}
              >
                <Text style={{ color: colors.darkBlue, fontWeight: 'bold' }}>{dataKamar ? 'Edit' : 'Tambah'}</Text>
              </Pressable>
            </View>
					</ScrollView>
				</View>
			</View>
		</Modal>
	)
})

const InputText = memo(function InputText({ label, onChangeText, numberOfLines, placeholder, itemArray, onPressDelete, value, onSubmitEditing, multiline, inputMode, keyboardType, centerAlign }) {
  return (
    <View style={{ marginBottom: 20, flex: 1 }}>
      {label ? (
        <Text style={{ color: colors.black, fontSize: 16, fontWeight: '900' }}>{label}</Text>
      ) : null}
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
          paddingHorizontal: 0,
          textAlign: centerAlign ? 'center' : 'left'
        }}
        onChangeText={onChangeText}
        numberOfLines={numberOfLines}
        multiline={multiline}
        placeholder={placeholder}
        placeholderTextColor={colors.darkGrey}
        onSubmitEditing={onSubmitEditing}
        value={value}
        inputMode={inputMode}
        keyboardType={keyboardType}
      />
    </View>
  )
})

const KamarCard = memo(function KamarCard({ nama, harga, img, onPressDelete, onPress }) {
	return(
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
        // marginHorizontal: 15,
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
          <Text style={{ color: colors.darkGrey, fontSize: 17, fontWeight: '500' }}>Rp {formatIDR.format(harga).replace('IDR', '').trim()}/bulan</Text>
        </View>
      </View>
    </Pressable>
	)
})

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		backgroundColor: 'black',
	},
	scrollViewContent: {
		alignItems: 'center',
	},
	imageWrapper: {
		width: Dimensions.get('window').width,
		justifyContent: 'center',
		alignItems: 'center',
	},
	fullImage: {
		width: '100%',
		height: '100%',
		resizeMode: 'contain',
	},
	closeButton: {
		position: 'absolute',
		top: 20,
		right: 20,
		zIndex: 1,
		width: 50,
		backgroundColor: colors.white
	},
	closeIcon: {
		width: 24,
		height: 24,
		resizeMode: 'contain',
		color: colors.white
	},
	navigationButtons: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		position: 'absolute',
		bottom: 20,
		left: 0,
		right: 0,
		paddingHorizontal: 20,
	},
	navigationButton: {
		padding: 10,
	},
	navigationIcon: {
		width: 24,
		height: 24,
		resizeMode: 'contain',
		tintColor: 'white',
	},
})