import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AddGoal from '../screens/AddGoal';
import Home from '../screens/Home';
import History from '../screens/History';
import Images from '../screens/Images';
import Insights from '../screens/Insights';
import Setting from '../screens/Setting';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import BottomTab from './BottomTab';

const Stack = createStackNavigator();

const HomeScreenNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#92C2DD'},
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 24,
          color: 'black',
        },
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerLeft: props => null}}
      />
      <Stack.Screen
        name="Add Goal"
        component={AddGoal}
        options={{
          headerTintColor: 'white',
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};
export {HomeScreenNavigator};

const HistoryScreenNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#92C2DD'},
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 24,
          color: 'black',
        },
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="History"
        component={History}
        options={{headerLeft: props => null}}
      />
      <Stack.Screen
        name="Images"
        component={Images}
        options={{
          headerTintColor: 'white',
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

export {HistoryScreenNavigator};

const InsightScreenNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#92C2DD'},
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 24,
          color: 'black',
        },
        headerTitleAlign: 'center',
        headerLeft: props => null,
      }}>
      <Stack.Screen name="Insights" component={Insights} />
    </Stack.Navigator>
  );
};

export {InsightScreenNavigator};

const SettingScreenNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#92C2DD'},
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 24,
          color: 'black',
        },
        headerTitleAlign: 'center',
        headerLeft: props => null,
      }}>
      <Stack.Screen name="Setting" component={Setting} />
    </Stack.Navigator>
  );
};

export {SettingScreenNavigator};

const SignScreenNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Home" component={BottomTab}/>
    </Stack.Navigator>
  );
};

export {SignScreenNavigator};
