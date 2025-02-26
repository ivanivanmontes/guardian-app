
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from "./views/tabs";
import { CoordinateProvider } from './CoordinateContext';


export default function App() {
  return(
    <CoordinateProvider>
      <NavigationContainer>
            <Tabs></Tabs>
      </NavigationContainer>
    </CoordinateProvider>
  )
}