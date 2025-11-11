import React from 'react';
import { Platform, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import styles from './Styles';

// ----- Screen Components -----
function PlanetsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Planets Screen</Text>
    </View>
  );
}

function FilmsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Films Screen</Text>
    </View>
  );
}

function SpaceshipsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Spaceships Screen</Text>
    </View>
  );
}

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
      <Tab.Screen name="Planets" component={PlanetsScreen} />
      <Tab.Screen name="Films" component={FilmsScreen} />
      <Tab.Screen name="Spaceships" component={SpaceshipsScreen} />
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
      <Drawer.Screen name="Planets" component={PlanetsScreen} />
      <Drawer.Screen name="Films" component={FilmsScreen} />
      <Drawer.Screen name="Spaceships" component={SpaceshipsScreen} />
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
