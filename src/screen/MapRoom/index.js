import { ImageMapper, Header } from "../../component/molecules"
import { ToastAndroid, Dimensions, SafeAreaView, View, ScrollView, Image } from "react-native"
import { useState } from "react"
import { colors } from "../../utils";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function MapRoom({navigation}){
	const MAPPING = [
		{
			id: '0',
			name: 'Kamar 1',
			shape: 'circle',
			radius: 20,
			x1: 70,
			y1: 140,
			prefill: colors.darkBlue
		},
		{
			id: '1',
			name: 'Kamar 2',
			shape: 'circle',
			radius: 20,
			x1: 165,
			y1: 235,
			prefill: colors.darkBlue
		},
		{
			id: '2',
			name: 'Kamar 3',
			shape: 'circle',
			radius: 20,
			x1: 70,
			y1: 68,
			prefill: colors.darkBlue
		},
	]
	const [selectedAreaId, setSelectedAreaId] = useState();
	const mapperAreaClickHandler = async (item, idx, event) => {
		console.log("item",item);
		console.log("idx", idx);
		ToastAndroid.show(item.name, ToastAndroid.SHORT)
		// console.log("selectedid", selectedAreaId);
    // const currentSelectedAreaId = selectedAreaId;
    // if (Array.isArray(currentSelectedAreaId)) {
    //   const indexInState = currentSelectedAreaId.indexOf(item.id);
		// 	console.log("indexinstate", indexInState);
    //   if (indexInState !== -1) {
    //     console.log('Removing id', item.id);
    //     setSelectedAreaId([
    //       ...currentSelectedAreaId.slice(0, indexInState),
    //       ...currentSelectedAreaId.slice(indexInState + 1),
    //     ]);
    //   } else {
    //     alert(`Clicked Item Id: ${item.id}`);
    //     console.log('Setting Id', item.id);
    //     setSelectedAreaId([...currentSelectedAreaId, item.id]);
    //   }
    // } else {
    //   if (item.id === currentSelectedAreaId) {
    //     setSelectedAreaId(null);
    //   } else {
    //     setSelectedAreaId(item.id);
    //   }
    // }
  };
	
	return(
		<SafeAreaView>
			<ScrollView>
				<View style={{backgroundColor: colors.darkBlue, padding: 15, marginBottom: 10}}>
					<Header title="Denah Kos" onPress={() => navigation.goBack()} />
				</View>
				{/* <Image 
					source={{
						uri: "https://cdnwpseller.gramedia.net/wp-content/uploads/2022/04/22013312/image027-2.png"
					}}
					style={{
						width: windowWidth,
						height: 370
					}}
				/> */}
				<ImageMapper
					imgHeight={370}
					imgWidth={windowWidth}
					imgSource={{ uri: "https://ihategreenjello.com/wp-content/uploads/2022/10/311205985_184918090692091_4917672946643317673_n.jpg" }}
					imgMap={MAPPING}
					onPress={(item, idx, event) => mapperAreaClickHandler(item, idx, event)}
					multiselect={false}
					containerStyle={{ top: 0 }}
					selectedAreaId={selectedAreaId}
				/>
			</ScrollView>
		</SafeAreaView>
	)
}