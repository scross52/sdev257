import React, { useState } from "react";
import { View, TextInput, StyleSheet, Modal, TouchableOpacity, Keyboard, Text } from "react-native";
import PropTypes from "prop-types";

export default function SearchInput({ placeholder }) {

  const [query, setQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleShowModal = () => {
    if (query.trim() !== "") {
    
    setTimeout(() => setModalVisible(true), 50);
  }
  };


  return(
    <View style={styles.container}>
      <TextInput
        style={styles.input}
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


const styles = StyleSheet.create({ 
  container: {
    padding: 10,
  },
  input: {
    padding: 10,
    marginBottom: 20,
    width: 250,
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 60,
  },
  modalBackground: {
    backgroundColor: "#00000053",
    width: "100%",
    height: "100%",
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#d9d9d9ff",
    padding: 20,
    borderRadius: 15,
    borderColor: "#000000",
    borderWidth: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    width: 250,

  },
  modalText: {
    fontSize: 24
  },
  closeButton: {
    marginTop: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#0586ff',
    borderRadius: 15,
  },
  closeText: {
    fontSize: 20,
    color: '#ffffff',
  },
})