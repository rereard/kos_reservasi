import { View, Text, StyleSheet, TextInput, Pressable, ToastAndroid, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import Input from '../../component/atoms/Input';
import Button from '../../component/atoms/Button';
import { useDispatch, useSelector } from "react-redux"
import { setUser } from '../../features/loginSlice';
import axios from 'axios';
import { colors } from '../../utils';
import Header from '../../component/molecules/Header';
import firestore from '@react-native-firebase/firestore';
import Filter from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';
import Modal from "react-native-modal";

export default function Sign({ navigation }) {

  const dispatch = useDispatch()

  const user = useSelector((state) => state.login.user)

  useEffect(() => {
    if (user) {
      navigation.navigate('main')
    }
  }, [user]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nama, setNama] = useState('')
  const [email, setEmail] = useState('')
  const [noWa, setnoWa] = useState('')
  const [passReg, setPassReg] = useState('')
  const [tipeAkun, setTipeAkun] = useState(false)
  const [unameReg, setUnameReg] = useState()
  const [daftarMode, setDaftarMode] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!daftarMode) {
      setUnameReg('')
      setPassReg('')
      setEmail('')
      setnoWa('')
      setTipeAkun(false)
    }
  }, [daftarMode]);

  const cobaLogin = async () => {
    setLoading(true)
    firestore().collection('akun').where('username', '==', username).where('password', '==', password).get().then(qSnap => {
      if (qSnap.empty) {
        ToastAndroid.show('Akun tidak terdaftar', ToastAndroid.SHORT)
        setLoading(false)
      } else {
        setLoading(false)
        console.log('qsnap', qSnap);
        const user = qSnap.docs[0].data()
        user.id_akun = qSnap.docs[0].id
        console.log(user);
        dispatch(setUser(user))
      }
    })
  }

  const cekAkunTerdaftar = async () => {
    setLoading(true)
    firestore().collection('akun').where(
      Filter.Filter.or(
        Filter.Filter('email', '==', email),
        Filter.Filter('username', '==', unameReg)
      )
    ).get().then(qSnap => {
      console.log(qSnap);
      if (!qSnap.empty) {
        setLoading(false)
        ToastAndroid.show('Email / Username telah terdaftar', ToastAndroid.SHORT)
      } else {
        registrasi()
      }
    })
  }

  const registrasi = async () => {
    setLoading(true)
    firestore().collection('akun').add({
      email,
      nama,
      noWa: `62${noWa}`,
      password: passReg,
      username: unameReg,
      tipeAkun: tipeAkun ? 2 : 1
    }).then(() => {
      setDaftarMode(false)
      setLoading(false)
      ToastAndroid.show('Berhasil mendaftar', ToastAndroid.SHORT)
    }).catch(e => {
      console.log(e);
      ToastAndroid.show('Yahh error', ToastAndroid.SHORT)
      setLoading(false)
    })
  }

  const validateEmail = (text) => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      console.log("Email is Not Correct");
      return false;
    } else {
      return true
    }
  }

  if (daftarMode) {
    return (
      <ScrollView style={styles.page}>
        <Modal
          isVisible={loading}
          useNativeDriver={true}
          backdropOpacity={0.4}
          animationIn={'fadeIn'}
          animationOut={'fadeOut'}
        >
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View
              style={{
                backgroundColor: colors.white,
                borderRadius: 5,
                maxHeight: 600,
                maxWidth: 700,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
            >
              <Text style={{ color: colors.black, fontWeight: 'bold', fontSize: 18, marginHorizontal: 15, marginVertical: 10 }}>
                Memuat...
              </Text>
            </View>
          </View>
        </Modal>
        <View style={styles.content}>
          <Text style={styles.title}>Daftar Akun</Text>
          <View style={styles.Input}>
            <Text style={{ color: colors.white, fontWeight: 'bold', marginBottom: 5, paddingLeft: 5 }}>Email:</Text>
            <Input
              placeholder="JohnDoe@example.com"
              inputMode={'email'}
              onChangeText={value => setEmail(value)}
            />
            <View style={{ height: 5 }}></View>
            <Text style={{ color: colors.white, fontWeight: 'bold', marginBottom: 5, paddingLeft: 5 }}>Password:</Text>
            <Input
              placeholder="example123"
              type={'password'}
              onChangeText={value => setPassReg(value)}
            />
            <View style={{ height: 5 }}></View>
            <Text style={{ color: colors.white, fontWeight: 'bold', marginBottom: 5, paddingLeft: 5 }}>Nama:</Text>
            <Input
              placeholder="John Doe"
              onChangeText={value => setNama(value)}
            />
            <View style={{ height: 5 }}></View>
            <Text style={{ color: colors.white, fontWeight: 'bold', marginBottom: 5, paddingLeft: 5 }}>Username:</Text>
            <Input
              placeholder="johndoe"
              onChangeText={value => setUnameReg(value)}
            />
            <View style={{ height: 5 }}></View>
            <Text style={{ color: colors.white, fontWeight: 'bold', marginBottom: 5, paddingLeft: 5 }}>Nomor WhatsApp:</Text>
            <Input
              keyboard={'phone-pad'}
              placeholder="81234567890"
              onChangeText={value => setnoWa(value)}
              type={'telephone'}
            />
            <View style={{ height: 10 }}></View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <CheckBox
                value={tipeAkun}
                onValueChange={(value) => {
                  setTipeAkun(value)
                }}
                tintColors={{
                  true: colors.white,
                  false: colors.white
                }}
              />
              <Text style={{ color: colors.white, fontWeight: 'bold', paddingLeft: 3, fontSize: 16 }}>Daftar sebagai pemilik kos</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Pressable
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flex: 1
              }}
              onPress={() => {
                setTipeAkun(false)
                setDaftarMode(false)
              }}
            >
              <Ionicons
                name='chevron-back'
                style={{
                  fontSize: 23,
                  color: colors.white,
                }}
              />
              <Text style={{
                fontSize: 16,
                color: colors.white,
                textDecorationLine: 'underline',
                fontWeight: 'bold'
              }}>
                Kembali
              </Text>
            </Pressable>
            <TouchableOpacity
              style={{
                backgroundColor: colors.yellow,
                paddingVertical: 10,
                padding: 10,
                borderRadius: 10,
                flex: 1,
              }}
              onPress={() => {
                if (nama !== '' && email !== '' && noWa !== '' && passReg !== '' && unameReg !== '') {
                  if (validateEmail(email)) {
                    cekAkunTerdaftar()
                  } else {
                    ToastAndroid.show('Email tidak sesuai!', ToastAndroid.SHORT)
                  }
                } else {
                  ToastAndroid.show('Lengkapi data terlebih dahulu', ToastAndroid.SHORT)
                }
              }}
            >
              <Text style={{ color: colors.black, fontSize: 16, textAlign: 'center' }}>Daftar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    )
  } else {
    return (
      <View style={styles.page}>
        <View style={styles.content}>
          <Text style={styles.title}>WELCOME!</Text>
          <Text style={styles.text}>Silahkan masuk untuk mengakses reservasi kos</Text>
          <View style={styles.Input}>
            <Text style={{ color: colors.white, fontWeight: 'bold', marginBottom: 5, paddingLeft: 5 }}>Username:</Text>
            <Input
              placeholder="Masukkan username"
              onChangeText={value => setUsername(value)}
            />
            <View style={{ height: 5 }}></View>
            <View>
              <Text style={{ color: colors.white, fontWeight: 'bold', marginBottom: 5, paddingLeft: 5 }}>Password:</Text>
              <Input
                type="password"
                placeholder="Masukkan password"
                onChangeText={value => setPassword(value)}
              />
            </View>
          </View>
          <Button title="Login" onPress={cobaLogin} color={colors.yellow} />
          <View style={{ flexDirection: 'row', marginTop: 9, justifyContent: 'center' }}>
            <Text style={{ color: colors.white, fontSize: 16, marginBottom: 5 }}>Belum punya akun?</Text>
            <Pressable
              onPress={() => {
                setDaftarMode(true)
              }}
            >
              <Text style={{ color: colors.white, fontWeight: 'bold', fontSize: 16, marginBottom: 5, paddingLeft: 5, textDecorationLine: 'underline' }}>Daftar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.darkBlue,
    flex: 1,
    padding: 40,
  },
  content: {
    justifyContent: 'center',
    flex: 1,
  },
  Input: {
    marginTop: 20,
    marginBottom: 15,
  },
  title: {
    fontSize: 40,
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    marginTop: 5,
    color: colors.white,
    textAlign: 'center',
  },
});
