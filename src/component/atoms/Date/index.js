import {View, Text} from 'react-native';
import React from 'react';
import Button from '../Button';
import DatePicker from 'react-native-date-picker';
import {useState, use} from 'react';
import {colors} from '../../../utils';

const maxDate = new Date();
maxDate.setMonth(maxDate.getMonth() + 1);

export default function InputDate({title, width}) {
  const [date, setDate] = useState(new Date());
  const [newDate, setNewDate] = useState();
  const [open, setOpen] = useState(false);

  return (
    <View>
      <Button
        title={newDate ? newDate : title}
        onPress={() => setOpen(true)}
        color={colors.yellow}
        width={width}
      />
      <DatePicker
        modal
        open={open}
        minimumDate={date}
        maximumDate={maxDate}
        mode="date"
        date={date}
        onConfirm={date => {
          setOpen(false);
          setNewDate(date.toLocaleDateString());
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </View>
  );
}
