// Get theme-based styles
const getThemeStyles = (darkMode) => {
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


export default getThemeStyles;