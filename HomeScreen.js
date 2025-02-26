import { View, StyleSheet } from "react-native";
import MapView from "react-native-maps";
import React, { useRef } from 'react';
import MapViewStyle from "./utils/MapViewStyle.json";


export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map} 
        provider={"google"}
        region={{
          latitude: 40.73131140946075, 
          longitude: -73.99706649883764,
          latitudeDelta: 0.001,
          longitudeDelta: 0.006,
        }}
        customMapStyle={MapViewStyle}
      >
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  headerContainer: {
    position: "absolute",
    alignItems: "center",
    zIndex: 10,
    padding:10,
    width: "100%",
    paddingHorizontal:20,
    top:40
  },
  centerCoordinates: {
    position: 'absolute',
    top: 100,
    left: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    zIndex: 1000,
  },
  centerIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    zIndex: 999,
    transform: [{ translateX: -20 }, { translateY: -20 }], // Center the image
  },
  crosshairVertical: {
    position: 'absolute',
    top: 0,
    left: '50%',
    width: 2,
    height: '100%',
    backgroundColor: 'gray', // Line color
    zIndex: 1000,
    opacity: '0.5'
  },

  crosshairHorizontal: {
    position: 'absolute',
    top: '50%',
    left: 0,
    width: '100%',
    height: 2,
    backgroundColor: 'gray', // Line color
    zIndex: 1000,
    opacity: '0.5'
  },
  calloutStyle: {
    width: 160, // Set the width of the callout
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: 'grey',
    borderWidth: 0.5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16
  },
  description: {
    fontSize: 14
  }
});
