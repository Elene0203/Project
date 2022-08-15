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
import FinishGoal from '../screens/FinishGoal';
import ChangePassword from '../screens/ChangePassword';

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
          headerTintColor: 'black',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="Goal"
        component={FinishGoal}
        options={
          ({
            headerTintColor: 'black',
            headerBackTitleVisible: false,
          },
          ({route}) => ({title: route.params.name}))
        }
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
          headerTintColor: 'black',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="Goal"
        component={FinishGoal}
        options={
          ({
            headerTintColor: 'black',
            headerBackTitleVisible: false,
          },
          ({route}) => ({title: route.params.name}))
        }
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
      }}>
      <Stack.Screen
        name="Insights"
        component={Insights}
        options={{headerLeft: props => null}}
      />
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
      }}>
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={{headerLeft: props => null}}
      />
      <Stack.Screen
        name="Change Password"
        component={ChangePassword}
        options={{
          headerTintColor: 'black',
        }}
      />
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
      <Stack.Screen name="Home" component={BottomTab} />
    </Stack.Navigator>
  );
};

export {SignScreenNavigator};
