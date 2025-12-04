import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import ShipsList from '../components/SpaceshipsList';
import SearchInput from '../components/SearchInput';
import LazyImage from '../components/LazyImage';
import styles from '../Styles';

export default function Spaceships() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <SearchInput placeholder={'Search across site...'} />
        <LazyImage source={require('../assets/starships.png')} />
        <Text style={styles.text}>Spaceships Screen</Text>
        <ShipsList />
      </View>
    </ScrollView>
  );
}