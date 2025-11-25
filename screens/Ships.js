import React from 'react';
import { Text, View, } from 'react-native';
import ShipsList from '../components/SpaceshipsList';
import SearchInput from '../components/SearchInput';
import styles from '../Styles';

export default function Spaceships() {
  return (
    <View style={styles.container}>
       <SearchInput placeholder={'Search across site...'} />
      <Text style={styles.text}>Spaceships Screen</Text>
      <ShipsList />
    </View>
  );
}