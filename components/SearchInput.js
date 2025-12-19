import React, { useState } from "react";
import { View, TextInput, StyleSheet, Modal, TouchableOpacity, Keyboard, Text } from "react-native";
import PropTypes from "prop-types";
import styles from "../Styles";

export default function SearchInput({ placeholder, value, onChange, onSubmit }) {


  return(
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder || "Search..."}
        value={value}
        onChangeText={onChange}
        returnKeyType="search"
        clearButtonMode="while-editing"
        onSubmitEditing={() => {
          if (typeof onSubmit === 'function') onSubmit();  // triggers search
        }}
      />
      
    </View>
  )
}

SearchInput.propTypes = {
  placeholder: PropTypes.string,
};
