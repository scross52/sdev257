import React, {useEffect, useState, useCallback} from 'react';
import { FlatList, } from 'react-native';


export default function RemoteList({ reloadKey = 0, url, mapResponse, renderItem, scrollEnabled = true}) {
  const [data, setData] = useState([]);

  if (typeof mapResponse !== 'function') {
    throw new Error('RemoteList requires a mapResponse function');
  }

  useEffect(() => {
    setData([]);
    fetchItems();
  }, [reloadKey]);

  const fetchItems = useCallback(async () => {

    try {
      
      let nextUrl = url;
      while (nextUrl) {
      const response = await fetch(nextUrl);
      const json = await response.json();

      const mapped = await mapResponse(json);

      setData(prev => [...prev, ...mapped]);

       nextUrl = json.next;
      }

    } catch (err) {
      console.error("Fetch error:", err);
    }

  }, [url, mapResponse]);


  return (
    <>
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      scrollEnabled={scrollEnabled}
    />
    </>
  );
}