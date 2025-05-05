import React from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import styles from '../styles';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const renderSettings = (toggleAnimation, toggleDarkMode, darkMode, setShowAbout, setShowSignIn, setShowSettings, setShowNotificationPreferences, setShowMapPreferences, onLogout, username) => {
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
      <View style={[
        styles.settingsPanel, 
        { 
          backgroundColor: darkMode ? '#222' : '#fff',
          borderRadius: 25,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.3,
          shadowRadius: 4.65,
          elevation: 8,
          borderWidth: 1,
          borderColor: darkMode ? '#444' : '#ddd',
        }
      ]}>
        <View style={[styles.settingsHeader, { borderBottomColor: darkMode ? '#444' : '#ddd' }]}>
          <Text style={[styles.settingsTitle, { color: darkMode ? '#fff' : '#000' }]}>Settings</Text>
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => setShowSettings(false)}
          >
            <Ionicons name="close" size={24} color={darkMode ? '#fff' : '#000'} />
          </TouchableOpacity>
        </View>
        
        <View style={[styles.settingItem, { borderBottomColor: darkMode ? '#444' : '#ddd' }]}>
          <Text style={[styles.settingLabel, { color: darkMode ? '#fff' : '#000' }]}>Dark Mode</Text>
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
        <View style={[styles.settingItem, { borderBottomColor: darkMode ? '#444' : '#ddd' }]}>
          <Text style={[styles.settingLabel, { color: darkMode ? '#fff' : '#000' }]}>Username: {username}</Text>
        </View>
        
        
        
        <TouchableOpacity 
          style={[styles.settingButton, { borderBottomColor: darkMode ? '#444' : '#ddd' }]}
          onPress={() => setShowNotificationPreferences(true)}
        >
          <Ionicons name="notifications-outline" size={20} color={darkMode ? '#fff' : '#333'} />
          <Text style={[styles.settingButtonText, { color: darkMode ? '#fff' : '#333' }]}>Notification Preferences</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.settingButton, { borderBottomColor: darkMode ? '#444' : '#ddd' }]}
          onPress={() => setShowMapPreferences(true)}
        >
          <Ionicons name="map-outline" size={20} color={darkMode ? '#fff' : '#333'} />
          <Text style={[styles.settingButtonText, { color: darkMode ? '#fff' : '#333' }]}>Map Preferences</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.settingButton, { borderBottomColor: darkMode ? '#444' : '#ddd' }]}
          onPress={() => setShowAbout(true)}
        >
          <Ionicons name="information-circle-outline" size={20} color={darkMode ? '#fff' : '#333'} />
          <Text style={[styles.settingButtonText, { color: darkMode ? '#fff' : '#333' }]}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.settingButton, { borderBottomColor: darkMode ? '#444' : '#ddd' }]}
          onPress={async () => {
            await AsyncStorage.removeItem('username');
            onLogout();
          }}
        >
          <Ionicons name="person-circle-outline" size={20} color={darkMode ? '#fff' : '#333'} />
          <Text style={[styles.settingButtonText, { color: darkMode ? '#fff' : '#333' }]}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
};

export default renderSettings;