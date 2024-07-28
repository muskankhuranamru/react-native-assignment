import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Typography } from '../theme';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  text: {
    fontSize: 20,
    fontFamily:Typography.bold
  },
});

export default HomeScreen;
