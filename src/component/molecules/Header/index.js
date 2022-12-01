import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {Button} from '../../atoms';
import {colors} from '../../../utils';
import {LogoSecondary} from '../../../assets/img';
import {useSelector} from 'react-redux';

export default function Header({title, onPress, type}) {
  const user = useSelector(state => state?.login?.user);

  if (type === 'user') {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          alignContent: 'center',
        }}>
        <LogoSecondary width={90} />
        {user ? (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                marginRight: 5,
                color: colors.darkBlue,
                fontSize: 10,
              }}>
              Hi,
            </Text>
            <Text style={styles.Sayhello}>{user?.firstName}</Text>
            <Image
              source={{
                uri: user?.image,
              }}
              style={styles.Image}
            />
          </View>
        ) : (
          <View style={{width: 50}}>
            <Button title="login" color={colors.darkBlue} onPress={onPress} />
          </View>
        )}
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Button
        type="icon"
        icon={'chevron-back-outline'}
        size={25}
        color={colors.white}
        onPress={onPress}
      />
      <Text style={styles.text}>{title}</Text>
      <View style={{width: 25}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: colors.white,
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  Sayhello: {
    color: colors.darkBlue,
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 10,
  },
  Image: {
    height: 30,
    width: 30,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: colors.darkBlue,
  },
});
