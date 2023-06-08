import {View, Text, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors} from '../../../../utils';

export default function InputModal({
  guest,
  room,
  buttonMinRoom,
  buttonPlusRoom,
  buttonMinGuest,
  buttonPlusGuest,
  onRequestClose,
  onPressOk,
  visible,
}) {
  return (
    <Modal transparent={true} onRequestClose={onRequestClose} visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text
            style={{
              color: colors.black,
            }}>{`${guest} Guest & ${room} Room`}</Text>
          <View style={styles.content}>
            <Text style={{color: colors.black}}>Guest</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={styles.Button}
                disabled={guest === 1 ? true : false}
                onPress={buttonMinGuest}>
                <Text style={styles.textButton}>-</Text>
              </TouchableOpacity>
              <Text style={{paddingHorizontal: 20, color: colors.black}}>
                {guest}
              </Text>
              <TouchableOpacity
                style={styles.Button}
                disabled={guest === 32 ? true : false}
                onPress={buttonPlusGuest}>
                <Text style={styles.textButton}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.content}>
            <Text style={{color: colors.black}}>Room</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={styles.Button}
                onPress={buttonMinRoom}
                disabled={room === 1 ? true : false}>
                <Text style={styles.textButton}>-</Text>
              </TouchableOpacity>
              <Text style={{paddingHorizontal: 20, color: colors.black}}>{room}</Text>
              <TouchableOpacity
                style={styles.Button}
                onPress={buttonPlusRoom}
                disabled={room === 8 ? true : false}>
                <Text style={styles.textButton}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.buttonOk} onPress={onPressOk}>
            <Text style={styles.textButtonOk}>Ok</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Button: {
    backgroundColor: colors.white,
    borderColor: colors.darkGrey,
    borderWidth: 1,
    borderRadius: 99,
    padding: 8,
    paddingHorizontal: 14,
  },
  buttonOk: {
    marginTop: 10,
    backgroundColor: colors.darkBlue,
    padding: 9,
    borderRadius: 10,
  },
  textButtonOk: {
    textAlign: 'center',
    color: colors.white,
  },
  textButton: {
    color: colors.darkBlue,
    fontWeight: 'bold',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '85%',
  },
});
