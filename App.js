import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RemindersScreen from './screens/RemindersScreen';
import AddReminderScreen from './screens/AddReminderScreen';
import * as Analytics from 'expo-firebase-analytics';

// Gets the current screen from navigation state
const getActiveRouteName = state => {
  const route = state.routes[state.index];
  if (route.state) {
    // Dive into nested navigators
    return getActiveRouteName(route.state);
  }
  return route.name;
};

export default function App() {

   const routeNameRef = React.useRef();
   const navigationRef = React.useRef();

   React.useEffect(() => {
     const state = navigationRef.current.getRootState();

     // Save the initial route name
     routeNameRef.current = getActiveRouteName(state);
   }, []);

  const Stack = createStackNavigator();
  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={(state) => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = getActiveRouteName(state);
        if (previousRouteName !== currentRouteName) {
          Analytics.setCurrentScreen(currentRouteName, currentRouteName);
        }
      }}
    >
      <Stack.Navigator>
        <Stack.Screen name="Reminders" component={RemindersScreen} />
        <Stack.Screen name="AddReminder" component={AddReminderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
