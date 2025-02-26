import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from '../screens/HomeScreen';
import PartnerScreen from '../screens/PartnerScreen';
import PinScreen from '../screens/PinScreen';
import AddScreen from '../screens/AddScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { TouchableOpacity } from 'react-native';

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }) => (
    <TouchableOpacity
      style={{
        top: -30,
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={onPress}
    >
      <View
        style={{
          width: 70,
          height: 70,
          borderRadius: 35,
          backgroundColor: "#FFF8DC",
          ...styles.shadow, // Apply shadow to the View
        }}
      >
        {children}
      </View>
      <Text
        style={{
          top: 10,
          fontSize: 22,
          fontWeight: 'bold',
          textAlign: 'center',
          color: "#C0C1EE"
        }}
      >
        ADD
      </Text>
    </TouchableOpacity>
  );
  

// bottom tab
const Tabs = () => {
  return(
    <Tab.Navigator
  screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: [
          {
            backgroundColor: "#FFF8DC",
            position: "absolute",
            bottom: 25,
            left: 20,
            right: 20,
            elevation: 0,
            borderRadius: 15,
            height: 90,
          },
          null
        ],
        
  }}
>
      <Tab.Screen name='Home' 
      component={HomeScreen}
      options={{
        tabBarIcon: ({focused}) => (
            <View
                style={{alignItems: "center", justifyContent: "center", top:10}}
            >
                <Image
                    source={require('../assets/homeExample.png')}
                    resizeMode='contain'
                    style={{
                        width: 25,
                        height: 25,
                        // tintColor: focused ? "#E6E6FA" : "#748c94", use on gray png icons

                    }}
                />
                <Text
                    style={{color: focused? "#C0C1EE" : "#748c94", fontSize: 12}}
                >
                    HOME
                </Text>
            </View>
        ),
      }}  
      />
      <Tab.Screen name = "Pins" component={PinScreen}
      options={{
        tabBarIcon: ({focused}) => (
            <View
                style={{alignItems: "center", justifyContent: "center", top:10}}
            >
                <Image
                    source={require('../assets/heartExample.png')}
                    resizeMode='contain'
                    style={{
                        width: 25,
                        height: 25,
                        // tintColor: focused ? "#E6E6FA" : "#748c94", use on gray png icons

                    }}
                />
                <Text
                    style={{color: focused? "#C0C1EE" : "#748c94", fontSize: 12}}
                >
                    Pins
                </Text>
            </View>
        ),
      }}
      />

        <Tab.Screen
        name="Add"
        component={AddScreen}
        initialParams={{ openModal: true }}
        options={{
            tabBarIcon: ({ focused }) => (
                <Image
                    source={require("../assets/addExample.png")}
                    resizeMode='contain'
                    style={{
                    width: 30,
                    height: 30,
                    }}
                />
                ),
            
            tabBarButton: (props) => (
                <CustomTabBarButton {...props} />
            ),
        }}
        />
      <Tab.Screen name = "Partner" component={PartnerScreen}
      options={{
        tabBarIcon: ({focused}) => (
            <View
                style={{alignItems: "center", justifyContent: "center", top:10}}
            >
                <Image
                    source={require('../assets/partnerExample.png')}
                    resizeMode='contain'
                    style={{
                        width: 25,
                        height: 25,
                        // tintColor: focused ? "#E6E6FA" : "#748c94", use on gray png icons

                    }}
                />
                <Text
                    style={{color: focused? "#C0C1EE" : "#748c94", fontSize: 12}}
                >
                    Partner
                </Text>
            </View>
        ),
      }}
      />
      <Tab.Screen name = "Settings" component={SettingsScreen}
      options={{
        tabBarIcon: ({focused}) => (
            <View
                style={{alignItems: "center", justifyContent: "center", top:10}}
            >
                <Image
                    source={require('../assets/settingsExample.png')}
                    resizeMode='contain'
                    style={{
                        width: 25,
                        height: 25,
                        // tintColor: focused ? "#E6E6FA" : "#748c94", use on gray png icons

                    }}
                />
                <Text
                    style={{color: focused? "#C0C1EE" : "#748c94", fontSize: 12}}
                >
                    settings
                </Text>
            </View>
        ),
      }}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#7F5DF0",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    }
})

export default Tabs;