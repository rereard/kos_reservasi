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
import {useState} from 'react';
import DatePicker from 'react-native-date-picker';

const maxDate = new Date();
maxDate.setMonth(maxDate.getMonth() + 1);

function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

export default function Home({navigation}) {
  const [input, setInput] = useState('');
  const [inputCheckIn, setInputCheckIn] = useState();
  const [inputCheckOut, setInputCheckOut] = useState();
  const date = new Date();
  const [minimumDate, setMinimumDate] = useState(date);
  const [checkIn, setCheckIn] = useState('Check in');
  const [checkOut, setCheckOut] = useState('Check Out');
  const [openCheckIn, setOpenCheckIn] = useState(false);
  const [openCheckOut, setOpenCheckOut] = useState(false);

  const CheckOutButton = () => {
    if (!inputCheckIn == '') {
      setOpenCheckOut(true);
    } else {
      alert('Please input Check-in');
    }
  };

  console.log('minimum date ==>', minimumDate);
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
                  onPress={() => setOpenCheckIn(true)}
                  color={colors.yellow}
                  width={120}
                />
                <DatePicker
                  modal
                  open={openCheckIn}
                  minimumDate={date}
                  maximumDate={maxDate}
                  mode="date"
                  date={date}
                  onConfirm={date => {
                    setOpenCheckIn(false);
                    setCheckIn(date.toLocaleDateString('pt-PT'));
                    setInputCheckIn(formatDate(date));
                    setMinimumDate(date);
                  }}
                  onCancel={() => {
                    setOpenCheckIn(false);
                  }}
                />
              </View>
              <Text style={{fontSize: 20}}>-</Text>
              <View>
                <Button
                  title={checkOut}
                  onPress={CheckOutButton}
                  color={colors.yellow}
                  width={120}
                />
                <DatePicker
                  modal
                  open={openCheckOut}
                  minimumDate={minimumDate}
                  mode="date"
                  date={minimumDate}
                  onConfirm={date => {
                    setOpenCheckOut(false);
                    setCheckOut(date.toLocaleDateString('pt-PT'));
                    setInputCheckOut(formatDate(date));
                  }}
                  onCancel={() => {
                    setOpenCheckOut(false);
                  }}
                />
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
