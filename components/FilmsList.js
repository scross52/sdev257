import React, {useEffect, useState} from 'react';
import { Text, FlatList, } from 'react-native';
import Swipeable from './Swipable';
import ItemModal from './ItemModal';
import styles from '../Styles';
import { View } from 'react-native-web';


export default function Planets() {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);


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
  
  const onSwipe = ({value}) => {
    setSelectedItem(value);
    setModalVisible(true);
  };

  return (
    <>
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <Swipeable key={item.id} onSwipe={() => onSwipe(item)} text={item.value} />
      )}
      refreshing={refreshing}
      onrefresh={onRefresh}
    />
    <ItemModal text={selectedItem} visible={modalVisible} onClose={() => {setModalVisible(false)}} />
    </>
  );
}