import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screen/login';
import Register from './screen/Register';
import GridCalendar from './screen/calendar';
import 'react-native-gesture-handler';
import HomeScreen from './screen/Home';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
        <Stack.Screen name="Register" component={Register} options={{headershow: false}} />
        <Stack.Screen name="GridCalendar" component={GridCalendar} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headershow: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
