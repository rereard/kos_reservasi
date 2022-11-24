import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    FlatList,
    Image,
    Pressable,
} from 'react-native';
import { Ilustraion1, Logo } from '../../../assets/img';
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { useState } from 'react';

export default function HotelCard() {

    const [isFavorite, setIsFavorite] = useState(false)

    return (
        <View style={styles.container}>
            <Pressable style={({pressed}) => [{backgroundColor: pressed ? '#e5e5e5' : 'white', borderRadius: 10}]}>
                <Image 
                    source={{ uri: 'https://img.inews.co.id/media/822/files/inews_new/2022/03/25/Hotel_Dekat_Malioboro.jpg' }} 
                    style={styles.image} 
                />
                <Pressable 
                    style={styles.favoriteBtn} 
                    onPress={() => setIsFavorite(!isFavorite)}
                >
                    <Text style={{ color: "#0364CE" }}>
                        <FontAwesome 
                            name={isFavorite ? "heart" : "heart-o"} 
                            style={{ fontSize: 18 }} 
                        />
                    </Text>
                </Pressable>
                <View style={styles.detailBox}>
                    <View style={styles.leftDetail}>
                        <Text 
                            numberOfLines={2} 
                            style={styles.textHeader} 
                        >
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, dolor.
                        </Text>
                        <Text style={styles.text} ><FontAwesome name='star' style={{ fontSize: 15 }} /> 9.98 | x reviews</Text>
                    </View>
                    <View style={{ flex: 0.1 }}></View>
                    <View style={styles.rightDetail}>
                        <Text style={styles.text}>Rp 200.000,00</Text>
                        <Text style={styles.text}>/night</Text>
                    </View>
                </View>
            </Pressable>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%", 
        backgroundColor: "#0364ce",
        borderRadius: 10, 
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: 20
    },
    image: { 
        height: 150, 
        width: "100%", 
        borderTopLeftRadius: 10, 
        borderTopRightRadius: 10 
    },
    favoriteBtn: { 
        position: "absolute", 
        backgroundColor: "white", 
        padding: 10, 
        borderRadius: 99, 
        right: 5, 
        top: 5 
    },
    detailBox: { 
        padding: 8, 
        flexDirection: "row" 
    },
    leftDetail: { 
        flex: 1, 
        justifyContent: "center" 
    },
    rightDetail: { 
        justifyContent: "center", 
        alignItems: "flex-end"
    },
    textHeader: { 
        color: "#0364ce", 
        fontWeight: "700", 
        fontSize: 18, 
        marginBottom: 5 
    },
    text: { 
        color: "#0364ce", 
        fontSize: 15, 
        fontWeight: "400" 
    }
})