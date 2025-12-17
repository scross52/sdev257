import React, {useState, useCallback, useEffect} from 'react';
import { Text, View, ScrollView, RefreshControl } from 'react-native';
import SearchInput from '../components/SearchInput';

import filmDetailsMapper from '../components/mappers/filmDetailsMapper';

import { useNetwork } from '../components/NetworkContext';
import styles from '../Styles';

const mappers = {
  film: filmDetailsMapper,
  ship: filmDetailsMapper,
  planet: filmDetailsMapper,
}

export default function Details({ route}) {
  const {type, url} = route.params;

  const [refreshing, setRefreshing] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [data, setData] = useState([]);
  
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
  
  const fetchItems = useCallback(async () => {
    
    try {
      const response = await fetch(url);
      
      const json = await response.json();
      console.log(json)
      
      const mapperfunction = mappers[type];
      
      console.log(mapperfunction)
      const mapped = mapperfunction(json);
      
      console.log("Mapped Variable", mapped)
      setData(mapped);
      console.log("data variable", data)
      
    } catch (err) {
      console.error("Fetch error:", err);
    }
    
  }, [url, mappers]);

  
  useEffect(() => {
      fetchItems();
    }, [reloadKey]);
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.container}>
        <SearchInput placeholder={'Search across site...'} />
        <Text style={styles.text}>{data.title}</Text>
        {data?.attributes?.map((attr, key) => (
          <View key={key}> 
            <Text>{attr.label}</Text>
            <Text>{attr.value}</Text>
          </View>
       ))}
        

      </View>
    </ScrollView>
  );
}