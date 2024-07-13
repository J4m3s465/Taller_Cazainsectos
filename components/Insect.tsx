import React from 'react';
import { Image, StyleSheet } from 'react-native';

export default function Insect() {
  return <Image source={require('../assets/Insecto.png')} style={styles.insect} />;
}

const styles = StyleSheet.create({
  insect: {
    width: 50,
    height: 50,
  },
});
