import { View, StyleSheet, Text } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import React from 'react';
import MapViewStyle from "./utils/MapViewStyle.json";

const crimeData = [
  {
    id: 1,
    title: "Robbery",
    description: "Reported 20 mins ago",
    time: "2023-06-15 14:30",
    emoji: "🔫",
    details: "Armed robbery at convenience store. Suspect fled on foot.",
    latitude: 40.732,
    longitude: -73.996,
  },
  {
    id: 2,
    title: "Assault",
    description: "Reported 1 hour ago",
    time: "2023-06-15 13:45",
    emoji: "👊",
    details: "Physical altercation between two individuals. One person injured.",
    latitude: 40.730,
    longitude: -73.998,
  },
  {
    id: 3,
    title: "Burglary",
    description: "Reported yesterday",
    time: "2023-06-14 23:15",
    emoji: "🏠",
    details: "Forced entry through back window. Electronics and jewelry stolen.",
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
                <View style={styles.calloutHeader}>
                  <Text style={styles.emoji}>{crime.emoji}</Text>
                  <Text style={styles.title}>{crime.title}</Text>
                </View>
                <View style={styles.divider} />
                <Text style={styles.description}>{crime.description}</Text>
                <Text style={styles.time}>Time: {crime.time}</Text>
                <Text style={styles.details}>{crime.details}</Text>
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
    width: 220,
    padding: 12,
    backgroundColor: 'rgba(40, 40, 40, 0.95)',
    borderRadius: 12,
    borderColor: '#ff4d4d',
    borderWidth: 1.5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  calloutHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  emoji: {
    fontSize: 20,
    marginRight: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#ff4d4d',
  },
  divider: {
    height: 1,
    backgroundColor: '#555',
    marginVertical: 6,
  },
  description: {
    fontSize: 14,
    color: '#e0e0e0',
    marginBottom: 4,
  },
  time: {
    fontSize: 13,
    color: '#b0b0b0',
    marginBottom: 4,
    fontStyle: 'italic',
  },
  details: {
    fontSize: 13,
    color: '#d0d0d0',
    lineHeight: 18,
  },
});
