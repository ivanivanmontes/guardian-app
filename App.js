
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import { CoordinateProvider } from './CoordinateContext';


export default function App() {
  return(
    <CoordinateProvider>
      <NavigationContainer>
            <HomeScreen></HomeScreen>
      </NavigationContainer>
    </CoordinateProvider>
  )
}