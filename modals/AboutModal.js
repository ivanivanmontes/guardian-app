import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, Platform, Animated } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import styles from '../styles';

// Render about modal
const renderAboutModal = () => {
    const aboutModalAnimation = useRef(new Animated.Value(0)).current;
    const [showAbout, setShowAbout] = useState(false);
    const darkMode = false;

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

export default renderAboutModal;