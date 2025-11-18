import React, {useEffect, useState} from 'react';
import { Text, FlatList, } from 'react-native';
import styles from '../Styles';


export default function Planets() {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);


  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {

    try {
      const response = await fetch("https://www.swapi.tech/api/films/");
      const json = await response.json();

      const mapped = json.result.map((film, i) => ({
        key: i.toString(),
        value: film.properties.title
      }));

      setData(mapped);

    } catch (err) {
      console.error("Fetch error:", err);
    }

  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchItems();
    setRefreshing(false);
  };

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <Text style={{ padding: 20 }}>{item.value}</Text>
      )}
      refreshing={refreshing}
      onrefresh={onRefresh}
    />
  );
}