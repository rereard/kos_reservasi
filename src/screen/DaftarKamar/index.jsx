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

export default function DaftarKamar({ navigation }) {
	return (
		<SafeAreaView>
			<View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.darkBlue, padding: 15 }}>
				<Header onPress={() => navigation.goBack()} size={30} title={'Kos Testing'} />
				{/* <Text style={{ color: colors.white, fontSize: 18, fontWeight: '700', textAlign: 'center' }}>
					Kos Testing
				</Text> */}
				<View style={{ width: 25 }} />
			</View>
		</SafeAreaView>
	)
}