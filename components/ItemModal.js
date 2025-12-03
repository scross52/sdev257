import React, { useState } from "react";
import { View, Modal, Text, TouchableOpacity } from "react-native";
import Animated, { FadeIn, FadeOut, SlideInUp, SlideOutDown} from "react-native-reanimated";
import PropTypes from "prop-types";
import styles from "../Styles";

export default function ItemModal({ text, visible, onClose }) {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
    >
      <Animated.View 
        style={styles.modalBackground}
        entering={FadeIn}
        exiting={FadeOut}
      >
        <Animated.View 
          style={styles.modalContent}
          entering={SlideInUp.duration(250)}
          exiting={SlideOutDown.duration(250)}
        >

          <Text style={styles.modalText}>This Item is:</Text>
          <Text style={styles.modalText}>{text}</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
          >
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>

        </Animated.View>

      </Animated.View>
    </Modal>
  )
}