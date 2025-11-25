import React, { useState } from "react";
import { View, Modal, Text, } from "react-native";
import PropTypes from "prop-types";

export default function SearchModal({ text }) {
  return (
   <Modal>
    <Text>{ text }</Text>
  </Modal>
  )
}