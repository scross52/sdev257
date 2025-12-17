import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

export default function SwipeableRow({ text, onOpen }) {
  const renderRightActions = () => (
    <View style={{ justifyContent: 'center' }}>
      <TouchableOpacity
        onPress={onOpen}
        style={{
          backgroundColor: '#1e90ff',
          justifyContent: 'center',
          paddingHorizontal: 20,
          height: '100%',
        }}
      >
        <Text style={{ color: '#fff' }}>Open</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      onSwipeableRightOpen={onOpen}
    >
      <View style={{ padding: 16 }}>
        <Text>{text}</Text>
      </View>
    </Swipeable>
  );
}
