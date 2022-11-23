import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Modal,
    TextInput
} from 'react-native';

export default function EditModal({ title, visible, onRequestClose, onPressCancel, data, onChangeText, onPressEdit }) {
    return(
        <Modal
            animationType='fade'
            transparent={true}
            visible={visible}
            onRequestClose={onRequestClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalHeader}>
                        Edit {title}
                    </Text>
                    <TextInput style={styles.textInput} value={data} onChangeText={onChangeText} />
                    <View style={styles.optionView}>
                        <TouchableOpacity style={styles.button} onPress={onPressEdit}>
                            <Text style={styles.textButton}>
                                Edit
                            </Text>
                        </TouchableOpacity>
                        <View style={{ flex: 0.3 }}></View>
                        <TouchableOpacity style={styles.button} onPress={onPressCancel}>
                            <Text style={styles.textButton}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: { 
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center' 
    },
    modalView: { 
        backgroundColor: "white", 
        borderRadius: 10, 
        padding: 20, 
        shadowColor: "#000", 
        shadowOffset: { 
            width: 0, 
            height: 2 
        }, 
        shadowOpacity: 0.25, 
        shadowRadius: 4, 
        elevation: 5, 
        width: '75%' 
    },
    modalHeader: { 
        marginBottom: 10, 
        color: "#000", 
        fontWeight: "500", 
        fontSize: 17 
    },
    textInput: { 
        borderBottomWidth: 0.5, 
        padding: 0, 
        width: "100%", 
        fontSize: 15 
    },
    optionView: { 
        flexDirection: 'row', 
        marginTop: 20, 
        justifyContent: "space-around" 
    },
    button: { 
        backgroundColor: "#e75874", 
        padding: 9, 
        borderRadius: 10, 
        flex: 1 
    },
    textButton: { 
        textAlign: 'center',
        color: "#fff" 
    }
})