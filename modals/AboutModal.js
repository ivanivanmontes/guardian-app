import React from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles';

// Render about modal
const renderAboutModal = (showAbout, setShowAbout, aboutModalAnimation, darkMode) => {
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
            <Text style={[styles.aboutTitle, { color: darkMode ? '#fff' : '#000' }]}>About Guardian</Text>
            <TouchableOpacity onPress={() => setShowAbout(false)}>
              <Ionicons name="close" size={24} color={darkMode ? '#fff' : '#000'} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.aboutContent}>
            <Ionicons name="shield-checkmark" size={60} color="#FFC107" style={styles.aboutIcon} />
            <Text style={[styles.aboutAppName, { color: darkMode ? '#fff' : '#000' }]}>Guardian iOS App</Text>
            <Text style={[styles.aboutVersion, { color: darkMode ? '#aaa' : '#666' }]}>Version 0.5 (20620.3.03.11)</Text>
            <Text style={[styles.aboutCopyright, { color: darkMode ? '#fff' : '#000' }]}>Copyright © 2025 Guardian Inc</Text>
            <Text style={[styles.aboutRights, { color: darkMode ? '#aaa' : '#666' }]}>All rights reserved</Text>
          </View>
        </Animated.View>
      </Animated.View>
    );
};

export default renderAboutModal;