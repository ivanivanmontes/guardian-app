import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, Platform } from 'react-native';
import MapView, { Marker, Callout, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapViewStyle from "./utils/MapViewStyle.json";

// Dark mode map style
const darkMapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#181818"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1b1b1b"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#2c2c2c"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8a8a8a"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#373737"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3c3c3c"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#4e4e4e"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3d3d3d"
      }
    ]
  }
];

// Light mode map style - standard Google Maps style
const lightMapStyle = [];

// Traffic enhancements for both light and dark modes
const trafficEnhancements = [
  // Make roads more prominent
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      { "weight": 3 },
      { "visibility": "simplified" }
    ]
  },
  // Enhance arterial roads
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      { "weight": 2.5 },
      { "visibility": "simplified" }
    ]
  },
  // Enhance highways
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      { "weight": 3 },
      { "visibility": "simplified" }
    ]
  }
];

// mock crime data
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
  {
    id: 4,
    title: "Grand Theft Auto",
    description: "Reported 3 hours ago",
    time: "2023-06-15 11:20",
    emoji: "🚗",
    details: "Vehicle stolen from parking lot. Black SUV, license plate ABC123.",
    latitude: 40.712,
    longitude: -73.957, // Williamsburg, Brooklyn
  },
  {
    id: 5,
    title: "Vandalism",
    description: "Reported 2 hours ago",
    time: "2023-06-15 12:45",
    emoji: "🎨",
    details: "Graffiti and property damage to storefront. Security footage available.",
    latitude: 40.678,
    longitude: -73.944, // Prospect Heights, Brooklyn
  },
  {
    id: 6,
    title: "Theft",
    description: "Reported 45 mins ago",
    time: "2023-06-15 14:00",
    emoji: "💼",
    details: "Pickpocketing incident on subway platform. Wallet and phone stolen.",
    latitude: 40.750,
    longitude: -73.993, // Midtown Manhattan
  },
  {
    id: 7,
    title: "Drug Activity",
    description: "Reported 4 hours ago",
    time: "2023-06-15 10:15",
    emoji: "💊",
    details: "Suspicious activity observed in park area. Multiple individuals involved.",
    latitude: 40.689,
    longitude: -73.982, // DUMBO, Brooklyn
  },
  {
    id: 8,
    title: "Harassment",
    description: "Reported 30 mins ago",
    time: "2023-06-15 14:15",
    emoji: "🗣️",
    details: "Verbal harassment of store employee. Suspect left scene.",
    latitude: 40.783,
    longitude: -73.971, // Upper East Side
  },
  {
    id: 9,
    title: "Breaking & Entering",
    description: "Reported 5 hours ago",
    time: "2023-06-15 09:30",
    emoji: "🔨",
    details: "Attempted break-in at residential building. No entry gained.",
    latitude: 40.671,
    longitude: -73.977, // Park Slope, Brooklyn
  },
  {
    id: 10,
    title: "Public Disturbance",
    description: "Reported 15 mins ago",
    time: "2023-06-15 14:30",
    emoji: "📢",
    details: "Large group causing disturbance outside nightclub. Police responding.",
    latitude: 40.742,
    longitude: -74.006, // Chelsea
  },
];

// mock traffic data
const trafficData = [
  {
    id: 1,
    severity: "high", // high, medium, low
    coordinates: [
      { latitude: 40.733, longitude: -73.997 },
      { latitude: 40.735, longitude: -73.995 },
    ],
  },
  {
    id: 2,
    severity: "medium",
    coordinates: [
      { latitude: 40.730, longitude: -73.999 },
      { latitude: 40.728, longitude: -74.001 },
    ],
  },
  {
    id: 3,
    severity: "low",
    coordinates: [
      { latitude: 40.729, longitude: -73.995 },
      { latitude: 40.727, longitude: -73.993 },
    ],
  },
];

// mock reports data
const reportsData = [
  {
    id: 1,
    title: "Suspicious Activity",
    location: "Central Park",
    time: "2023-06-15 16:45",
    description: "Group of individuals acting suspiciously near the fountain.",
    reportedBy: "Anonymous",
  },
  {
    id: 2,
    title: "Broken Street Light",
    location: "5th Avenue & 23rd St",
    time: "2023-06-14 22:30",
    description: "Street light has been out for 3 days, creating a safety hazard.",
    reportedBy: "John D.",
  },
  {
    id: 3,
    title: "Graffiti",
    location: "Broadway & Houston",
    time: "2023-06-13 09:15",
    description: "New graffiti on the side of the building.",
    reportedBy: "Local Business Owner",
  },
];

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState('crime');
  const [showSettings, setShowSettings] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showTraffic, setShowTraffic] = useState(false);
  const [mapRef, setMapRef] = useState(null);

  // Effect to toggle traffic when tab changes
  useEffect(() => {
    // Show traffic layer when traffic tab is active
    setShowTraffic(activeTab === 'traffic');
  }, [activeTab]);

  // Effect to update map when dark mode changes
  useEffect(() => {
    if (mapRef) {
      // Force map to refresh when dark mode changes
      const currentRegion = mapRef.__lastRegion || mapRef.props.region;
      setTimeout(() => {
        mapRef.animateToRegion({
          ...currentRegion,
          latitudeDelta: currentRegion.latitudeDelta * 0.99, // Tiny change to force refresh
        }, 100);
        
        // Return to original position
        setTimeout(() => {
          mapRef.animateToRegion(currentRegion, 100);
        }, 200);
      }, 100);
    }
  }, [darkMode, mapRef]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Get theme-based styles
  const getThemeStyles = () => {
    return {
      // Background colors
      backgroundColor: darkMode ? '#121212' : '#f5f5f5',
      cardBackground: darkMode ? '#1e1e1e' : 'white',
      
      // Text colors
      primaryText: darkMode ? '#ffffff' : '#000000',
      secondaryText: darkMode ? '#b0b0b0' : '#555555',
      tertiaryText: darkMode ? '#808080' : '#777777',
      
      // UI elements
      dividerColor: darkMode ? '#333333' : '#dddddd',
      accentColor: '#FFC107', // Keep accent color consistent
      
      // Callout styles
      calloutBackground: darkMode ? 'rgba(30, 30, 30, 0.95)' : 'rgba(255, 255, 255, 0.95)',
      calloutBorder: darkMode ? '#444444' : '#dddddd',
      calloutTitle: darkMode ? '#ff4d4d' : '#ff4d4d', // Keep consistent
    };
  };

  // Custom map style for traffic layer with dark mode support
  const getMapStyle = () => {
    // Base style based on dark mode
    const baseStyle = darkMode ? darkMapStyle : lightMapStyle;
    
    // Add traffic-specific styling if in traffic tab
    if (activeTab === 'traffic') {
      return [
        ...baseStyle,
        ...trafficEnhancements
      ];
    }
    
    return baseStyle;
  };

  // Get current theme styles
  const theme = getThemeStyles();

  // Render map content based on active tab
  const renderMapContent = () => {
    switch (activeTab) {
      case 'crime':
        return (
          <>
            {crimeData.map((crime) => (
              <Marker
                key={crime.id}
                coordinate={{
                  latitude: crime.latitude,
                  longitude: crime.longitude,
                }}
                pinColor="red"
              >
                <Callout tooltip>
                  <View style={[styles.calloutStyle, { backgroundColor: theme.calloutBackground, borderColor: theme.calloutBorder }]}>
                    <View style={styles.calloutHeader}>
                      <Text style={styles.emoji}>{crime.emoji}</Text>
                      <Text style={[styles.title, { color: theme.calloutTitle }]}>{crime.title}</Text>
                    </View>
                    <View style={[styles.divider, { backgroundColor: theme.dividerColor }]} />
                    <Text style={[styles.description, { color: theme.primaryText }]}>{crime.description}</Text>
                    <Text style={[styles.time, { color: theme.secondaryText }]}>Time: {crime.time}</Text>
                    <Text style={[styles.details, { color: theme.primaryText }]}>{crime.details}</Text>
                  </View>
                </Callout>
              </Marker>
            ))}
          </>
        );
      case 'traffic':
        // We don't need to return anything here as we're using the built-in traffic layer
        return null;
      default:
        return null;
    }
  };

  // Render reports screen
  const renderReports = () => {
    return (
      <SafeAreaView style={[styles.reportsContainer, { backgroundColor: theme.backgroundColor }]}>
        <View style={[styles.reportsHeader, { backgroundColor: darkMode ? '#222' : '#000' }]}>
          <Text style={styles.reportsTitle}>Community Reports</Text>
        </View>
        <ScrollView style={styles.reportsList}>
          {reportsData.map((report) => (
            <View key={report.id} style={[styles.reportCard, { backgroundColor: theme.cardBackground }]}>
              <Text style={[styles.reportTitle, { color: theme.primaryText }]}>{report.title}</Text>
              <Text style={[styles.reportLocation, { color: theme.secondaryText }]}>
                <Ionicons name="location" size={16} color={theme.secondaryText} /> {report.location}
              </Text>
              <Text style={[styles.reportTime, { color: theme.secondaryText }]}>
                <Ionicons name="time" size={16} color={theme.secondaryText} /> {report.time}
              </Text>
              <Text style={[styles.reportDescription, { color: theme.primaryText }]}>{report.description}</Text>
              <Text style={[styles.reportedBy, { color: theme.tertiaryText }]}>Reported by: {report.reportedBy}</Text>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  };

  // Render settings panel
  const renderSettings = () => {
    return (
      <View style={[styles.settingsPanel, { backgroundColor: darkMode ? '#222' : '#333' }]}>
        <View style={[styles.settingsHeader, { borderBottomColor: darkMode ? '#444' : '#555' }]}>
          <Text style={styles.settingsTitle}>Settings</Text>
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => setShowSettings(false)}
          >
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>
        </View>
        
        <View style={[styles.settingItem, { borderBottomColor: darkMode ? '#444' : '#555' }]}>
          <Text style={styles.settingLabel}>Dark Mode</Text>
          <Switch
            value={darkMode}
            onValueChange={toggleDarkMode}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={darkMode ? "#f5dd4b" : "#f4f3f4"}
          />
        </View>
        
        <TouchableOpacity style={[styles.settingButton, { borderBottomColor: darkMode ? '#444' : '#555' }]}>
          <Ionicons name="person-circle-outline" size={20} color="white" />
          <Text style={styles.settingButtonText}>Sign In / Register</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.settingButton, { borderBottomColor: darkMode ? '#444' : '#555' }]}>
          <Ionicons name="notifications-outline" size={20} color="white" />
          <Text style={styles.settingButtonText}>Notification Preferences</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.settingButton, { borderBottomColor: darkMode ? '#444' : '#555' }]}>
          <Ionicons name="map-outline" size={20} color="white" />
          <Text style={styles.settingButtonText}>Map Preferences</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.settingButton, { borderBottomColor: darkMode ? '#444' : '#555' }]}>
          <Ionicons name="information-circle-outline" size={20} color="white" />
          <Text style={styles.settingButtonText}>About</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      {activeTab !== 'reports' ? (
        <MapView 
          ref={ref => setMapRef(ref)}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          region={{
            latitude: 40.73131140946075, 
            longitude: -73.99706649883764,
            latitudeDelta: 0.002,
            longitudeDelta: 0.006,
          }}
          customMapStyle={getMapStyle()}
          showsTraffic={showTraffic}
          trafficEnabled={showTraffic}
        >
          {renderMapContent()}
        </MapView>
      ) : (
        renderReports()
      )}

      {/* Traffic Info Panel - shows when traffic tab is active */}
      {activeTab === 'traffic' && (
        <View style={[styles.trafficInfoPanel, { 
          backgroundColor: darkMode ? 'rgba(30, 30, 30, 0.85)' : 'rgba(255, 255, 255, 0.85)',
          borderColor: darkMode ? '#555' : '#ddd'
        }]}>
          <View style={styles.trafficLegend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#FF0000' }]} />
              <Text style={[styles.legendText, { color: darkMode ? 'white' : 'black' }]}>Heavy</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#FFA500' }]} />
              <Text style={[styles.legendText, { color: darkMode ? 'white' : 'black' }]}>Moderate</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#FFFF00' }]} />
              <Text style={[styles.legendText, { color: darkMode ? 'white' : 'black' }]}>Light</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#00FF00' }]} />
              <Text style={[styles.legendText, { color: darkMode ? 'white' : 'black' }]}>Flowing</Text>
            </View>
          </View>
        </View>
      )}

      {showSettings && renderSettings()}

      {/* Bottom Menu Bar */}
      <View style={[styles.bottomMenu, { 
        backgroundColor: darkMode ? '#222' : '#000',
        borderTopColor: darkMode ? '#444' : '#333'
      }]}>
        <TouchableOpacity 
          style={[
            styles.menuItem, 
            activeTab === 'crime' && [
              styles.activeMenuItem, 
              { backgroundColor: darkMode ? '#333' : '#222' }
            ]
          ]}
          onPress={() => {
            setActiveTab('crime');
            setShowSettings(false);
          }}
        >
          <Ionicons 
            name="warning" 
            size={24} 
            color={activeTab === 'crime' ? "#FFC107" : "white"} 
          />
          <Text style={styles.menuText}>Crime Map</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.menuItem, 
            activeTab === 'traffic' && [
              styles.activeMenuItem, 
              { backgroundColor: darkMode ? '#333' : '#222' }
            ]
          ]}
          onPress={() => {
            setActiveTab('traffic');
            setShowSettings(false);
          }}
        >
          <MaterialIcons 
            name="traffic" 
            size={24} 
            color={activeTab === 'traffic' ? "#FFC107" : "white"} 
          />
          <Text style={styles.menuText}>Traffic</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.menuItem, 
            activeTab === 'reports' && [
              styles.activeMenuItem, 
              { backgroundColor: darkMode ? '#333' : '#222' }
            ]
          ]}
          onPress={() => {
            setActiveTab('reports');
            setShowSettings(false);
          }}
        >
          <FontAwesome5 
            name="clipboard-list" 
            size={24} 
            color={activeTab === 'reports' ? "#FFC107" : "white"} 
          />
          <Text style={styles.menuText}>Reports</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.menuItem, 
            showSettings && [
              styles.activeMenuItem, 
              { backgroundColor: darkMode ? '#333' : '#222' }
            ]
          ]}
          onPress={() => setShowSettings(!showSettings)}
        >
          <Ionicons 
            name="settings" 
            size={24} 
            color={showSettings ? "#FFC107" : "white"} 
          />
          <Text style={styles.menuText}>Settings</Text>
        </TouchableOpacity>
      </View>
      
      <StatusBar style={darkMode ? "light" : "dark"} />
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
  // Bottom Menu Styles
  bottomMenu: {
    flexDirection: 'row',
    backgroundColor: '#000',
    height: 70,
    paddingBottom: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  menuItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 8,
  },
  activeMenuItem: {
    borderTopWidth: 3,
    borderTopColor: '#FFC107',
    backgroundColor: '#222',
  },
  menuText: {
    color: 'white',
    fontSize: 12,
    marginTop: 4,
  },
  // Reports Screen Styles
  reportsContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  reportsHeader: {
    backgroundColor: '#000',
    padding: 16,
    alignItems: 'center',
  },
  reportsTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  reportsList: {
    flex: 1,
    padding: 16,
  },
  reportCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  reportLocation: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  reportTime: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  reportDescription: {
    fontSize: 16,
    marginBottom: 8,
    lineHeight: 22,
  },
  reportedBy: {
    fontSize: 14,
    color: '#777',
    fontStyle: 'italic',
  },
  // Settings Panel Styles
  settingsPanel: {
    position: 'absolute',
    bottom: 70, // Above the bottom menu
    left: 0,
    right: 0,
    backgroundColor: '#222',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  settingsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  settingsTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 5,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  settingLabel: {
    color: 'white',
    fontSize: 16,
  },
  settingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  settingButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
  // Traffic Info Panel Styles
  trafficInfoPanel: {
    position: 'absolute',
    top: 40,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    borderRadius: 8,
    padding: 8,
    width: 120,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#444',
  },
  trafficLegend: {
    marginVertical: 4,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  legendColor: {
    width: 20,
    height: 8,
    marginRight: 8,
    borderRadius: 2,
  },
  legendText: {
    color: 'white',
    fontSize: 12,
  },
});
