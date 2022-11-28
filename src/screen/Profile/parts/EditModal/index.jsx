import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../../../../component/atoms/Button';

export default function EditModal({
  title,
  visible,
  onRequestClose,
  onPressCancel,
  data,
  onChangeText,
  onPressEdit,
  isPassword,
}) {
  const [showPassword, setShowPassword] = useState(true);
  const [iconEye, setIconEye] = useState('eye-off-outline');

  const ShowPw = () => {
    if (showPassword === false) {
      setIconEye('eye-off-outline');
      setShowPassword(!showPassword);
    } else {
      setIconEye('eye-outline');
      setShowPassword(false);
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalHeader}>Edit {title}</Text>
          {isPassword ? (
            <View style={{justifyContent: 'center'}}>
              <TextInput
                style={styles.textInput}
                value={data}
                secureTextEntry={showPassword}
                onChangeText={onChangeText}
              />
              <Ionicons name={iconEye} style={styles.icon} onPress={ShowPw} />
            </View>
          ) : (
            <TextInput
              style={styles.textInput}
              value={data}
              onChangeText={onChangeText}
            />
          )}

          <View style={styles.optionView}>
            <TouchableOpacity style={styles.button} onPress={onPressEdit}>
              <Text style={styles.textButton}>Edit</Text>
            </TouchableOpacity>
            <View style={{width: 10}}></View>
            <TouchableOpacity style={styles.button} onPress={onPressCancel}>
              <Text style={styles.textButton}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '85%',
  },
  modalHeader: {
    marginBottom: 10,
    color: '#000',
    fontWeight: '500',
    fontSize: 17,
  },
  textInput: {
    borderBottomWidth: 0.5,
    padding: 0,
    width: '100%',
    fontSize: 15,
    color: 'black',
  },
  optionView: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#0364CE',
    padding: 9,
    borderRadius: 10,
    flex: 1,
  },
  textButton: {
    textAlign: 'center',
    color: '#fff',
  },
  icon: {
    position: 'absolute',
    right: 0,
    fontSize: 15,
    color: 'black',
  },
});
