import React, {useState, useCallback} from 'react';
import { Text, View, ScrollView, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SearchInput from '../components/SearchInput';

import RemoteList from '../components/RemoteList';
import Swipeable from '../components/Swipeable';
import ItemModal from '../components/ItemModal';

import LazyImage from '../components/LazyImage';

import { useNetwork } from '../components/NetworkContext';
import styles from '../Styles';

export default function Films() {
  const [refreshing, setRefreshing] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  
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
        <SearchInput placeholder={'Search across site...'} />
        <LazyImage source={require('../assets/films.png')} />
        <Text style={styles.text}>Films Screen</Text>

        <RemoteList
          url={"https://www.swapi.tech/api/films/"}
          reloadKey={reloadKey}
          mapResponse={(json) => {
            return json.result.map((item, i) => ({
              id: i.toString(),
              value: item.properties.title,
              url: item.properties.url,
            }))}
          }
          renderItem={({ item }) => (
            <Swipeable
              key={item.id}
              text={item.value}
              onSwipe={() => {
                setSelectedItem(item);
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