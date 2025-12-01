import React, { useState } from "react";
import { View, Modal, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import styles from "../Styles";

export default function ItemModal({ text, visible, onClose }) {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>This Item is:</Text>
          <Text style={styles.modalText}>{text}</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
          >
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}