import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Animated, TextInput } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import renderReports from './views/renderReports';
import renderSettings from './views/renderSettings';
import styles from './styles';
import getDetailedTimeElapsed from './utils/timeUtils';
import getThemeStyles from './utils/themeUtils';
import renderAboutModal from './modals/AboutModal';
import axios from "axios";
import { useFocusEffect } from '@react-navigation/native';

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

const lightMapStyle = [];

const trafficEnhancements = [

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
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      { "weight": 3 },
      { "visibility": "simplified" }
    ]
  }
];



export default function HomeScreen( {username, onLogout }) {
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
  const [showSignIn, setShowSignIn] = useState(false);
  const [showAddReport, setShowAddReport] = useState(false);
  const [reportTitle, setReportTitle] = useState('');
  const [reportDescription, setReportDescription] = useState('');
  const [reportAddress, setReportAddress] = useState('');
  const [reportTag, setReportTag] = useState('crime');
  const [resData, setResData] = useState([]);

  
  // Animation values
  const toggleAnimation = useRef(new Animated.Value(0)).current;
  const aboutModalAnimation = useRef(new Animated.Value(0)).current;
  const mapPreferencesAnimation = useRef(new Animated.Value(0)).current;
  const notificationPreferencesAnimation = useRef(new Animated.Value(0)).current;
  const signInModalAnimation = useRef(new Animated.Value(0)).current;
  const addReportModalAnimation = useRef(new Animated.Value(0)).current;

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

  // Sign in modal Effect
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

  // Add Report modal Effect
  useEffect(() => {
    if (showAddReport) {
      Animated.spring(addReportModalAnimation, {
        toValue: 1,
        useNativeDriver: true,
        friction: 8,
        tension: 40,
        velocity: 3
      }).start();
    } else {
      Animated.timing(addReportModalAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      }).start();
      // Reset form fields when closing Report Modal
      setReportTitle('');
      setReportDescription('');
      setReportAddress('');
      setReportTag('crime');
    }
  }, [showAddReport]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const theme = getThemeStyles(darkMode);

  const getMapStyle = () => {
    const baseStyle = darkMode ? darkMapStyle : lightMapStyle;
    
    if (activeTab === 'traffic') {
      return [
        ...baseStyle,
        ...trafficEnhancements
      ];
    }
    
    return baseStyle;
  };

  const fetchReports = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/get-all-reports");
      const formattedData = response.data.map((report, index) => ({
        id: report._id?.$oid || index.toString(),
        title: report.title,
        description: report.description,
        address: report.address,
        username: report.username,
        time: report.time?.$date,
        tag: report.tag,
        latitude: report.latitude,
        longitude: report.longitude
      }));
      setResData(formattedData);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchReports();
    }, [])
  );

  
  
  const renderMapContent = () => {
    switch (activeTab) {
      case 'crime':
  return (
          <>
        {resData.map((crime) => {
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
                  <Text style={styles.emojiText}>{crime.tag == "crime" ? "👊" : "🚧" }</Text>
                  {getTimeIndicator(crime.time)}
                </View>
              </TouchableOpacity>
              
              <Callout tooltip>
                <View style={[styles.calloutStyle, { backgroundColor: theme.calloutBackground, borderColor: theme.calloutBorder }]}>
                  <View style={styles.calloutHeader}>
                    <Text style={styles.emoji}>{crime.tag == "crime" ? "👊" : "🚧" }</Text>
                    <Text style={[styles.title, { color: theme.calloutTitle }]}>{crime.title}</Text>
                  </View>
                  <View style={[styles.divider, { backgroundColor: theme.dividerColor }]} />
                  <Text style={[styles.description, { color: theme.primaryText }]}>{timeDescription}</Text>
                  <Text style={[styles.time, { color: theme.secondaryText }]}>Time: {Date(crime.date)}</Text>
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



  const handleCreateReport = async () => {

    if (!reportTitle.trim()) {
      alert('Please enter a title for the report');
      return;
    }
    if (!reportDescription.trim()) {
      alert('Please enter a description for the report');
      return;
    }
    if (!reportAddress.trim()) {
      alert('Please enter an address for the report');
      return;
    }

    try { 
      const response = await axios.post('http://127.0.0.1:5000/add-report', {
        username: username,
        title: reportTitle,
        description: reportDescription,
        address: reportAddress,
        tag: reportTag
      });
      console.log('POST success:', response.data);
      fetchReports();
    } catch(error) {
      console.log("error idk");
    }
    
    // Close the modal
    setShowAddReport(false);
    alert('Report submitted successfully!');
  };
  
  // Render add report modal
  const renderAddReportModal = () => {
    const modalScale = addReportModalAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0.8, 1]
    });
    
    const modalOpacity = addReportModalAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    });

    return (
      <Animated.View 
        style={[
          styles.modalOverlay,
          { opacity: addReportModalAnimation }
        ]}
        pointerEvents={showAddReport ? 'auto' : 'none'}
      >
        <Animated.View 
          style={[
            styles.aboutModal, 
            styles.addReportModal,
            { 
              backgroundColor: darkMode ? '#222' : '#fff',
              transform: [{ scale: modalScale }],
              opacity: modalOpacity
            }
          ]}
        >
          <View style={styles.aboutHeader}>
            <Text style={[styles.aboutTitle, { color: darkMode ? '#fff' : '#000' }]}>Create New Report</Text>
            <TouchableOpacity onPress={() => setShowAddReport(false)}>
              <Ionicons name="close" size={24} color={darkMode ? '#fff' : '#000'} />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.addReportContent}>
            <View style={styles.inputContainer}>
              <Text style={[styles.inputLabel, { color: darkMode ? '#fff' : '#000' }]}>
                Title <Text style={{ color: '#FF3B30' }}>*</Text>
              </Text>
              <TextInput
                style={[
                  styles.textInput,
                  { 
                    backgroundColor: darkMode ? '#333' : '#f5f5f5',
                    color: darkMode ? '#fff' : '#000',
                    borderColor: darkMode ? '#444' : '#ddd'
                  }
                ]}
                placeholder="Enter report title"
                placeholderTextColor={darkMode ? '#aaa' : '#999'}
                value={reportTitle}
                onChangeText={setReportTitle}
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={[styles.inputLabel, { color: darkMode ? '#fff' : '#000' }]}>
                Address <Text style={{ color: '#FF3B30' }}>*</Text>
              </Text>
              <TextInput
                style={[
                  styles.textInput,
                  { 
                    backgroundColor: darkMode ? '#333' : '#f5f5f5',
                    color: darkMode ? '#fff' : '#000',
                    borderColor: darkMode ? '#444' : '#ddd'
                  }
                ]}
                placeholder="Enter location address"
                placeholderTextColor={darkMode ? '#aaa' : '#999'}
                value={reportAddress}
                onChangeText={setReportAddress}
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={[styles.inputLabel, { color: darkMode ? '#fff' : '#000' }]}>
                Description <Text style={{ color: '#FF3B30' }}>*</Text>
              </Text>
              <TextInput
                style={[
                  styles.textInput,
                  styles.textAreaInput,
                  { 
                    backgroundColor: darkMode ? '#333' : '#f5f5f5',
                    color: darkMode ? '#fff' : '#000',
                    borderColor: darkMode ? '#444' : '#ddd'
                  }
                ]}
                placeholder="Enter report description"
                placeholderTextColor={darkMode ? '#aaa' : '#999'}
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
                value={reportDescription}
                onChangeText={setReportDescription}
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={[styles.inputLabel, { color: darkMode ? '#fff' : '#000' }]}>
                Tag <Text style={{ color: '#FF3B30' }}>*</Text>
              </Text>
              <View style={styles.tagContainer}>
                <TouchableOpacity 
                  style={[
                    styles.tagOption,
                    reportTag === 'crime' && styles.tagOptionSelected,
                    { borderColor: darkMode ? '#444' : '#ddd', flex: 0.8 }
                  ]}
                  onPress={() => setReportTag('crime')}
                >
                  <Ionicons 
                    name="warning" 
                    size={20} 
                    color={reportTag === 'crime' ? '#FFC107' : (darkMode ? '#fff' : '#000')}
                  />
                  <Text 
                    style={[
                      styles.tagText,
                      { color: reportTag === 'crime' ? '#FFC107' : (darkMode ? '#fff' : '#000') }
                    ]}
                  >
                    Crime
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[
                    styles.tagOption,
                    reportTag === 'infrastructure' && styles.tagOptionSelected,
                    { borderColor: darkMode ? '#444' : '#ddd', flex: 1.2 }
                  ]}
                  onPress={() => setReportTag('infrastructure')}
                >
                  <Ionicons 
                    name="construct" 
                    size={20} 
                    color={reportTag === 'infrastructure' ? '#FFC107' : (darkMode ? '#fff' : '#000')}
                  />
                  <Text 
                    style={[
                      styles.tagText,
                      { color: reportTag === 'infrastructure' ? '#FFC107' : (darkMode ? '#fff' : '#000') }
                    ]}
                  >
                    Infrastructure
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
          
          <View style={styles.modalFooter}>
            <TouchableOpacity 
              style={styles.createReportButton}
              onPress={handleCreateReport}
            >
              <Text style={styles.createReportButtonText}>Create Report</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animated.View>
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
          mapType={mapType}
        >
          {renderMapContent()}
      </MapView>
      ) : (
        renderReports(darkMode, setShowAddReport, resData)
      )}

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

      {showSettings && renderSettings(toggleAnimation, toggleDarkMode, darkMode, setShowAbout, setShowSignIn, setShowSettings, setShowNotificationPreferences, setShowMapPreferences, onLogout, username)}
      {renderAboutModal(showAbout, setShowAbout, aboutModalAnimation, darkMode)}
      {renderMapPreferencesModal()}
      {renderNotificationPreferencesModal()}
      {renderSignInModal()}
      {renderAddReportModal()}

      <View style={[styles.bottomMenu, { 
        backgroundColor: darkMode ? 'rgba(34, 34, 34, 0.85)' : 'rgba(255, 255, 255, 0.85)',
        borderTopColor: darkMode ? '#444' : '#ddd'
      }]}>
        <TouchableOpacity 
          style={[
            styles.menuItem, 
            activeTab === 'crime' && [
              styles.activeMenuItem, 
              { backgroundColor: darkMode ? 'rgba(51, 51, 51, 0.8)' : 'rgba(240, 240, 240, 0.8)' }
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
            color={activeTab === 'crime' ? "#FFC107" : darkMode ? "white" : "#333"} 
          />
          <Text style={[styles.menuText, { color: darkMode ? "white" : "#333" }]}>Crime Map</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.menuItem, 
            activeTab === 'traffic' && [
              styles.activeMenuItem, 
              { backgroundColor: darkMode ? 'rgba(51, 51, 51, 0.8)' : 'rgba(240, 240, 240, 0.8)' }
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
            color={activeTab === 'traffic' ? "#FFC107" : darkMode ? "white" : "#333"} 
          />
          <Text style={[styles.menuText, { color: darkMode ? "white" : "#333" }]}>Traffic</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.menuItem, 
            activeTab === 'reports' && [
              styles.activeMenuItem, 
              { backgroundColor: darkMode ? 'rgba(51, 51, 51, 0.8)' : 'rgba(240, 240, 240, 0.8)' }
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
            color={activeTab === 'reports' ? "#FFC107" : darkMode ? "white" : "#333"} 
          />
          <Text style={[styles.menuText, { color: darkMode ? "white" : "#333" }]}>Reports</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.menuItem, 
            showSettings && [
              styles.activeMenuItem, 
              { backgroundColor: darkMode ? 'rgba(51, 51, 51, 0.8)' : 'rgba(240, 240, 240, 0.8)' }
            ]
          ]}
          onPress={() => setShowSettings(!showSettings)}
        >
          <Ionicons 
            name="settings" 
            size={24} 
            color={showSettings ? "#FFC107" : darkMode ? "white" : "#333"} 
          />
          <Text style={[styles.menuText, { color: darkMode ? "white" : "#333" }]}>Settings</Text>
        </TouchableOpacity>
      </View>
      
      <StatusBar style={activeTab === 'reports' ? (darkMode ? "light" : "dark") : (darkMode ? "light" : "dark")} backgroundColor={activeTab === 'reports' ? (darkMode ? '#222' : '#fff') : 'transparent'} />
    </View>
  );
}

