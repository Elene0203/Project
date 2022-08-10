import BottomTab from './src/routing/BottomTab';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SignScreenNavigator} from './src/routing/Navigator';

export default function App() {
  return (
    <NavigationContainer>
      {/*<BottomTab/>*/}
      <SignScreenNavigator />
    </NavigationContainer>
  );
}
