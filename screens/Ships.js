import React from 'react';
import { Text, View, } from 'react-native';
import ShipsList from '../components/SpaceshipsList';
import styles from '../Styles';

export default function Spaceships() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Spaceships Screen</Text>
      <ShipsList />
    </View>
  );
}