import React from 'react';
import { Platform, Text, View,  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Planets from './screens/Planets'
import Spaceships from './screens/Ships'
import Films from './screens/Films'


// ----- Navigators -----
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function IOSNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Planets" component={Planets} />
      <Tab.Screen name="Films" component={Films} />
      <Tab.Screen name="Spaceships" component={Spaceships} />
    </Tab.Navigator>
  );
}

function AndroidNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen name="Planets" component={Planets} />
      <Drawer.Screen name="Films" component={Films} />
      <Drawer.Screen name="Spaceships" component={Spaceships} />
    </Drawer.Navigator>
  );
}

// ----- Root App -----
export default function App() {
  return (
    <NavigationContainer>
      {Platform.OS === 'ios' ? <IOSNavigator /> : <AndroidNavigator />}
    </NavigationContainer>
  );
}
