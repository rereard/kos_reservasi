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
import { kamar_kos } from '../../assets/db/data';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { useState, useEffect } from 'react';
import { formatIDR } from '../../utils';

const KamarCard = ({ nama, harga, img, onPress, statusKamar }) => {
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
				margin: 15,
				marginBottom: 5
			}}>
				{statusKamar && (
					<Text style={{
						color: 'red',
						position: 'absolute',
						bottom: 10,
						right: 20,
						fontSize: 20,
						fontWeight: 'bold',
						zIndex: 3,
					}}>
						Sudah terisi
					</Text>
				)}
				<Image
					source={{
						uri: img
					}}
					style={{
						height: 125,
						width: 125,
						borderRadius: 15
					}}
				/>
				<View style={{ padding: 10, justifyContent: 'center', flex: 1 }}>
					<Text style={{ color: colors.black, fontSize: 18, fontWeight: '500' }}>{nama}</Text>
					<Text style={{ color: colors.darkGrey, fontSize: 17, fontWeight: '500' }}>Rp {formatIDR.format(harga).replace('IDR', '').trim()}</Text>
					<Text style={{ color: colors.darkGrey, fontSize: 16, fontWeight: '500' }}>/bulan</Text>
				</View>
			</View>
		</Pressable>
	)
}

export default function DaftarKamar({ navigation, route }) {
	const { id_kos, nama_kos } = route.params

	const [kamar, setKamar] = useState([])
	const [loading, setLoading] = useState(false)

	const getKamar = async () => {
		setLoading(true)
		const kamarCollection = await firestore().collection('kamar').where('id_kos', '==', id_kos).get()
		const kamar = kamarCollection?.docs?.map((item) => ({ ...item?.data(), id: item?.id }))
		console.log('kamar', kamar);
		setKamar(kamar)
		setLoading(false)
	}

	useEffect(() => {
		getKamar()
		console.log("id kos", id_kos);
	}, []);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.darkBlue, padding: 15 }}>
				<Header onPress={() => navigation.goBack()} size={30} title={nama_kos} />
			</View>
			{loading ? (
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<Text style={{ color: colors.darkGrey, fontStyle: 'italic', fontSize: 20 }}>Loading...</Text>
				</View>
			) : (
				<ScrollView>
					<Text style={{ color: colors.black, fontWeight: '600', fontSize: 20, margin: 15, marginBottom: 0 }}>Daftar Kamar:</Text>
					{kamar?.map(item => (
						<KamarCard
							key={item?.id}
							nama={item?.namaKamar}
							harga={item?.hargaKamar}
							img={item?.fotoKamar !== 0 ? item?.fotoKamar[0].uri : 'https://htmlcolorcodes.com/assets/images/colors/steel-gray-color-solid-background-1920x1080.png'}
							onPress={() => navigation.navigate('KamarDetail', {
								id_kamar: item?.id,
								nama_kos
							})}
							statusKamar={item?.statusKamar}
						/>
					))}
					<View style={{ marginTop: 20 }} />
				</ScrollView>
			)}
		</SafeAreaView>
	)
}