import React, { useState } from "react";
import { View, TextInput, StyleSheet, Modal, TouchableOpacity, Keyboard, Text } from "react-native";
import PropTypes from "prop-types";
import styles from "../Styles";

export default function SearchInput({ placeholder }) {

  const [query, setQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleShowModal = () => {
    if (query.trim() !== "") {
    
    setTimeout(() => setModalVisible(true), 50);
  }
  };


  return(
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder || "Search..."}
        value={query}
        onChangeText={setQuery}
        returnKeyType="search"
        clearButtonMode="while-editing"
        onSubmitEditing={handleShowModal}
      />

      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>You typed:</Text>
            <Text style={styles.modalText}>{query}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

SearchInput.propTypes = {
  placeholder: PropTypes.string,
};
