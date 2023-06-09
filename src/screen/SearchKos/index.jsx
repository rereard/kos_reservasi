import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ToastAndroid } from "react-native";
import MapView from "react-native-maps";
// import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { colors } from "../../utils";
import { TextInput } from "react-native-gesture-handler";
import { Button } from "../../component/atoms";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Marker } from "react-native-maps";
import { kos } from '../../assets/db/data'
import GetLocation from 'react-native-get-location'
const { width, height } = Dimensions.get('window')
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width

function CustomMarker() {
	return (
		<View>
			<Ionicons name={'home-sharp'}
				style={{
					fontSize: 30,
					color: colors.darkBlue
				}}
			/>
		</View>
	);
}

function calculateDistance(lat1, lon1, lat2, lon2) {
	const toRad = (value) => (value * Math.PI) / 180;
	const R = 6371;
	const dLat = toRad(lat2 - lat1);
	const dLon = toRad(lon2 - lon1);
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(toRad(lat1)) *
		Math.cos(toRad(lat2)) *
		Math.sin(dLon / 2) *
		Math.sin(dLon / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	const distance = R * c;
	return distance;
}

export default function SearchKos({ route, navigation }) {
	const [myLocation, setMyLocation] = useState(null)
	const requestLocation = () => {
		GetLocation.getCurrentPosition({
			enableHighAccuracy: true,
			timeout: 60000,
		}).then(location => {
			setMyLocation({ latitude: location?.latitude, longitude: location?.longitude })
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

	const { inputLocation, gpsLoc } = route.params
	const [locationInput, setLocationInput] = useState(inputLocation)
	const [location, setLocation] = useState(null);
	const [filteredKos, setFilteredKos] = useState([])

	const handleGetLocation = (location) => {
		// Make a request to the Google Maps Geocoding API
		fetch(
			`https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAs_jSojED1P8tZJ3B3Vwue7jV8Pmos0Hk&address=${location}`
		)
			.then((response) => response.json())
			.then((responseJson) => {
				console.log(responseJson);
				// Extract the latitude and longitude from the response
				if (responseJson?.status ===
					"ZERO_RESULTS") {
					ToastAndroid.show('Tidak ditemukan lokasi', ToastAndroid.SHORT)
				} else {
					const { lat, lng } = responseJson?.results[0]?.geometry?.location;
					setLocation({ latitude: lat, longitude: lng });
					setRegion({
						latitude: lat,
						longitude: lng,
						latitudeDelta: 0.01,
						longitudeDelta: 0.01
					})
				}
			})
			.catch((error) => console.error(error))
	};

	const [pressId, setPressid] = useState(null)
	const [region, setRegion] = useState(
		gpsLoc ? gpsLoc : {
			latitude: 35.6762,
			longitude: 139.6503,
			latitudeDelta: 0.01,
			longitudeDelta: 0.01,
		}
	);

	useEffect(() => {
		locationInput &&
			handleGetLocation(locationInput)
		console.log('location', location);
		console.log('region', region);
	}, [locationInput]);

	const [input, setInput] = useState('');

	useEffect(() => {
		setFilteredKos([])
		let result = []
		kos.map((item) => {
			const distance = calculateDistance(region.latitude, region.longitude, item.latitude, item.longitude)
			console.log('distance', distance);
			if (distance <= 1) {
				console.log('item', item);
				result.push(item)
			}
		})
		setFilteredKos(result)
		console.log('filteredkos', filteredKos);
	}, [region]);

	// useEffect(() => {
	// 	// const index = kos.findIndex((item) => item.id_kos === pressId)
	// 	// setIndexPressed(index)
	// 	console.log('pressid', pressId);
	// 	console.log('indexpressed', indexPressed);
	// }, [pressId]);

	return (
		<View style={styles.container}>
			<View style={{ position: 'absolute', zIndex: 3, top: '50%', left: '50%', marginLeft: -7, marginTop: -32 }}>
				<Text style={{ color: colors.black, fontSize: 25 }}>+</Text>
			</View>

			<MapView
				style={styles.map}
				onRegionChangeComplete={(region) => setRegion(region)}
				region={region}
				onPress={() => {
					setPressid(null)
				}}
				loadingEnabled={true}
				showsUserLocation={true}
				customMapStyle={[
					{
						"featureType": "poi.business",
						"stylers": [
							{
								"visibility": "off"
							}
						]
					},
					{
						"featureType": "poi.park",
						"elementType": "labels.text",
						"stylers": [
							{
								"visibility": "off"
							}
						]
					}
				]}
			>
				{filteredKos.map((item, index) => (
					<Marker
						key={item.id_kos}
						coordinate={({
							latitude: item.latitude,
							longitude: item.longitude,
							latitudeDelta: 0.01,
							longitudeDelta: 0.01,
						})}
						title={item.nama_kos}
						description={item.alamat}
						onPress={() => {
							setPressid(item.id_kos)
						}}
					>
						<CustomMarker />
					</Marker>
				))}
			</MapView>
			<View style={{
				marginHorizontal: 10,
				flexDirection: 'row',
				alignItems: 'center',
				marginTop: 20
			}}>
				<Button
					type={'icon'}
					onPress={() => navigation.goBack()}
					icon={'arrow-back'}
					size={40}
					color={colors.darkBlue}
				/>
				<View style={{ flex: 1 }}>
					<TextInput
						style={{
							borderRadius: 50,
							paddingHorizontal: 20,
							color: colors.black,
							backgroundColor: colors.white,
							borderWidth: 1,
							borderColor: colors.darkGrey,

						}}
						placeholder="Cari lokasi"
						placeholderTextColor={colors.darkGrey}
						onChangeText={value => setInput(value)}
						onSubmitEditing={() => {
							// setRegion({
							// 	latitude: 37.78825,
							// 	longitude: -122.4324,
							// 	latitudeDelta: 0.0922,
							// 	longitudeDelta: 0.0421,
							// })
							setLocationInput(input)
							setInput('')
						}}
						value={input}
					/>
					<Ionicons name={'location-outline'}
						style={{
							position: 'absolute',
							right: 0,
							top: 0,
							fontSize: 20,
							padding: 14,
							color: colors.darkGrey
						}}
						onPress={() => {
							requestLocation()
						}}
					/>
				</View>
			</View>
			<View style={{
				backgroundColor: colors.white,
				width: SCREEN_WIDTH,
				height: 125,
				position: 'absolute',
				bottom: 0,
				padding: 18,
				display: pressId ? 'flex' : 'none',
				flexDirection: 'row',
				justifyContent: 'space-between',
				// alignItems: 'center',
				borderWidth: 1,
				flex: 1
			}}>
				<View style={{ flex: 1.5 }}>
					{/* <Text style={{ color: colors.black, fontSize: 25 }}>{pressId === 1 ? 'Kos Ngentot 1' : pressId === 2 ? 'Kos Ngentot 2' : 'congrats'}</Text>
					<Text style={{ color: colors.darkGrey, fontSize: 18 }}>{pressId === 1 ? 'Jl Ngentot 1' : pressId === 2 ? 'Jl Ngentot 2' : 'congrats'}</Text> */}
					<Text style={{ color: colors.black, fontSize: 25 }}>{pressId ? kos.find((item) => item.id_kos === pressId).nama_kos : ''}</Text>
					<Text style={{ color: colors.darkGrey, fontSize: 15 }}>{pressId ? kos.find((item) => item.id_kos === pressId).alamat : ''}</Text>
				</View>
				<View style={{ alignItems: 'center', flex: 1 }}>
					<TouchableOpacity
						style={{
							backgroundColor: colors.darkBlue,
							width: 50,
							height: 50,
							justifyContent: 'center',
							borderRadius: 999,
							alignItems: 'center'
						}}
						onPress={() => navigation.navigate('KosDetail', {
							data: kos.find((item) => item.id_kos === pressId)
						})}
					>
						<Ionicons name="arrow-forward" style={{
							fontSize: 30
						}} />
					</TouchableOpacity>
					<Text style={{ color: colors.darkGrey }}>Info Selengkapnya</Text>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		// height: SCREEN_HEIGHT,
		// width: SCREEN_WIDTH,
		flex: 1,
	},
	map: {
		...StyleSheet.absoluteFillObject,
	},
	text: {
		fontSize: 15,
		color: colors.black
	}
});