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

export default renderSignInModal;