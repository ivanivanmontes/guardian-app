import { View, Text, StyleSheet, Image } from "react-native";
import MapView, {Marker, Callout} from "react-native-maps";
import axios from 'axios';
import { SERVERURL } from "../config";
import React, { useState, useEffect, useRef } from 'react';
import MapViewStyle from "./../utils/MapViewStyle.json";
import Header from "../views/header";
import { useCoordinates } from "../CoordinateContext";


export default function HomeScreen() {
  const [selectedPinId, setSelectedPinId] = useState(null);
  const [pins, setPins] = useState([]);
  const [centerCoordinates, setCenterCoordinates] = useState(null);
  const mapViewRef = useRef(null);
  const { setCoords } = useCoordinates();
  const { coordinates } = useCoordinates();


  const onMarkerClick = (pin) => {
    console.log("Clicked Pin Info:", pin);
    setSelectedPinId(pin.pin_id);
    console.log("these are the coordinates I got from the context:", coordinates.latitude);
    console.log("almost forgot the longitude!:", coordinates.longitude);
    
  };

  const logCenterCoordinates = () => {
    if (mapViewRef.current) {
      mapViewRef.current.getCamera().then(camera => {
        const { center } = camera;

        if (center) {
          setCenterCoordinates(center); // Update the state with center coordinates
          setCoords(center) // the way to pass the coordinates across screens?
        }
      }).catch(error => {
        console.error('Error getting camera position:', error);
      });
    }
  };

  const retrievePins = () => {
      axios.get(`${SERVERURL}/getPins/0`)
          .then(response => {
              setPins(response.data);
          })
          .catch(error => {
              console.error("Error fetching pins:", error);
          });
  };

  useEffect(() => {
      retrievePins();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}><Header/></View>
      <MapView 
        ref={mapViewRef} // Assign the ref to the MapView
        style={styles.map} 
        onRegionChangeComplete={logCenterCoordinates} // is this line neccessary cause we do on touch move???
        onTouchMove={logCenterCoordinates}
        provider={"google"}
        region={{
          latitude: 43.781340440132006,
          longitude: 11.25431185076425,
          latitudeDelta: 0.001,
          longitudeDelta: 0.006,
        }}
        customMapStyle={MapViewStyle}
      >
        {pins.map((pin) => (
          <Marker
            key={pin.pin_id.toString()}
            coordinate={{
              latitude: pin.latitude,
              longitude: pin.longitude,
            }}
            onPress={() => onMarkerClick(pin)}
          >
            <Image 
              source={require("../assets/pinMarker.png")}
              style={{width: 60, height: 60, tintColor: selectedPinId === pin.pin_id ? "#C0C1EE" : "gray"}}
            />
            <Callout style={styles.calloutStyle}>
            <View>
              <Text>{pin.title}</Text>
              <Text>{pin.description}</Text>
            </View>
          </Callout>
          </Marker>
        ))}
      </MapView>
      {centerCoordinates && (
        <View style={styles.centerCoordinates}>
          <Text>Center Coordinates:</Text>
          <Text>Latitude: {centerCoordinates.latitude}</Text>
          <Text>Longitude: {centerCoordinates.longitude}</Text>
        </View>
      )}
      {/* Center indicator */}
      
        {/* <View style={styles.centerIndicator}>
          <Image 
            source={require("../assets/settingsExample.png")}
            style={{width: 40, height: 40}}
          />
        </View> */}
      {/* Vertical line (Down the middle) */}
      {/* <View style={styles.crosshairVertical}></View> */}

      {/* Horizontal line (Across the middle) */}
      {/* <View style={styles.crosshairHorizontal}></View> */}
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
