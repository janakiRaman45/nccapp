import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import Login from './screen/login';
import Registration from './screen/Register';
import GridCalendar from './screen/calendar';
import HomeScreen from './screen/Home';
import ArmyRankGallery from './screen/ranks';
import UserCalendar from './screen/aCallender';
import AdminNewsPage from './screen/Anews';
import ArmyRanks from './screen/ArmyRank';
import PDFPage from './screen/pdf';

const Stack = createStackNavigator();

const App = () => {
  return (
    
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
        <Stack.Screen name="Registration" component={Registration} options={{headerShown: false}} />
        <Stack.Screen name="GridCalendar" component={GridCalendar} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}}/>
        <Stack.Screen name="ArmyRankGallery" component={ArmyRankGallery} />
        <Stack.Screen name="UserCalendar" component={UserCalendar} />
        <Stack.Screen name="AdminNewsPage" component={AdminNewsPage} />
        <Stack.Screen name="ArmyRanks" component={ArmyRanks} />
        <Stack.Screen name="PDFPage" component={PDFPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
