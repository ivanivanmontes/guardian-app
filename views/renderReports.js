import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, Platform, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import {crimeData, trafficData, reportsData } from "../mockData";
import getDetailedTimeElapsed from '../utils/timeUtils';
import getThemeStyles from '../utils/themeUtils';
// Render reports screen
const renderReports = (darkMode) => {
  const theme = getThemeStyles(darkMode);
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

export default renderReports;