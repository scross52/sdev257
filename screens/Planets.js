import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import PlanetsList from '../components/PlanetsList';
import SearchInput from '../components/SearchInput';
import LazyImage from '../components/LazyImage';
import styles from '../Styles';


export default function Planets() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <SearchInput placeholder={'Search across site...'} />
        <LazyImage source={require('../images/planets.png')} />
        <Text style={styles.text}>Planets Screen</Text>
        <PlanetsList />
      </View> 
    </ScrollView>
  );
}