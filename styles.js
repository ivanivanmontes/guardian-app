import { StyleSheet, Platform } from 'react-native';


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
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingVertical: 8,
      paddingHorizontal: 10,
      position: 'absolute',
      bottom: 20,
      left: 20,
      right: 20,
      borderRadius: 25,
      elevation: 8,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
    },
    menuItem: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 20,
    },
    activeMenuItem: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 20,
    },
    menuText: {
      fontSize: 12,
      marginTop: 4,
      fontWeight: '500',
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
      bottom: 100, // Position above the bottom menu
      left: 20,
      right: 20,
      padding: 20,
      paddingTop: 10,
    },
    settingsHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
      paddingBottom: 10,
      borderBottomWidth: 1,
    },
    settingsTitle: {
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
    },
    settingLabel: {
      fontSize: 16,
    },
    settingButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 14,
      borderBottomWidth: 1,
    },
    settingButtonText: {
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
    // Add Report Modal styles
    addReportModal: {
      maxHeight: '80%',
      width: '90%',
    },
    addReportContent: {
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    modalFooter: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      padding: 15,
      borderTopWidth: 1,
      borderTopColor: '#ddd',
    },
    textInput: {
      height: 50,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 15,
      marginBottom: 5,
      fontSize: 16,
    },
    textAreaInput: {
      height: 120,
      paddingTop: 12,
      textAlignVertical: 'top',
    },
    tagContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 5,
      marginHorizontal: -5,
      marginBottom: 5,
    },
    tagOption: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderRadius: 16,
      padding: 12,
      marginHorizontal: 5,
      position: 'relative',
    },
    tagOptionSelected: {
      borderColor: '#FFC107',
      borderWidth: 2,
    },
    tagText: {
      marginLeft: 8,
      fontSize: 14,
      fontWeight: '500',
    },
    tagCheckmark: {
      position: 'absolute',
      top: 5,
      right: 5,
    },
    createReportButton: {
      backgroundColor: '#FFC107',
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 20,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 2,
    },
    createReportButtonText: {
      color: '#000',
      fontSize: 16,
      fontWeight: '600',
    },
  });

  export default styles;