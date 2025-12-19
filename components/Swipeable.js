import React, { useRef } from "react";
import { View, ScrollView, Text, TouchableOpacity } from
  "react-native";
import styles from "../Styles";
export default function Swipeable({ onSwipe, text }) {
  
  const scrollRef = useRef();
  const swipeHandled = useRef(false);
  
  function handleScrollEnd(e) {
    const x = e.nativeEvent.contentOffset.x;
    const THRESHOLD = 200 * 0.75;

    if (x >= THRESHOLD) {

      if (!swipeHandled.current) {   // <--- only trigger once
        swipeHandled.current = true;
        onSwipe();

        // Reset after a short delay so next swipe can trigger
        setTimeout(() => { swipeHandled.current = false }, 1000);
      }

      // Reset ScrollView position manually
      scrollRef.current?.scrollTo({ x: 0, y: 0, animated: false });
    } else {
      // Partial swipe — snap back
      scrollRef.current?.scrollTo({ x: 0, animated: true });
    }
  }
  
  const scrollProps = {
    horizontal: true,
    pagingEnabled: true,
    showsHorizontalScrollIndicator: false,
    onMomentumScrollEnd: handleScrollEnd,
    scrollEventThrottle: 10,
    ref: scrollRef,
  };

  return (
  <View style={styles.swipeContainer}>
    <ScrollView {...scrollProps}>
     <TouchableOpacity>
      <View style={styles.swipeItem}>
       <Text
        style={styles.swipeItemText}>{text}</Text>
      </View>
     </TouchableOpacity>
     <View style={styles.swipeBlank} />
    </ScrollView>
   </View>
  );
}
