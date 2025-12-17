import React, {useEffect, useState, useCallback} from 'react';
import { FlatList, } from 'react-native';
import styles from '../Styles';


export default function RemoteList({ reloadKey = 0, url, mapResponse, renderItem, scrollEnabled = true}) {
  const [data, setData] = useState([]);

  if (typeof mapResponse !== 'function') {
    throw new Error('RemoteList requires a mapResponse function');
  }

  useEffect(() => {
    fetchItems();
  }, [reloadKey]);

  const fetchItems = useCallback(async () => {

    try {
      const response = await fetch(url);
      const json = await response.json();

      const mapped = await mapResponse(json);

      setData(mapped);

    } catch (err) {
      console.error("Fetch error:", err);
    }

  }, [url, mapResponse]);


  return (
    <>
    <FlatList
      data={data}
      renderItem={renderItem}
      scrollEnabled={scrollEnabled}
    />
    </>
  );
}