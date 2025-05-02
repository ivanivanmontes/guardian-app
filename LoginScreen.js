import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from './login';

const LoginScreen = ({ onLoginSuccess, onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const darkMode = false; // Replace with context or prop if you use dark mode globally

  const handleLogin = async () => {
    const response = await loginUser(username, password);
    try {
      await AsyncStorage.setItem("username", String(username));
      Alert.alert('Success', response.message);
      onLoginSuccess();
    } catch (error) {
      console.error("AsyncStorage error:", error);
      Alert.alert('Error', error?.message || String(error));
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: darkMode ? '#111' : '#f9f9f9' }]}>
      <View style={[styles.card, { backgroundColor: darkMode ? '#222' : '#fff' }]}>
        <Text style={[styles.title, { color: darkMode ? '#fff' : '#000' }]}>Sign In</Text>

        <View style={[styles.inputField, { backgroundColor: darkMode ? '#333' : '#f5f5f5' }]}>
          <Ionicons name="person-outline" size={20} color={darkMode ? '#aaa' : '#666'} style={styles.inputIcon} />
          <TextInput
            style={[styles.input, { color: darkMode ? '#fff' : '#000' }]}
            placeholder="Username"
            placeholderTextColor={darkMode ? '#aaa' : '#999'}
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
        </View>

        <View style={[styles.inputField, { backgroundColor: darkMode ? '#333' : '#f5f5f5' }]}>
          <Ionicons name="lock-closed-outline" size={20} color={darkMode ? '#aaa' : '#666'} style={styles.inputIcon} />
          <TextInput
            style={[styles.input, { color: darkMode ? '#fff' : '#000' }]}
            placeholder="Password"
            placeholderTextColor={darkMode ? '#aaa' : '#999'}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onRegister}>
          <Text style={[styles.linkText, { color: darkMode ? '#aaa' : '#333' }]}>
            Don't have an account? Register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 40,
  },
  loginButton: {
    backgroundColor: '#FFC107',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  loginButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkText: {
    textAlign: 'center',
    fontSize: 14,
  },
});
