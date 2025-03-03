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

export default renderNotificationPreferencesModal;