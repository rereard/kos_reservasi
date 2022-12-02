import {View, Text, StyleSheet, TextInput} from 'react-native';
import React, {useState, useEffect} from 'react';
import Input from '../../component/atoms/Input';
import Button from '../../component/atoms/Button';
import { useDispatch, useSelector } from "react-redux"
import { setUser } from '../../features/loginSlice';
import axios from 'axios';
import {colors} from '../../utils';
import Header from '../../component/molecules/Header';

export default function Sign({navigation}) {

  const dispatch = useDispatch()

  const user = useSelector((state) => state.login.user)

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const Login = async () => {
    try {
      const responseAuth = await axios.post('https://dummyjson.com/auth/login', {
        username: username,
        password: password,
      })
      const responseUserData = await axios.get(`https://dummyjson.com/users/${responseAuth.data.id}`)
      dispatch(setUser({auth: responseAuth.data, pass: responseUserData.data.password, phone: responseUserData.data.phone}))
      navigation.navigate('main');
    } catch (e) {
      throw(e)
    }
      // .then(response => {
      //   console.log(response);
      //   dispatch(setUser({auth: response.data, pass: password}))
      //   navigation.navigate('main');
      // })
      // .catch(err => {
      //   console.log(err);
      // });
  };

  console.log(username);

  return (
    <View style={styles.page}>
      <Header title="Sign" onPress={() => navigation.goBack()} />
      <View style={styles.content}>
        <Text style={styles.title}>WELLCOME</Text>
        <Text style={styles.text}>Please sign to access application</Text>
        <View style={styles.Input}>
          <Input
            placeholder="Username"
            onChangeText={value => setUsername(value)}
          />
          <View style={{height: 10}}></View>
          <View>
            <Input
              type="password"
              placeholder="Password"
              onChangeText={value => setPassword(value)}
            />
          </View>
        </View>
        <Button title="Login" onPress={Login} color={colors.yellow} />
      </View>
    </View>
  );
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
    marginBottom: 10,
  },
  title: {
    fontSize: 25,
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 12,
    marginTop: 5,
    color: colors.white,
    textAlign: 'center',
  },
});
