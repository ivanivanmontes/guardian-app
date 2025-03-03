import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, Platform, Animated } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import {crimeData, trafficData, reportsData } from "./mockData";

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

  // Made roads look more visible on the map
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      { "weight": 3 },
      { "visibility": "simplified" }
    ]
  },

  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      { "weight": 2.5 },
      { "visibility": "simplified" }
    ]
  },
  // Made highways look more visible on the map
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      { "weight": 3 },
      { "visibility": "simplified" }
    ]
  }
];



export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState('crime');
  const [showSettings, setShowSettings] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showTraffic, setShowTraffic] = useState(false);
  const [mapRef, setMapRef] = useState(null);
  const [showAbout, setShowAbout] = useState(false);
  const [showMapPreferences, setShowMapPreferences] = useState(false);
  const [mapType, setMapType] = useState('standard');
  const [showNotificationPreferences, setShowNotificationPreferences] = useState(false);
  const [notificationRadius, setNotificationRadius] = useState(5);
  const [showSignIn, setShowSignIn] = useState(false); // State for sign in modal
  
  // Animation values
  const toggleAnimation = useRef(new Animated.Value(0)).current;
  const aboutModalAnimation = useRef(new Animated.Value(0)).current;
  const mapPreferencesAnimation = useRef(new Animated.Value(0)).current;
  const notificationPreferencesAnimation = useRef(new Animated.Value(0)).current;
  const signInModalAnimation = useRef(new Animated.Value(0)).current;

  const getTimeElapsed = (timeString) => {
    // Parse the time string into a Date object
    const incidentTime = new Date(timeString);
    const now = new Date();
    
    // Calculate time difference in milliseconds
    const timeDiff = now - incidentTime;
    
    // Convert to minutes
    const minutesElapsed = Math.floor(timeDiff / (1000 * 60));
    
    if (minutesElapsed < 60) {
      // For time indicator, return short form
      return `${minutesElapsed}m`;
    } else if (minutesElapsed < 24 * 60) {
      // For hours, return short form
      return `${Math.floor(minutesElapsed / 60)}h`;
    } else {
      // For days, return short form
      return `${Math.floor(minutesElapsed / (60 * 24))}d`;
    }
  };

  // Add a new function for more detailed time descriptions
  const getDetailedTimeElapsed = (timeString) => {
    // Parse the time string into a Date object
    const incidentTime = new Date(timeString);
    const now = new Date();
    
    // Calculate time difference in milliseconds
    const timeDiff = now - incidentTime;
    
    // Convert to minutes
    const minutesElapsed = Math.floor(timeDiff / (1000 * 60));
    const hoursElapsed = Math.floor(minutesElapsed / 60);
    const daysElapsed = Math.floor(hoursElapsed / 24);
    
    if (minutesElapsed < 60) {
      return `${minutesElapsed} minute${minutesElapsed !== 1 ? 's' : ''}`;
    } else if (hoursElapsed < 24) {
      return `${hoursElapsed} hour${hoursElapsed !== 1 ? 's' : ''}`;
    } else {
      return `${daysElapsed} day${daysElapsed !== 1 ? 's' : ''}`;
    }
  };

  const getTimeIndicatorColor = (timeString) => {
    const incidentTime = new Date(timeString);
    const now = new Date();
    const timeDiff = now - incidentTime;
    const minutesElapsed = Math.floor(timeDiff / (1000 * 60));
    
    if (minutesElapsed < 60) {
      return '#ff4d4d'; // Red for very recent (< 1 hour)
    } else if (minutesElapsed < 180) {
      return '#ff9800'; // Orange for somewhat recent (1-3 hours)
    } else if (minutesElapsed < 24 * 60) {
      return '#ffc107'; // Amber for today (4-24 hours)
    } else {
      return '#8d8d8d'; // Gray for older incidents (> 24 hours)
    }
  };

  // Effect to toggle traffic when tab changes
  useEffect(() => {
    // Shows traffic layer when traffic tab is active
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

  // Effect to animate toggle when dark mode changes
  useEffect(() => {
    Animated.spring(toggleAnimation, {
      toValue: darkMode ? 1 : 0,
      useNativeDriver: false,
      friction: 6,
      tension: 40,
    }).start();
  }, [darkMode, toggleAnimation]);

  // Effect to animate about modal
  useEffect(() => {
    if (showAbout) {
      Animated.spring(aboutModalAnimation, {
        toValue: 1,
        useNativeDriver: true,
        friction: 8,
        tension: 40,
        velocity: 3
      }).start();
    } else {
      Animated.timing(aboutModalAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      }).start();
    }
  }, [showAbout]);

  // Effect to animate map preferences modal
  useEffect(() => {
    if (showMapPreferences) {
      Animated.spring(mapPreferencesAnimation, {
        toValue: 1,
        useNativeDriver: true,
        friction: 8,
        tension: 40,
        velocity: 3
      }).start();
    } else {
      Animated.timing(mapPreferencesAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      }).start();
    }
  }, [showMapPreferences]);

  // Effect to animate notification preferences modal
  useEffect(() => {
    if (showNotificationPreferences) {
      Animated.spring(notificationPreferencesAnimation, {
        toValue: 1,
        useNativeDriver: true,
        friction: 8,
        tension: 40,
        velocity: 3
      }).start();
    } else {
      Animated.timing(notificationPreferencesAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      }).start();
    }
  }, [showNotificationPreferences]);

  // Effect to animate sign in modal
  useEffect(() => {
    if (showSignIn) {
      Animated.spring(signInModalAnimation, {
        toValue: 1,
        useNativeDriver: true,
        friction: 8,
        tension: 40,
        velocity: 3
      }).start();
    } else {
      Animated.timing(signInModalAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      }).start();
    }
  }, [showSignIn]);

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
        {crimeData.map((crime, index) => {
          // Calculate description based on time string
          const timeDescription = `Reported ${getDetailedTimeElapsed(crime.time)} ago`;
          
          return (
            <Marker
              key={crime.id}
              coordinate={{
                latitude: crime.latitude,
                longitude: crime.longitude,
              }}
              tracksViewChanges={false}
              onPress={() => handleMarkerPress(crime)}
            >
              <TouchableOpacity 
                onPress={() => handleMarkerPress(crime)}
                style={styles.markerContainer}
              >
                <View style={[styles.emojiMarker, { backgroundColor: darkMode ? 'rgba(30, 30, 30, 0.85)' : 'rgba(255, 255, 255, 0.85)' }]}>
                  <Text style={styles.emojiText}>{crime.emoji}</Text>
                  {getTimeIndicator(crime.time)}
                </View>
              </TouchableOpacity>
              
              <Callout tooltip>
                <View style={[styles.calloutStyle, { backgroundColor: theme.calloutBackground, borderColor: theme.calloutBorder }]}>
                  <View style={styles.calloutHeader}>
                    <Text style={styles.emoji}>{crime.emoji}</Text>
                    <Text style={[styles.title, { color: theme.calloutTitle }]}>{crime.title}</Text>
                  </View>
                  <View style={[styles.divider, { backgroundColor: theme.dividerColor }]} />
                  <Text style={[styles.description, { color: theme.primaryText }]}>{timeDescription}</Text>
                  <Text style={[styles.time, { color: theme.secondaryText }]}>Time: {crime.time}</Text>
                  <Text style={[styles.details, { color: theme.primaryText }]}>{crime.details}</Text>
                </View>
              </Callout>
            </Marker>
          );
        })}
          </>
        );
      case 'traffic':
        return null;
      default:
        return null;
    }
  };

  // Render reports screen
  const renderReports = () => {
    return (
      <View style={{flex: 1, backgroundColor: darkMode ? '#222' : '#fff'}}>
        <SafeAreaView style={[styles.reportsContainer, { 
          backgroundColor: darkMode ? '#222' : '#fff',
          flex: 1
        }]}>
          <View style={[styles.reportsHeader, { backgroundColor: darkMode ? '#222' : '#fff' }]}>
            <Text style={[styles.reportsTitle, { color: darkMode ? '#fff' : '#000' }]}>Community Reports</Text>
            <TouchableOpacity 
              style={styles.addReportButton}
              onPress={() => alert('Add Report feature will be implemented in the next update!')}
            >
              <Ionicons name="add-circle" size={24} color="#FFC107" />
              <Text style={styles.addReportText}>Add Report</Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
            style={styles.reportsList}
            contentContainerStyle={styles.reportsListContent}
          >
            {reportsData.map((report) => {
              // Calculate time description based on time string
              const timeDescription = `Reported ${getDetailedTimeElapsed(report.time)} ago`;
              
              return (
                <View key={report.id} style={[styles.reportCard, { backgroundColor: theme.cardBackground }]}>
                  <Text style={[styles.reportTitle, { color: theme.primaryText }]}>{report.title}</Text>
                  <Text style={[styles.reportLocation, { color: theme.secondaryText }]}>
                    <Ionicons name="location" size={16} color={theme.secondaryText} /> {report.location}
                  </Text>
                  <Text style={[styles.reportTime, { color: theme.secondaryText }]}>
                    <Ionicons name="time" size={16} color={theme.secondaryText} /> {timeDescription}
                  </Text>
                  <Text style={[styles.reportDescription, { color: theme.primaryText }]}>{report.description}</Text>
                  <Text style={[styles.reportedBy, { color: theme.tertiaryText }]}>Reported by: {report.reportedBy}</Text>
                </View>
              );
            })}
            {/* Extra padding at the bottom */}
            <View style={styles.reportsBottomPadding} />
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  };

  // Render settings panel
  const renderSettings = () => {
    const toggleTranslateX = toggleAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 22]
    });
    
    const toggleBackgroundColor = toggleAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ['#f9d71c', '#1a1a2e']
    });
    
    const circleBackgroundColor = toggleAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ['white', '#444']
    });

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
          <TouchableOpacity 
            style={[styles.themeToggle]}
            activeOpacity={0.8}
            onPress={toggleDarkMode}
          >
            <Animated.View style={[
              styles.themeToggle, 
              { backgroundColor: toggleBackgroundColor }
            ]}>
              <Animated.View style={[
                styles.themeToggleCircle, 
                { 
                  backgroundColor: circleBackgroundColor,
                  transform: [{ translateX: toggleTranslateX }] 
                }
              ]}>
                {darkMode ? (
                  <Ionicons name="moon" size={16} color="#f9d71c" />
                ) : (
                  <Ionicons name="sunny" size={16} color="#f9d71c" />
                )}
              </Animated.View>
            </Animated.View>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={[styles.settingButton, { borderBottomColor: darkMode ? '#444' : '#555' }]}
          onPress={() => setShowSignIn(true)}
        >
          <Ionicons name="person-circle-outline" size={20} color="white" />
          <Text style={styles.settingButtonText}>Sign In / Register</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.settingButton, { borderBottomColor: darkMode ? '#444' : '#555' }]}
          onPress={() => setShowNotificationPreferences(true)}
        >
          <Ionicons name="notifications-outline" size={20} color="white" />
          <Text style={styles.settingButtonText}>Notification Preferences</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.settingButton, { borderBottomColor: darkMode ? '#444' : '#555' }]}
          onPress={() => setShowMapPreferences(true)}
        >
          <Ionicons name="map-outline" size={20} color="white" />
          <Text style={styles.settingButtonText}>Map Preferences</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.settingButton, { borderBottomColor: darkMode ? '#444' : '#555' }]}
          onPress={() => setShowAbout(true)}
        >
          <Ionicons name="information-circle-outline" size={20} color="white" />
          <Text style={styles.settingButtonText}>About</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Render about modal
  const renderAboutModal = () => {
    const modalScale = aboutModalAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0.8, 1]
    });
    
    const modalOpacity = aboutModalAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    });

    return (
      <Animated.View 
        style={[
          styles.modalOverlay,
          { opacity: aboutModalAnimation }
        ]}
        pointerEvents={showAbout ? 'auto' : 'none'}
      >
        <Animated.View 
          style={[
            styles.aboutModal, 
            { 
              backgroundColor: darkMode ? '#222' : '#fff',
              transform: [{ scale: modalScale }],
              opacity: modalOpacity
            }
          ]}
        >
          <View style={styles.aboutHeader}>
            <Text style={[styles.aboutTitle, { color: darkMode ? '#fff' : '#000' }]}>About</Text>
            <TouchableOpacity onPress={() => setShowAbout(false)}>
              <Ionicons name="close" size={24} color={darkMode ? '#fff' : '#000'} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.aboutContent}>
            <Ionicons name="shield-checkmark" size={60} color="#FFC107" style={styles.aboutIcon} />
            
            <Text style={[styles.aboutAppName, { color: darkMode ? '#fff' : '#000' }]}>
              Guardian iOS App
            </Text>
            
            <Text style={[styles.aboutVersion, { color: darkMode ? '#bbb' : '#555' }]}>
              Version 0.4 (20620.2.25.11)
            </Text>
            
            <Text style={[styles.aboutCopyright, { color: darkMode ? '#aaa' : '#666' }]}>
              Copyright © 2025 Guardian Inc.
            </Text>
            
            <Text style={[styles.aboutRights, { color: darkMode ? '#aaa' : '#666' }]}>
              All rights reserved.
            </Text>
          </View>
        </Animated.View>
      </Animated.View>
    );
  };

  // Render map preferences modal
  const renderMapPreferencesModal = () => {
    const modalScale = mapPreferencesAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0.8, 1]
    });
    
    const modalOpacity = mapPreferencesAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    });

    return (
      <Animated.View 
        style={[
          styles.modalOverlay,
          { opacity: mapPreferencesAnimation }
        ]}
        pointerEvents={showMapPreferences ? 'auto' : 'none'}
      >
        <Animated.View 
          style={[
            styles.aboutModal, 
            { 
              backgroundColor: darkMode ? '#222' : '#fff',
              transform: [{ scale: modalScale }],
              opacity: modalOpacity
            }
          ]}
        >
          <View style={styles.aboutHeader}>
            <Text style={[styles.aboutTitle, { color: darkMode ? '#fff' : '#000' }]}>Map Preferences</Text>
            <TouchableOpacity onPress={() => setShowMapPreferences(false)}>
              <Ionicons name="close" size={24} color={darkMode ? '#fff' : '#000'} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.mapPreferencesContent}>
            <Text style={[styles.mapPreferencesTitle, { color: darkMode ? '#fff' : '#000' }]}>
              Map Type
            </Text>
            
            <TouchableOpacity 
              style={[
                styles.mapTypeOption, 
                mapType === 'standard' && styles.mapTypeSelected,
                { borderColor: darkMode ? '#444' : '#ddd' }
              ]}
              onPress={() => {
                setMapType('standard');
                setShowMapPreferences(false);
              }}
            >
              <Ionicons 
                name="map-outline" 
                size={24} 
                color={mapType === 'standard' ? '#FFC107' : (darkMode ? '#fff' : '#000')} 
              />
              <View style={styles.mapTypeTextContainer}>
                <Text style={[
                  styles.mapTypeText, 
                  { color: darkMode ? '#fff' : '#000' }
                ]}>
                  Standard
                </Text>
                <Text style={[
                  styles.mapTypeDescription, 
                  { color: darkMode ? '#aaa' : '#666' }
                ]}>
                  Default map view with streets and landmarks
                </Text>
              </View>
              {mapType === 'standard' && (
                <Ionicons name="checkmark-circle" size={24} color="#FFC107" />
              )}
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.mapTypeOption, 
                mapType === 'satellite' && styles.mapTypeSelected,
                { borderColor: darkMode ? '#444' : '#ddd' }
              ]}
              onPress={() => {
                setMapType('satellite');
                setShowMapPreferences(false);
              }}
            >
              <Ionicons 
                name="earth" 
                size={24} 
                color={mapType === 'satellite' ? '#FFC107' : (darkMode ? '#fff' : '#000')} 
              />
              <View style={styles.mapTypeTextContainer}>
                <Text style={[
                  styles.mapTypeText, 
                  { color: darkMode ? '#fff' : '#000' }
                ]}>
                  Satellite
                </Text>
                <Text style={[
                  styles.mapTypeDescription, 
                  { color: darkMode ? '#aaa' : '#666' }
                ]}>
                  Satellite imagery of the area
                </Text>
              </View>
              {mapType === 'satellite' && (
                <Ionicons name="checkmark-circle" size={24} color="#FFC107" />
              )}
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.mapTypeOption, 
                mapType === 'hybrid' && styles.mapTypeSelected,
                { borderColor: darkMode ? '#444' : '#ddd' }
              ]}
              onPress={() => {
                setMapType('hybrid');
                setShowMapPreferences(false);
              }}
            >
              <Ionicons 
                name="globe-outline" 
                size={24} 
                color={mapType === 'hybrid' ? '#FFC107' : (darkMode ? '#fff' : '#000')} 
              />
              <View style={styles.mapTypeTextContainer}>
                <Text style={[
                  styles.mapTypeText, 
                  { color: darkMode ? '#fff' : '#000' }
                ]}>
                  Hybrid
                </Text>
                <Text style={[
                  styles.mapTypeDescription, 
                  { color: darkMode ? '#aaa' : '#666' }
                ]}>
                  Satellite imagery with street names
                </Text>
              </View>
              {mapType === 'hybrid' && (
                <Ionicons name="checkmark-circle" size={24} color="#FFC107" />
              )}
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.mapTypeOption, 
                mapType === 'terrain' && styles.mapTypeSelected,
                { borderColor: darkMode ? '#444' : '#ddd' }
              ]}
              onPress={() => {
                setMapType('terrain');
                setShowMapPreferences(false);
              }}
            >
              <Ionicons 
                name="trail-sign-outline" 
                size={24} 
                color={mapType === 'terrain' ? '#FFC107' : (darkMode ? '#fff' : '#000')} 
              />
              <View style={styles.mapTypeTextContainer}>
                <Text style={[
                  styles.mapTypeText, 
                  { color: darkMode ? '#fff' : '#000' }
                ]}>
                  Terrain
                </Text>
                <Text style={[
                  styles.mapTypeDescription, 
                  { color: darkMode ? '#aaa' : '#666' }
                ]}>
                  Topographic details with roads and labels
                </Text>
              </View>
              {mapType === 'terrain' && (
                <Ionicons name="checkmark-circle" size={24} color="#FFC107" />
              )}
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animated.View>
    );
  };

  // Render notification preferences modal
  const renderNotificationPreferencesModal = () => {
    const modalScale = notificationPreferencesAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0.8, 1]
    });
    
    const modalOpacity = notificationPreferencesAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    });

    return (
      <Animated.View 
        style={[
          styles.modalOverlay,
          { opacity: notificationPreferencesAnimation }
        ]}
        pointerEvents={showNotificationPreferences ? 'auto' : 'none'}
      >
        <Animated.View 
          style={[
            styles.aboutModal, 
            { 
              backgroundColor: darkMode ? '#222' : '#fff',
              transform: [{ scale: modalScale }],
              opacity: modalOpacity
            }
          ]}
        >
          <View style={styles.aboutHeader}>
            <Text style={[styles.aboutTitle, { color: darkMode ? '#fff' : '#000' }]}>Notification Preferences</Text>
            <TouchableOpacity onPress={() => setShowNotificationPreferences(false)}>
              <Ionicons name="close" size={24} color={darkMode ? '#fff' : '#000'} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.notificationPreferencesContent}>
            <Text style={[styles.notificationPreferencesTitle, { color: darkMode ? '#fff' : '#000' }]}>
              Alert Radius
            </Text>
            <Text style={[styles.notificationPreferencesDescription, { color: darkMode ? '#aaa' : '#666' }]}>
              Receive alerts for incidents within:
            </Text>
            
            <TouchableOpacity 
              style={[
                styles.radiusOption, 
                notificationRadius === 5 && styles.radiusOptionSelected,
                { borderColor: darkMode ? '#444' : '#ddd' }
              ]}
              onPress={() => setNotificationRadius(5)}
            >
              <View style={styles.radiusIconContainer}>
                <Ionicons 
                  name="notifications" 
                  size={24} 
                  color={notificationRadius === 5 ? '#FFC107' : (darkMode ? '#fff' : '#000')} 
                />
                <View style={[
                  styles.radiusCircle, 
                  { borderColor: notificationRadius === 5 ? '#FFC107' : (darkMode ? '#555' : '#ccc') }
                ]}>
                  <View style={styles.radiusInnerCircle} />
                </View>
              </View>
              <View style={styles.radiusTextContainer}>
                <Text style={[
                  styles.radiusText, 
                  { color: darkMode ? '#fff' : '#000' }
                ]}>
                  Within 5 miles
                </Text>
                <Text style={[
                  styles.radiusDescription, 
                  { color: darkMode ? '#aaa' : '#666' }
                ]}>
                  Immediate neighborhood alerts
                </Text>
              </View>
              {notificationRadius === 5 && (
                <Ionicons name="checkmark-circle" size={24} color="#FFC107" />
              )}
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.radiusOption, 
                notificationRadius === 10 && styles.radiusOptionSelected,
                { borderColor: darkMode ? '#444' : '#ddd' }
              ]}
              onPress={() => setNotificationRadius(10)}
            >
              <View style={styles.radiusIconContainer}>
                <Ionicons 
                  name="notifications" 
                  size={24} 
                  color={notificationRadius === 10 ? '#FFC107' : (darkMode ? '#fff' : '#000')} 
                />
                <View style={[
                  styles.radiusCircle, 
                  styles.radiusMedium,
                  { borderColor: notificationRadius === 10 ? '#FFC107' : (darkMode ? '#555' : '#ccc') }
                ]}>
                  <View style={styles.radiusInnerCircle} />
                </View>
              </View>
              <View style={styles.radiusTextContainer}>
                <Text style={[
                  styles.radiusText, 
                  { color: darkMode ? '#fff' : '#000' }
                ]}>
                  Within 10 miles
                </Text>
                <Text style={[
                  styles.radiusDescription, 
                  { color: darkMode ? '#aaa' : '#666' }
                ]}>
                  Local area coverage
                </Text>
              </View>
              {notificationRadius === 10 && (
                <Ionicons name="checkmark-circle" size={24} color="#FFC107" />
              )}
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.radiusOption, 
                notificationRadius === 15 && styles.radiusOptionSelected,
                { borderColor: darkMode ? '#444' : '#ddd' }
              ]}
              onPress={() => setNotificationRadius(15)}
            >
              <View style={styles.radiusIconContainer}>
                <Ionicons 
                  name="notifications" 
                  size={24} 
                  color={notificationRadius === 15 ? '#FFC107' : (darkMode ? '#fff' : '#000')} 
                />
                <View style={[
                  styles.radiusCircle, 
                  styles.radiusLarge,
                  { borderColor: notificationRadius === 15 ? '#FFC107' : (darkMode ? '#555' : '#ccc') }
                ]}>
                  <View style={styles.radiusInnerCircle} />
                </View>
              </View>
              <View style={styles.radiusTextContainer}>
                <Text style={[
                  styles.radiusText, 
                  { color: darkMode ? '#fff' : '#000' }
                ]}>
                  Within 15 miles
                </Text>
                <Text style={[
                  styles.radiusDescription, 
                  { color: darkMode ? '#aaa' : '#666' }
                ]}>
                  Broader regional coverage
                </Text>
              </View>
              {notificationRadius === 15 && (
                <Ionicons name="checkmark-circle" size={24} color="#FFC107" />
              )}
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.radiusOption, 
                notificationRadius === 20 && styles.radiusOptionSelected,
                { borderColor: darkMode ? '#444' : '#ddd' }
              ]}
              onPress={() => setNotificationRadius(20)}
            >
              <View style={styles.radiusIconContainer}>
                <Ionicons 
                  name="notifications" 
                  size={24} 
                  color={notificationRadius === 20 ? '#FFC107' : (darkMode ? '#fff' : '#000')} 
                />
                <View style={[
                  styles.radiusCircle, 
                  styles.radiusExtraLarge,
                  { borderColor: notificationRadius === 20 ? '#FFC107' : (darkMode ? '#555' : '#ccc') }
                ]}>
                  <View style={styles.radiusInnerCircle} />
                </View>
              </View>
              <View style={styles.radiusTextContainer}>
                <Text style={[
                  styles.radiusText, 
                  { color: darkMode ? '#fff' : '#000' }
                ]}>
                  Within 20 miles
                </Text>
                <Text style={[
                  styles.radiusDescription, 
                  { color: darkMode ? '#aaa' : '#666' }
                ]}>
                  Metropolitan area coverage
                </Text>
              </View>
              {notificationRadius === 20 && (
                <Ionicons name="checkmark-circle" size={24} color="#FFC107" />
              )}
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.saveButton,
                { backgroundColor: darkMode ? '#333' : '#f0f0f0' }
              ]}
              onPress={() => setShowNotificationPreferences(false)}
            >
              <Text style={[
                styles.saveButtonText,
                { color: darkMode ? '#fff' : '#000' }
              ]}>
                Save Preferences
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animated.View>
    );
  };

  // Render sign in modal
  const renderSignInModal = () => {
    const modalScale = signInModalAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0.8, 1]
    });
    
    const modalOpacity = signInModalAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    });

    return (
      <Animated.View 
        style={[
          styles.modalOverlay,
          { opacity: signInModalAnimation }
        ]}
        pointerEvents={showSignIn ? 'auto' : 'none'}
      >
        <Animated.View 
          style={[
            styles.aboutModal, 
            { 
              backgroundColor: darkMode ? '#222' : '#fff',
              transform: [{ scale: modalScale }],
              opacity: modalOpacity
            }
          ]}
        >
          <View style={styles.aboutHeader}>
            <Text style={[styles.aboutTitle, { color: darkMode ? '#fff' : '#000' }]}>Sign In / Register</Text>
            <TouchableOpacity onPress={() => setShowSignIn(false)}>
              <Ionicons name="close" size={24} color={darkMode ? '#fff' : '#000'} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.signInContent}>
            <Ionicons name="person-circle" size={60} color="#FFC107" style={styles.aboutIcon} />
            
            <View style={styles.inputContainer}>
              <Text style={[styles.inputLabel, { color: darkMode ? '#fff' : '#000' }]}>Email</Text>
              <View style={[styles.inputField, { backgroundColor: darkMode ? '#333' : '#f5f5f5', borderColor: darkMode ? '#444' : '#ddd' }]}>
                <Ionicons name="mail-outline" size={20} color={darkMode ? '#aaa' : '#666'} />
                <Text style={[styles.placeholderText, { color: darkMode ? '#aaa' : '#999' }]}>Enter your email</Text>
              </View>
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={[styles.inputLabel, { color: darkMode ? '#fff' : '#000' }]}>Password</Text>
              <View style={[styles.inputField, { backgroundColor: darkMode ? '#333' : '#f5f5f5', borderColor: darkMode ? '#444' : '#ddd' }]}>
                <Ionicons name="lock-closed-outline" size={20} color={darkMode ? '#aaa' : '#666'} />
                <Text style={[styles.placeholderText, { color: darkMode ? '#aaa' : '#999' }]}>Enter your password</Text>
              </View>
            </View>
            
            <TouchableOpacity 
              style={styles.signInButton}
              onPress={() => {
                alert('Sign in functionality will be implemented in the next update!');
                setShowSignIn(false);
              }}
            >
              <Text style={styles.signInButtonText}>Sign In</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.registerButton}
              onPress={() => {
                alert('Registration functionality will be implemented in the next update!');
                setShowSignIn(false);
              }}
            >
              <Text style={styles.registerButtonText}>Register</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.forgotPasswordButton}
              onPress={() => {
                alert('Password recovery will be implemented in the next update!');
              }}
            >
              <Text style={[styles.forgotPasswordText, { color: darkMode ? '#aaa' : '#666' }]}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animated.View>
    );
  };

  const getTimeIndicator = (time) => {
    const timeIndicatorColor = getTimeIndicatorColor(time);
    return (
      <View style={[
        styles.timeIndicator,
        { backgroundColor: timeIndicatorColor }
      ]}>
        <Text style={styles.timeIndicatorText}>
          {getTimeElapsed(time)}
        </Text>
      </View>
    );
  };

  const handleMarkerPress = (crime) => {
    console.log('Marker pressed:', crime.title);
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
          mapType={mapType}
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
            <Text style={[styles.legendUpdateText, { color: darkMode ? '#aaa' : '#666' }]}>
              *Real-time traffic data
            </Text>
          </View>
        </View>
      )}

      {showSettings && renderSettings()}
      {renderAboutModal()}
      {renderMapPreferencesModal()}
      {renderNotificationPreferencesModal()}
      {renderSignInModal()}

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
      
      <StatusBar style={activeTab === 'reports' ? (darkMode ? "light" : "dark") : (darkMode ? "light" : "dark")} backgroundColor={activeTab === 'reports' ? (darkMode ? '#222' : '#fff') : 'transparent'} />
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
    backgroundColor: '#000', // Changed to black
  },
  reportsHeader: {
    backgroundColor: '#000',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 50 : 16, // Increased top padding for iOS status bar
  },
  reportsTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  reportsList: {
    flex: 1,
  },
  reportsListContent: {
    padding: 16,
    paddingBottom: 30, // Extra padding at the bottom
  },
  reportsBottomPadding: {
    height: 50, // Extra space at the bottom of the list
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
    borderWidth: 0.5,
    borderColor: '#e0e0e0',
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
  legendUpdateText: {
    fontSize: 9,
    marginTop: 2,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  // Emoji Marker Styles
  emojiMarker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ff4d4d',
    overflow: 'visible', // Allow children to overflow outside the container
    zIndex: 1,
  },
  // Add a new style for the touchable area
  markerTouchableArea: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'transparent',
    top: -10,
    left: -10,
    zIndex: 0,
  },
  emojiText: {
    fontSize: 18,
  },
  // Theme Toggle Styles
  themeToggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    padding: 2,
    justifyContent: 'center',
  },
  themeToggleCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  // About Modal Styles
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  aboutModal: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  aboutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  aboutTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  aboutContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  aboutIcon: {
    marginBottom: 20,
  },
  aboutAppName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  aboutVersion: {
    fontSize: 16,
    marginBottom: 20,
  },
  aboutCopyright: {
    fontSize: 14,
    marginBottom: 5,
  },
  aboutRights: {
    fontSize: 14,
  },
  // Map Preferences Styles
  mapPreferencesContent: {
    paddingVertical: 10,
  },
  mapPreferencesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  mapTypeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
  },
  mapTypeSelected: {
    borderColor: '#FFC107',
    borderWidth: 2,
  },
  mapTypeTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  mapTypeText: {
    fontSize: 16,
    fontWeight: '500',
  },
  mapTypeDescription: {
    fontSize: 12,
    marginTop: 2,
  },
  // Notification Preferences Styles
  notificationPreferencesContent: {
    paddingVertical: 10,
  },
  notificationPreferencesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  notificationPreferencesDescription: {
    fontSize: 14,
    marginBottom: 15,
  },
  radiusOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
  },
  radiusOptionSelected: {
    borderColor: '#FFC107',
    borderWidth: 2,
  },
  radiusIconContainer: {
    position: 'relative',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radiusCircle: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'dashed',
  },
  radiusMedium: {
    width: 26,
    height: 26,
    borderRadius: 13,
  },
  radiusLarge: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  radiusExtraLarge: {
    width: 38,
    height: 38,
    borderRadius: 19,
  },
  radiusInnerCircle: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FFC107',
    top: '50%',
    left: '50%',
    marginLeft: -2,
    marginTop: -2,
  },
  radiusTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  radiusText: {
    fontSize: 16,
    fontWeight: '500',
  },
  radiusDescription: {
    fontSize: 12,
    marginTop: 2,
  },
  saveButton: {
    marginTop: 10,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  addReportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 193, 7, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFC107',
    marginRight: 5, // Added margin to avoid iPhone status elements
  },
  addReportText: {
    color: '#FFC107',
    marginLeft: 4,
    fontWeight: '600',
  },
  signInContent: {
    alignItems: 'center',
    paddingVertical: 20,
    width: '100%',
    paddingHorizontal: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    width: '100%',
  },
  placeholderText: {
    marginLeft: 10,
    fontSize: 15,
  },
  signInButton: {
    padding: 14,
    borderRadius: 8,
    backgroundColor: '#FFC107',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
  },
  signInButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  registerButton: {
    padding: 14,
    borderRadius: 8,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#FFC107',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFC107',
  },
  forgotPasswordButton: {
    padding: 10,
    alignItems: 'center',
    marginTop: 5,
  },
  forgotPasswordText: {
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  // Time Indicator Styles
  timeIndicator: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: '#ff4d4d',
    borderRadius: 10,
    paddingHorizontal: 4,
    paddingVertical: 2,
    minWidth: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'white',
    zIndex: 100,
  },
  timeIndicatorText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  markerContainer: {
    position: 'relative',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
});
