import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import FilmList from '../components/FilmsList';
import SearchInput from '../components/SearchInput';
import LazyImage from '../components/LazyImage';
import styles from '../Styles';

export default function Films() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <SearchInput placeholder={'Search across site...'} />
        <LazyImage source={require('../assets/films.png')} />
        <Text style={styles.text}>Films Screen</Text>
        <FilmList />
      </View>
    </ScrollView>
  );
}