import React from 'react';
import { Text, View, } from 'react-native';
import FilmList from '../components/FilmsList';
import styles from '../Styles';

export default function Films() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Films Screen</Text>
      <FilmList />
    </View>
  );
}