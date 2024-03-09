import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screen/login';
import Register from './screen/Register';
import GridCalendar from './screen/calendar';
import 'react-native-gesture-handler';
import HomeScreen from './screen/Home';
import ArmyRankGallery from './screen/ranks';
import UserCalendar from './screen/aCallender';
import AdminNewsPage from './screen/Anews';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{headerhown: false}} />
        <Stack.Screen name="Register" component={Register} options={{headerShow: false}} />
        <Stack.Screen name="GridCalendar" component={GridCalendar} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShow: false}} />
        <Stack.Screen name="ArmyRankGallery" component={ArmyRankGallery} />
        <Stack.Screen name="UserCalendar" component={UserCalendar} />
        <Stack.Screen name="AdminNewsPage" component={AdminNewsPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
