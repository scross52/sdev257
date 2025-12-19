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

   const [query, setQuery] = useState('');
  
    const [url, setUrl] = useState('https://www.swapi.tech/api/planets/');

  const isConnected = useNetwork();
  const navigation = useNavigation();

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    if (!isConnected){
      setRefreshing(false);
      return;
    }

    setReloadKey(k => k + 1);
    setUrl('https://www.swapi.tech/api/planets/')
    setQuery('')

    setRefreshing(false);
  }, []);

  return (
    <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.container}>

        <SearchInput placeholder={'Search planets...'} value={query} onChange={setQuery} onSubmit={() => {setUrl(`https://www.swapi.tech/api/planets/?name=${query}`); setReloadKey(k => k + 1);}} />

        <LazyImage source={require('../assets/planets.png')} />

        <Text style={styles.pageHeading}>Planets Screen</Text>
        <RemoteList
          url={url}
          reloadKey={reloadKey}
          mapResponse={(json) => {
            const list = json.results ?? json.result ?? [];
            return list.map((planet, i) => {
              const source = planet.properties ?? planet;
              return {
                id: planet.uid,
                value: source.name,
                url: source.url,
              }}
            )}
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