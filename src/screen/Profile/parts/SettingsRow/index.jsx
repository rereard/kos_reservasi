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
import {useDispatch, useSelector} from 'react-redux';
import {updateUser} from '../../../../features/loginSlice';
import {colors} from '../../../../utils';

export default function SettingsRow({
  isPassword,
  title,
  titleIcon,
  prop,
  data,
  dataEditable,
}) {
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const [inputTextValue, setInputTextValue] = useState(data);

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>
        {titleIcon} {title}
      </Text>
      {dataEditable && (
        <>
          <TouchableOpacity
            style={styles.dataEditButton}
            onPress={() => setModalVisible(true)}>
            <Text style={styles.dataText}>
              {isPassword ? data.replace(/./gi, '•') : data}{' '}
            </Text>
            <View>
              <FontAwesome5 name="chevron-right" color={colors.darkGrey} />
            </View>
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
              dispatch(updateUser({prop, value: inputTextValue}));
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

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: colors.grey,
  },
  titleText: {
    color: colors.black,
  },
  dataEditButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  dataText: {
    color: colors.darkGrey,
  },
});
