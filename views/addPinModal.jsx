import React, { useState } from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';

const CustomModal = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="slide" // You can change the animation type as needed
      transparent={true}
      visible={visible}
      onRequestClose={onClose} // Function to call when the modal is closed (e.g., by pressing the back button on Android)
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text>This is the modal content!</Text>
          <Button title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end', // Align modal content to the bottom
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background

    },
    modalContent: {
      backgroundColor: 'white',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      marginLeft: 10,
      padding: 20,
      width: '95%', // Take up full width of the screen
      minHeight: '90%', // Take up 70% of the screen height
      height:"95%"
    },
  });
  

export default CustomModal;
