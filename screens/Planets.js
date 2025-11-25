import React from 'react';
import { Text, View, } from 'react-native';
import PlanetsList from '../components/PlanetsList';
import SearchInput from '../components/SearchInput';
import styles from '../Styles';


export default function Planets() {
  return (
    <View style={styles.container}>
      <SearchInput placeholder={'Search across site...'} />
      <Text style={styles.text}>Planets Screen</Text>
      <PlanetsList />
    </View>
  );
}