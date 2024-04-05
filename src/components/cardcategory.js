/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

const CardCategory = ({data, onPress}) => {
  const [imageError, setImageError] = useState(false);
  const handleImageError = () => {
    setImageError(true);
  };
  const image = require('../../assets/tempAvatar.png');

  return (
    <TouchableOpacity activeOpacity={0.75} onPress={onPress}>
      <View style={[styles.wrapper]}>
        {imageError ? (
          <Image
            resizeMode="stretch"
            style={{
              width: 50,
              height: 50,
              borderRadius: 100,
              backgroundColor: 'white',
            }}
            source={image}
          />
        ) : (
          <Image
            resizeMode="stretch"
            style={{
              width: 50,
              height: 50,
              borderRadius: 100,
              backgroundColor: 'white',
            }}
            source={{uri: data?.photo}}
            onError={handleImageError}
          />
        )}
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{data?.firstName}</Text>
          <Text style={[styles.title, {paddingLeft: 8}]}>{data?.lastName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardCategory;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    margin: 6,
    padding: 8,
    width: '100%',
  },
  titleWrapper: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    paddingLeft: 12,
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'left',
  },
});
