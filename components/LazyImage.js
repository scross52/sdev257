import React, { useState } from 'react';
import { View, Image, ActivityIndicator, StyleSheet } from 'react-native';

export default function LazyImage({
  source,
  style,
  resizeMode = 'cover',
  placeholderColor = '#e1e1e1'
}) {
  const [loading, setLoading] = useState(true);

  return (
    <View style={[style, styles.container]}>
      {loading && (
        <View style={[styles.placeholder, { backgroundColor: placeholderColor }]}>
          <ActivityIndicator size="small" color="#888" />
        </View>
      )}

      <Image
        source={source}
        style={[style, loading && { opacity: 0 }]}
        resizeMode={resizeMode}
        onLoad={() => setLoading(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  placeholder: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
