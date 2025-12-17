import React, {useState, useCallback } from 'react';
import { Text, View, ScrollView, RefreshControl } from 'react-native';
import PlanetsList from '../components/PlanetsList';
import SearchInput from '../components/SearchInput';
import LazyImage from '../components/LazyImage';
import { useNetwork } from '../components/NetworkContext';
import styles from '../Styles';


export default function Planets() {
  const [refreshing, setRefreshing] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const isConnected = useNetwork();

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
        <SearchInput placeholder={'Search across site...'} />
        <LazyImage source={require('../assets/planets.png')} />
        <Text style={styles.text}>Planets Screen</Text>
        <PlanetsList reloadKey={reloadKey} />
      </View> 
    </ScrollView>
  );
}