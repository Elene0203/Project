import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {InsightScreenNavigator} from './Navigator';
import {HomeScreenNavigator} from './Navigator';
import {HistoryScreenNavigator} from './Navigator';
import {SettingScreenNavigator} from './Navigator';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#92C2DD',
        tabBarLabelStyle: {fontSize: 16, fontWeight: 'bold'},
      }}>
      <Tab.Screen
        name="Home2"
        component={HomeScreenNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="History2"
        component={HistoryScreenNavigator}
        options={{
          tabBarLabel: 'History',
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="history" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Insights2"
        component={InsightScreenNavigator}
        options={{
          tabBarLabel: 'Insights',
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="insights" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={SettingScreenNavigator}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="account-circle" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
