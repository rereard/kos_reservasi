import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import EditModal from '../EditModal';
import {useState} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function SettingsRow({
  isPassword,
  title,
  titleIcon,
  data,
  dataEditable,
  setEditedData,
  pressable,
  onPress,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [inputTextValue, setInputTextValue] = useState(data);

  if (pressable) {
    return (
      <Pressable
        style={({pressed}) => [
          {
            backgroundColor: pressed ? '#d4e8ff' : 'white',
          },
          styles.container,
        ]}
        onPress={onPress}>
        <Text style={styles.titleText}>
          {titleIcon} {title}
        </Text>
      </Pressable>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>
          {titleIcon} {title}
        </Text>
        {dataEditable && (
          <>
            <TouchableOpacity
              style={styles.dataEditButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.dataText}>{isPassword ? data.replace(/./gi, '•') : data} </Text>
              <Text style={styles.dataText}>
                <FontAwesome5 name="chevron-right" />
              </Text>
            </TouchableOpacity>
            <EditModal
              title={title}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(!modalVisible)}
              onPressCancel={() => {
                setInputTextValue(data);
                setModalVisible(false);
              }}
              onPressEdit={() => {
                setEditedData(inputTextValue);
                setModalVisible(false);
              }}
              data={inputTextValue}
              onChangeText={setInputTextValue}
              isPassword={isPassword}
            />
          </>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  titleText: {
    color: '#000',
  },
  dataEditButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  dataText: {
    color: '#a3a3a3',
  },
});
