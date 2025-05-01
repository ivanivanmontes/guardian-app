
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import RegisterScreen from './RegisterScreen';
import LoginScreen from './LoginScreen';
import { CoordinateProvider } from './CoordinateContext';
import { useState } from 'react';


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <CoordinateProvider>
      <NavigationContainer>
        {isLoggedIn ? (
          <HomeScreen onLogout={() => setIsLoggedIn(false)} />
        ) : isRegistering ? (
          <RegisterScreen
            onRegisterSuccess={() => {
              setIsRegistering(false);
              setIsLoggedIn(true);
            }}
            onBack={() => setIsRegistering(false)}
          />
        ) : (
          <LoginScreen
            onLoginSuccess={() => setIsLoggedIn(true)}
            onRegister={() => setIsRegistering(true)}
          />
        )}
      </NavigationContainer>
    </CoordinateProvider>
  );
}