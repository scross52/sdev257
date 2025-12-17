import React, {useState, useCallback, useEffect} from 'react';
import { Text, View, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import SearchInput from '../components/SearchInput';

import { EntityMappers } from '../components/mappers/EntityMappers';

import { useNetwork } from '../components/NetworkContext';
import styles from '../Styles';

async function fetchRelations(urls) {
  if (!urls || urls.length === 0) return [];

  const requests = urls.map(u => fetch(u).then(res => res.json()));
  const results = await Promise.all(requests);

  return results.map(r => r.result.properties.name || r.result.properties.title);
}



export default function Details({ route}) {
  const {type, url} = route.params;

  const [refreshing, setRefreshing] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [loading, setLoading] = useState(false);
  
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
    setLoading(true);
    try {
      const response = await fetch(url);
      
      const json = await response.json();
      
      const mapperfunction = EntityMappers[type];
      
      const mapped = mapperfunction(json);

      // Fetch relationships in parallel
      const relations = mapped.relations;
      const [planets, starships, vehicles, characters] = await Promise.all([
        fetchRelations(relations.planets),
        fetchRelations(relations.starships),
        fetchRelations(relations.vehicles),
        fetchRelations(relations.characters),
      ]);

      // Put them back into data
      setData({
        ...mapped,
        relations: { planets, starships, vehicles, characters }
      });
      
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
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
      {loading ? (
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

        {/* Display Entity Relationships */}
        {Object.entries(data?.relations ?? {}).map(([relationType, urls]) => (
            urls.length > 0 && (
              <View key={relationType}>
                <Text style={styles.sectionHeading}>
                  {relationType.toUpperCase()}
                </Text>

                {urls.map((url, index) => (
                  <Text key={index} style={styles.text}>{url}</Text>
                ))}
              </View>
            )
          ))}
        
        </View>
      </View>
      )}
    </ScrollView>
  );
}