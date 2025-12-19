import React, {useState, useCallback } from 'react';
import { Text, View, ScrollView, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';


import SearchInput from '../components/SearchInput';
import LazyImage from '../components/LazyImage';

import RemoteList from '../components/RemoteList';
import Swipeable from '../components/Swipeable';

import { useNetwork } from '../components/NetworkContext';
import styles from '../Styles';


export default function Planets() {
  const [refreshing, setRefreshing] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  const isConnected = useNetwork();
  const navigation = useNavigation();

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    if (!isConnected){
      setRefreshing(false);
      return;
    }

    setReloadKey(k => k + 1);
    setRefreshing(false);
  }, []);

  return (
    <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.container}>
        <SearchInput placeholder={'Search planets...'} />
        <LazyImage source={require('../assets/planets.png')} />
        <Text style={styles.pageHeading}>Planets Screen</Text>
        <RemoteList
          url={"https://www.swapi.tech/api/planets/"}
          reloadKey={reloadKey}
          mapResponse={(json) => {
            return json.results.map((planet, i) => ({
              id: planet.uid,
              value: planet.name,
              url: planet.url,
            }))}
          }
          renderItem={({ item }) => (
            <Swipeable
              text={item.value}
              onSwipe={() => {
                navigation.navigate('Details', {
                  type: 'planet',
                  url: item.url,
                });
              }}
            />
          )}
          scrollEnabled={false}
        />
      </View> 
    </ScrollView>
  );
}