import React, {useState, useCallback} from 'react';
import { Text, View, ScrollView, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SearchInput from '../components/SearchInput';

import RemoteList from '../components/RemoteList';
import Swipeable from '../components/Swipeable';

import LazyImage from '../components/LazyImage';

import { useNetwork } from '../components/NetworkContext';
import styles from '../Styles';

export default function Films() {
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
  }, [isConnected]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.container}>

        <SearchInput placeholder={'Search films...'} />

        <LazyImage source={require('../assets/films.png')} />

        <Text style={styles.pageHeading}>Films Screen</Text>

        <RemoteList
          url={"https://www.swapi.tech/api/films/"}
          reloadKey={reloadKey}
          mapResponse={(json) => {
            return json.result.map((item, i) => ({
              id: item.properties.uid,
              value: item.properties.title,
              url: item.properties.url,
            }))}
          }
          renderItem={({ item }) => (
            <Swipeable
              key={item.id}
              text={item.value}
              onSwipe={() => {
                navigation.navigate('Details', {
                  type: 'film',
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