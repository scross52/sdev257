import React, { useState, useEffect }from 'react';
import { Platform, Text, View, TouchableOpacity, Modal } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import NetInfo from "@react-native-community/netinfo";
import { SafeAreaView } from 'react-native-safe-area-context';
import Planets from './screens/Planets'
import Spaceships from './screens/Ships'
import Films from './screens/Films'
import styles from './Styles';

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
        headerShown: true,
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
const [isConnected, setIsConnected] = useState(true);
  const [showModal, setShowModal] = useState(false); // modal visibility
  const [showBanner, setShowBanner] = useState(false); // passive notification

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      const connected =
        state.isConnected && state.isInternetReachable !== false;

      setIsConnected(connected);

      if (!connected) {
        // Show modal AND banner when offline
        setShowModal(true);
        setShowBanner(true);
      } else {
        // Hide everything when online
        setShowModal(false);
        setShowBanner(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
        {Platform.OS === 'ios' ? <IOSNavigator /> : <AndroidNavigator />}

        {/* ✅ Passive banner at top */}
        {showBanner && (
          <View style={styles.banner}>
            <Text style={styles.bannerText}>⚠ No Internet Connection</Text>
          </View>
        )}

        {/* ✅ Modal (user can close it manually) */}
        <Modal
          visible={showModal}
          animationType="fade"
          transparent={true}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>No Internet Connection</Text>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.closeText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

    </NavigationContainer>
  );
}
