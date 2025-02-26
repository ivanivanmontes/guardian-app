import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useCoordinates } from "../CoordinateContext";

const ButtonComponent = () => {
    const { coordinates } = useCoordinates();
  const handleXClick = () => {
    console.log('X button clicked!');
    console.log(coordinates.latitude);
    console.log(coordinates.longitude);
  };

  const handleCheckClick = () => {
    console.log('Check button clicked!');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleXClick} style={styles.button}>
        <Text style={styles.buttonText}>X</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleCheckClick} style={[styles.button, styles.checkButton]}>
        <Text style={styles.buttonText}>✓</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: '80%',
    //   left: '30%',
      transform: [{ translateX: -20 }, { translateY: -20 }], // Center the component
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    //   flexDirection: 'row', // Arrange buttons horizontally

    },
    button: {
      backgroundColor: 'lightgray',
      borderRadius: 20,
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
      marginHorizontal: 90, // Adjust horizontal margin

    //   flexDirection: 'row', // Arrange buttons horizontally

    },
    checkButton: {
      backgroundColor: 'green', // Change color for the check mark button
    },
    buttonText: {
      fontSize: 20,
      fontWeight: 'bold',
    },
  });
  
  

export default ButtonComponent;
