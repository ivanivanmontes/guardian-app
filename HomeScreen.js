import { View, StyleSheet, Text } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import React from 'react';
import MapViewStyle from "./utils/MapViewStyle.json";

const crimeData = [
  {
    id: 1,
    title: "Robbery",
    description: "Reported 20 mins ago",
    latitude: 40.732,
    longitude: -73.996,
  },
  {
    id: 2,
    title: "Assault",
    description: "Reported 1 hour ago",
    latitude: 40.730,
    longitude: -73.998,
  },
  {
    id: 3,
    title: "Burglary",
    description: "Reported yesterday",
    latitude: 40.731,
    longitude: -73.997,
  },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map} 
        provider={"google"}
        region={{
          latitude: 40.73131140946075, 
          longitude: -73.99706649883764,
          latitudeDelta: 0.002,
          longitudeDelta: 0.006,
        }}
        customMapStyle={MapViewStyle}
      >
        {crimeData.map((crime) => (
          <Marker
            key={crime.id}
            coordinate={{
              latitude: crime.latitude,
              longitude: crime.longitude,
            }}
            pinColor="red" // Crime markers in red
          >
            <Callout tooltip>
              <View style={styles.calloutStyle}>
                <Text style={styles.title}>{crime.title}</Text>
                <Text style={styles.description}>{crime.description}</Text>
              </View>
            </Callout>
          </Marker>
        ))}

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
  calloutStyle: {
    width: 160,
    padding: 10,
    backgroundColor: '#333', // Darker background
    borderRadius: 10,
    borderColor: 'red', // Border in red
    borderWidth: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white', // White text for contrast
  },
  description: {
    fontSize: 14,
    color: 'lightgray',
  },
});
