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
import NavyRank from './screen/NavyRank';
import Enrollment from './screen/Enroll';
import Airforce from './screen/Airforce';
import PdfList from './screen/pdf';
import ClientNewsPage from './screen/clientNews';
import Home from './screen/hom';
import NccSongLyrics from './screen/song';

const Stack = createStackNavigator();

const App = () => {
  return (
    
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
        <Stack.Screen name="Registration" component={Registration} options={{headerShown: false}} />
        <Stack.Screen name="GridCalendar" component={GridCalendar} options={{headerShown: false}}/>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}}/>
        <Stack.Screen name="ArmyRankGallery" component={ArmyRankGallery} options={{headerShown: false}}/>
        <Stack.Screen name="AdminNewsPage" component={AdminNewsPage} options={{headerShown: false}}/>
        <Stack.Screen name="ArmyRanks" component={ArmyRanks} options={{headerShown: false}}/>
        <Stack.Screen name="NavyRank" component={NavyRank} options={{headerShown: false}}/>
        <Stack.Screen name="Enrollment" component={Enrollment} options={{headerShown: false}} />
        <Stack.Screen name="Airforce" component={Airforce} options={{headerShown: false}}/>
        <Stack.Screen name="PdfList" component={PdfList} />
        <Stack.Screen name="ClientNewsPage" component={ClientNewsPage}  />
        <Stack.Screen name="UserCalendar" component={UserCalendar} options={{headerShown: false}}/>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
        <Stack.Screen name="NccSongLyrics" component={NccSongLyrics} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;