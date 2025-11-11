import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import styles from "./Styles";

export default function Column({ children }) {
  return <View style={styles.column}>{children}</View>;
}

Column.propTypes = {
  children: PropTypes.node.isRequired,
};