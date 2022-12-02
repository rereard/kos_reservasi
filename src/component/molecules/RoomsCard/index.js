import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import {Button} from '../../atoms';
import {colors, formatIDR} from '../../../utils';

export default function RoomsCard({
  onPress,
  title,
  price,
  image,
  person,
  bed_type,
}) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <Image
          source={{
            uri: image[1] ? image[1]?.url_original : image[0]?.url_original,
          }}
          style={styles.image}
        />
        <View style={styles.content}>
          <View>
            <Text style={styles.title} numberOfLines={2}>
              {title}
            </Text>
            <View style={{flexDirection: 'row', marginTop: 5}}>
              <View style={{flexDirection: 'row'}}>
                <Button
                  type="icon"
                  color={colors.darkBlue}
                  icon={'person-outline'}
                  size={15}
                />
                <Text style={styles.Person}>{person} Person</Text>
              </View>
              {bed_type ? (
                <>
                  <Text style={{marginHorizontal: 10}}>|</Text>
                  <View style={{flexDirection: 'row'}}>
                    <Button
                      type="icon"
                      color={colors.darkBlue}
                      icon={'bed-outline'}
                      size={18}
                    />
                    <Text style={styles.Person}>{bed_type}</Text>
                  </View>
                </>
              ) : (
                <></>
              )}
            </View>
          </View>
          <View>
            <Text style={styles.price}>{formatIDR.format(price)}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 160,
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  container: {
    margin: 15,
    backgroundColor: colors.white,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  content: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: colors.black,
    fontSize: 15,
    fontWeight: 'bold',
    maxWidth: 180,
  },
  Person: {
    fontSize: 12,
    marginLeft: 5,
    color: colors.darkBlue,
  },
  banefit: {
    fontSize: 9,
    backgroundColor: colors.darkBlue,
    padding: 3,
    paddingHorizontal: 3,
    borderRadius: 3,
    color: colors.white,
    textAlign: 'center',
  },
  allInclusive: {
    fontSize: 12,
    color: colors.darkGrey,
    textDecorationLine: 'line-through',
  },
  price: {
    fontSize: 15,
    color: colors.darkBlue,
    fontWeight: '800',
  },
});
