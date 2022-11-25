import {View, Text} from 'react-native';
import React from 'react';
import {colors} from '../../../utils';
import Button from '../Button';

export default function RatingStar({totalRating}) {
  return (
    <View style={{flexDirection: 'row'}}>
      <Button type="icon" icon={'star'} color={colors.yellow} size={15} />
      <Button type="icon" icon={'star'} color={colors.yellow} size={15} />
      <Button type="icon" icon={'star'} color={colors.yellow} size={15} />
      <Button type="icon" icon={'star'} color={colors.yellow} size={15} />
      <Button type="icon" icon={'star'} color={colors.yellow} size={15} />
      <Text>{totalRating}</Text>
    </View>
  );
}
