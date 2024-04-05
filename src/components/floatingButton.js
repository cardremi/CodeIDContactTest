import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';

const FloatingButton = ({onPress, testID}) => {
  return (
    <View style={styles.container} testID={testID}>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  button: {
    backgroundColor: '#a7d131',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
});

export default FloatingButton;
