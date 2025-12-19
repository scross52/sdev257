import React, {useState, useCallback, useEffect} from 'react';
import { Text, View, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import SearchInput from '../components/SearchInput';

import { EntityMappers } from '../components/mappers/EntityMappers';

import { useNetwork } from '../components/NetworkContext';
import styles from '../Styles';

async function fetchRelations(urls) {
  if (!urls || urls.length === 0) return [];

  const requests = urls.map(async (u) => {
    if (!u || typeof u !== 'string') {
      return null;
    }

    try {
      const res = await fetch(u);

      if (!res.ok) {
        console.warn(`Fetch failed (${res.status}):`)
        return null;
      } 

      const json = await res.json();
      
      return (
        json?.result?.properties?.name ??
        json?.result?.properties?.title ??
        null
      );

    } catch (err) {
      console.warn('Relation fetch failed:', u, err);
      return null;
    }

  });

  const results = await Promise.all(requests);

  return results.filter(Boolean);
}



export default function Details({ route }) {
  const {type, url} = route.params;

  const [refreshing, setRefreshing] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  const [loadingEntity, setLoadingEntity] = useState(false);
  const [loadingRelations, setLoadingRelations] = useState({
    planets: false,
    starships: false,
    vehicles: false,
    characters: false
  });
  
  const [data, setData] = useState({});
  
  const isConnected = useNetwork();

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    if (!isConnected){
      setRefreshing(false);
      return;
    }

    setReloadKey(k => k + 1);
    setRefreshing(false);
  }, [isConnected]);
  
  const fetchItems = useCallback(async () => {
    setLoadingEntity(true);
    try {
      const response = await fetch(url);
      
      const json = await response.json();
      
      const mapperfunction = EntityMappers[type];
      
      const mapped = mapperfunction(json);
      
      setData({
        ...mapped,
        relations: {
          planets: [],
          starships: [],
          vehicles: [],
          characters: [],
          ...mapped.relations
        }
      });

      Object.entries(mapped.relations ?? {}).forEach(([relationType, urls]) => {
        setLoadingRelations(prev => ({
          ...prev,
          [relationType]: true
        }));

        fetchRelations(urls).then(result => {
          setData(prev => ({
            ...prev,
            relations: {
              ...prev.relations,
              [relationType]: result
            }
          }));
          setLoadingRelations(prev => ({
          ...prev,
          [relationType]: false
        }));
        });
      });
      
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoadingEntity(false);
    }
    
  }, [url, type]);

  
  useEffect(() => {
      fetchItems();
    }, [reloadKey]);
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {loadingEntity ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.pageHeading}>{data.title}</Text>

          <View style={styles.section}>

            {data?.attributes?.map((attr, key) => (
              <View key={key}> 
                <Text style={styles.sectionHeading}>{attr.label}</Text>
                <Text style={styles.text}>{attr.value}</Text>
              </View>
            ))}

            {Object.entries(data?.relations ?? {}).map(([relationType, urls]) => (
                urls.length > 0 && (
                  <View key={relationType}>
                    <Text style={styles.sectionHeading}>
                      {relationType.toUpperCase()}
                    </Text>

                    {loadingRelations[relationType] ? (
                      <ActivityIndicator size="large" color="#0000ff" />
                    ) : (
                      urls.map((url, index) => (
                        <Text key={index} style={styles.text}>{url}</Text>
                      ))
                    )}
                  </View>
                )
            ))}
          
          </View>
        </View>
      )}
    </ScrollView>
  );
}