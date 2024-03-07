import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screen/login';
import Register from './screen/Register';
import GridCalendar from './screen/calendar';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="GridCalendar" component={GridCalendar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
