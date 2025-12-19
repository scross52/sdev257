import React, { useState } from "react";
import { View, TextInput, StyleSheet, Modal, TouchableOpacity, Keyboard, Text } from "react-native";
import PropTypes from "prop-types";
import styles from "../Styles";

export default function SearchInput({ placeholder, search }) {

  const [query, setQuery] = useState("");

  const handleQuery = () => {
    search(query);
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
        onSubmitEditing={handleQuery}
      />
      
    </View>
  )
}

SearchInput.propTypes = {
  placeholder: PropTypes.string,
};
