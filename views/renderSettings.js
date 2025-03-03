import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, Platform, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import {crimeData, trafficData, reportsData } from "../mockData";
import getDetailedTimeElapsed from '../utils/timeUtils';
import getThemeStyles from '../utils/themeUtils';

// Render settings panel
const renderSettings = (toggleAnimation, toggleDarkMode, darkMode, setShowAbout) => {
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

export default renderSettings;