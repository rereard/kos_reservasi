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
import { fasilitas_kos, peraturan_kos } from '../../assets/db/data';

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

	useEffect(() => {
		console.log('imageKos', imageKos);
	}, [imageKos]);

	const getDetailKos = async () => {
		setLoading(true)
		const kosData = await firestore().collection('kos').doc(id).get()
		setDetailKos(kosData.data())
		setImageKos(kosData.data().foto_kos)
		setLoading(false)
	}

	useEffect(() => {
		getDetailKos()
	}, [trigger]);

	useEffect(() => {
		const getDetailPemilik = async () => {
			const detailPemilik = await firestore().collection('akun').where(firebase.firestore.FieldPath.documentId(), '==', detailKos?.id_pemilik).get()
			const data = detailPemilik.docs[0].data()
			const noWA = data.noWa.replace('0', '62')
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
						<View style={{
							marginBottom: 10
						}}>
							<TouchableOpacity style={{
									backgroundColor: colors.darkBlue,
									padding: 10,
									borderRadius: 99,
									// marginBottom: 10,
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
									<Text style={{
										textAlign: 'right',
										color: colors.black,
										fontWeight: 'bold',
										fontSize: 16
									}}>
										Rp 200.000,00 - 500.000,00
									</Text>
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
					</View>
				</ScrollView>
			)}
		</SafeAreaView>
	)
}

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