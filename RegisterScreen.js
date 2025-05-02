import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { registerUser } from './login';

const RegisterScreen = ({ onRegister, onBack }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const darkMode = false;

  const handleRegister = async () => {
    try {
      const response = await registerUser(username, password);
      Alert.alert('Success', response.message);
      onBack();
    } catch (error) {
      Alert.alert('Error', error?.error || 'Registration failed');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: darkMode ? '#111' : '#f9f9f9' }]}>
      <View style={[styles.card, { backgroundColor: darkMode ? '#222' : '#fff' }]}>
        <Text style={[styles.title, { color: darkMode ? '#fff' : '#000' }]}>Register</Text>

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

        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onBack}>
          <Text style={[styles.linkText, { color: darkMode ? '#aaa' : '#333' }]}>
            Already have an account? Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;

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
  registerButton: {
    backgroundColor: '#FFC107',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  registerButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkText: {
    textAlign: 'center',
    fontSize: 14,
  },
});
