import {
	View,
	Text,
	Image,
	StyleSheet,
	SafeAreaView,
	ScrollView,
	Dimensions,
	FlatList,
	Modal
} from 'react-native';
import { Header } from '../../component/molecules';
import { colors } from '../../utils';
import Swiper from 'react-native-swiper';
import { useState } from 'react';
import Icon from '../../component/atoms/Button/icon';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImageView from 'react-native-image-viewing'
import Ionicons from 'react-native-vector-icons/Ionicons'

const FacilityText = ({text}) => {
	return(
		<Text style={{color: colors.darkGrey, flexBasis: '50%', marginBottom: 7, fontSize: 15}}>
			{text}
		</Text>
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
	console.log(route.params.data);
	const { alamat, deskripsi, fasilitas, foto_kos, id_akunPemilik, id_kos, nama_kos, peraturan } = route.params.data
	
	const [visible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
	return(
		<SafeAreaView style={{backgroundColor: colors.white, flex: 1}}>
			<ScrollView>
				<View>
					<ImageView
						images={foto_kos}
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
									{`${imageIndex + 1} / ${foto_kos.length}`}
								</Text>
							</View>
						)}
					/>
					<Swiper style={{height: 230}} index={currentImageIndex} loop={false} activeDotColor={colors.darkBlue}>
						{foto_kos.map((item, index) => {
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
							onPress={() => navigation.navigate('DaftarKamar')}
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
							<Text style={{
								fontSize: 18,
								color: colors.black,
								fontWeight: 'bold',
							}}>
								{nama_kos}
							</Text>
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
									{alamat}
								</Text>
							</View>
						</View>
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
							Deskripsi Kos
						</Text>
						<View>
							<Text style={{color: colors.darkGrey, fontSize: 15}}>
								{deskripsi}
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
							Fasilitas Bersama
						</Text>
						<View style={{
							flexDirection: 'row',
							flexWrap: 'wrap',
							alignItems: 'flex-start',
							flex: 1,
						}}>
							{fasilitas.map((item, index) => (
								<FacilityText key={index} text={item} />
							))}
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
							Peraturan Kos
						</Text>
						{peraturan.map((item, index) => (
							<RuleText key={index} index={index+1} text={item}  />
						))}
					</View>
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
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Ionicons
								name='logo-whatsapp' 
								style={{
									color: '#28D146',
									fontSize: 40,
								}}
							/>
							<Text style={{ color: colors.darkGrey, fontWeight: 'bold', marginLeft: 10 }}>WhatsApp</Text>
						</View>
					</View>
				</View>
			</ScrollView>
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