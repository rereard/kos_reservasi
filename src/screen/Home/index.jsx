import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

import {colors} from '../../utils';
import {Button, Input} from '../../component/atoms';
import Header from '../../component/molecules/Header';
import {useState, useEffect} from 'react';
import DatePicker from 'react-native-date-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const maxDate = new Date();
maxDate.setMonth(maxDate.getMonth() + 1);

const formatDate = date => {
  const d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};

export default function Home({navigation}) {
  const [input, setInput] = useState('');
  const [inputCheckIn, setInputCheckIn] = useState(null);
  const [inputCheckOut, setInputCheckOut] = useState(null);
  const date = new Date();
  const [minimumDate, setMinimumDate] = useState(date);
  const [checkIn, setCheckIn] = useState('Check in');
  const [checkOut, setCheckOut] = useState('Check Out');
  const [openCheckin, setOpenCheckin] = useState(false);
  const [openCheckout, setOpenCheckout] = useState(false);

  const checkOutButton = () => {
    if (inputCheckIn) {
      setOpenCheckout(true);
    } else {
      alert('Please input Check-in');
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: colors.white, flex: 1}}>
      <ScrollView>
        <View style={styles.header}>
          <Header type="user" onPress={() => navigation.navigate('Sign')} />
          <Text style={styles.title}>
            Find deals on hotels, homes, and much more...
          </Text>
          <View style={styles.boxSearch}>
            <Input
              placeholder="Search place or lacation.."
              type="search"
              onChangeText={value => setInput(value)}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 10,
                alignItems: 'center',
              }}>
              <View>
                <Button
                  title={checkIn}
                  onPress={() => setOpenCheckin(true)}
                  color={colors.yellow}
                  width={120}
                />
                {openCheckin && (
                  <DateTimePicker
                    value={date}
                    mode={'date'}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    minimumDate={date}
                    maximumDate={maxDate}
                    onChange={(event, selectedDate) => {
                      if (event.type == 'set') {
                        setOpenCheckin(false);
                        setInputCheckIn(formatDate(selectedDate));
                        setCheckIn(selectedDate.toLocaleDateString('pt-PT'));
                        setMinimumDate(selectedDate);
                      } else {
                        setOpenCheckin(false);
                      }
                    }}
                  />
                )}
              </View>
              <Text style={{fontSize: 20, color: colors.black}}>-</Text>
              <View>
                <Button
                  title={checkOut}
                  onPress={checkOutButton}
                  color={colors.yellow}
                  width={120}
                />
                {openCheckout && (
                  <DateTimePicker
                    value={minimumDate}
                    mode={'date'}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    minimumDate={minimumDate}
                    onChange={(event, selectedDate) => {
                      if (event.type == 'set') {
                        setOpenCheckout(false);
                        setInputCheckOut(formatDate(selectedDate));
                        setCheckOut(selectedDate.toLocaleDateString('pt-PT'));
                      } else {
                        setOpenCheckout(false);
                      }
                    }}
                  />
                )}
              </View>
            </View>
            <Button title="Search" color={colors.darkBlue} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    color: colors.darkBlue,
    width: 300,
    marginTop: 30,
  },
  boxSearch: {
    backgroundColor: colors.grey,
    padding: 20,
    marginTop: 30,
    borderRadius: 20,
  },
});
