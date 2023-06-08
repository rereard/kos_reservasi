import {Text, StyleSheet} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {colors} from '../../../utils';
import Icon from './icon';

export default function Button({
  title,
  type,
  onPress,
  color,
  icon,
  size,
  width,
}) {
  if (type === 'icon') {
    return <Icon onPress={onPress} color={color} icon={icon} size={size} />;
  }
  return (
    <TouchableOpacity
      style={{
        backgroundColor: color,
        paddingVertical: 10,
        padding: 10,
        borderRadius: 10,
        width: width,
      }}
      onPress={onPress}>
      <Text style={styles.text(color)}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: color => ({
    color: color === colors.darkBlue ? colors.white : colors.black,
    textAlign: 'center',
    fontSize: 16,
  }),
});
