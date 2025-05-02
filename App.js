
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import RegisterScreen from './RegisterScreen';
import LoginScreen from './LoginScreen';
import { CoordinateProvider } from './CoordinateContext';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {
  const [username, setUsername] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsername = async () => {
      try {
        const res = await AsyncStorage.getItem("username");
        if (res) {
          console.log("no need to login!")
          setUsername(res);
          setIsLoggedIn(true);
        } else {
          console.log("cant find, lets login u in")
        }
      } catch (err) {
        console.log("cant find, lets login u in")
      } finally {
        setLoading(false);
      }
    };
  
    loadUsername();
  }, []);
  

  if (loading) return null;


  return (
    <CoordinateProvider>
      <NavigationContainer>
        {isLoggedIn ? (
          <HomeScreen username={username} onLogout={() => setIsLoggedIn(false)} />
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