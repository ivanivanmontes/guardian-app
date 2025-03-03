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

export default renderMapPreferencesModal;