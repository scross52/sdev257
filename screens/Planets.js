import React from 'react';
import { Text, View, } from 'react-native';
import PlanetsList from '../components/PlanetsList';
import styles from '../Styles';


export default function Planets() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Planets Screen</Text>
      <PlanetsList />
    </View>
  );
}