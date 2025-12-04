import React, { useState } from "react";
import { View, Modal, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

export default function SearchModal({ text, setModalVisible, modalVisible }) {
  return (
   <Modal
      visible={modalVisible}
      animationType="fade"
      transparent={true}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>You typed:</Text>
          <Text style={styles.modalText}>{text}</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}