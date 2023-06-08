import { StyleSheet, Text, View, Dimensions, TouchableOpacity  } from "react-native";
import MapView from "react-native-maps";
// import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { colors } from "../../utils";
import { TextInput } from "react-native-gesture-handler";
import { Button } from "../../component/atoms";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Marker } from "react-native-maps";

const {width, height} = Dimensions.get('window')
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width

function CustomMarker({ pressed }) {
  return (
    <View>
      <Ionicons name={'home-sharp'} 
				style={{
					fontSize: pressed? 50 : 30,
					color: colors.darkBlue
				}}
			/>
    </View>
  );
}

export default function SearchKos({navigation}){

	const [isMarkPressed, setIsMarkPressed] = useState(false)
	const [pressId, setPressid] = useState(null)

	const [region, setRegion] = useState({
		latitude: 35.6762,
		longitude: 139.6503,
		latitudeDelta: 0.01,
		longitudeDelta: 0.01,
	});
	const [input, setInput] = useState('');

	return(
		<View style={styles.container}>
			
			<MapView
				style={styles.map} 
				onRegionChangeComplete={(region) => setRegion(region)}
				region={region}
				onPress={() => setPressid(null)}
			>
				<Marker 
					coordinate={{
						latitude: 35.6762,
						longitude: 139.6503,
						latitudeDelta: 0.01,
						longitudeDelta: 0.01,
					}}	
					title="Tokyo"
					description="lorem ipsum ngentot babi"
					onPress={() => setPressid(1)}
				>
					<CustomMarker pressed={isMarkPressed} />
				</Marker>
				<Marker 
					coordinate={{
						latitude: 35.678013,
						longitude: 139.651491,
						latitudeDelta: 0.01,
						longitudeDelta: 0.01,
					}}	
					title="Tokyo ii"
					description="lorem ipsum ngentot babi"
					onPress={() => setPressid(2)}
				>
					<CustomMarker pressed={isMarkPressed} />
				</Marker>
			</MapView>
			<Text style={styles.text}>Current latitude: {region.latitude}</Text>
			<Text style={styles.text}>Current longitude: {region.longitude}</Text>
			<Text style={styles.text}>Current longitudeDelta: {region.longitudeDelta}</Text>
			<Text style={styles.text}>Current latitudeDelta: {region.latitudeDelta}</Text>
			<View style={{ 
				marginHorizontal: 10,
				flexDirection: 'row',
				alignItems: 'center'
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
							setRegion({
								latitude: 37.78825,
								longitude: -122.4324,
								latitudeDelta: 0.0922,
								longitudeDelta: 0.0421, 
							})
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
						onPress={() => setRegion({
							latitude: 37.686693536206,
							longitude: 83.015901809229,
							latitudeDelta: 0.4,
							longitudeDelta: 0.7
						})} 
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
				borderWidth: 1
			}}>
				<View>
					<Text style={{ color: colors.black, fontSize: 25 }}>{pressId === 1 ? 'Kos Ngentot 1' : pressId === 2 ? 'Kos Ngentot 2' : 'congrats'}</Text>
					<Text style={{ color: colors.darkGrey, fontSize: 18 }}>{pressId === 1 ? 'Jl Ngentot 1' : pressId === 2 ? 'Jl Ngentot 2' : 'congrats'}</Text>
				</View>
				<View style={{ alignItems:'center' }}>
					<TouchableOpacity
						style={{
							backgroundColor: colors.darkBlue,
							width: 50,
							height: 50,
							justifyContent: 'center',
							borderRadius: 999,
							alignItems: 'center'
						}}
						onPress={() => navigation.navigate('KosDetail')}
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