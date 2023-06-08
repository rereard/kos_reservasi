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

const KamarCard = ({ nama, harga, img, onPress }) => {
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
				<View style={{ padding: 10, justifyContent: 'center' }}>
					<Text style={{ color: colors.black, fontSize: 18, fontWeight: '500' }}>{nama}</Text>
					<Text style={{ color: colors.darkGrey, fontSize: 18, fontWeight: '500' }}>Rp {harga}/bulan</Text>
				</View>
			</View>
		</Pressable>
	)
}

export default function DaftarKamar({ navigation }) {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.darkBlue, padding: 15 }}>
				<Header onPress={() => navigation.goBack()} size={30} title={'Kos Testing'} />
			</View>
			<ScrollView>
				<Text style={{ color: colors.black, fontWeight: '600', fontSize: 20, margin: 15, marginBottom: 0 }}>Daftar Kamar:</Text>
				<KamarCard nama={'Kamar 1'} harga={200000} img={'https://parboaboa.com/data/foto_berita/kamar-kost-kmd.webp'} onPress={() => navigation.navigate('KamarDetail')} />
				<KamarCard nama={'Kamar 2'} harga={400000} img={'https://parboaboa.com/data/foto_berita/kamar-kost-kmd.webp'} />
				<KamarCard nama={'Kamar 3'} harga={700000} img={'https://parboaboa.com/data/foto_berita/kamar-kost-kmd.webp'} />
				<KamarCard nama={'Kamar 3'} harga={700000} img={'https://parboaboa.com/data/foto_berita/kamar-kost-kmd.webp'} />
				<KamarCard nama={'Kamar 3'} harga={700000} img={'https://parboaboa.com/data/foto_berita/kamar-kost-kmd.webp'} />
				<View style={{ marginTop: 20 }} />
			</ScrollView>
		</SafeAreaView>
	)
}