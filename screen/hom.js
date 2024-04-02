import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Animated, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ClientNewsPage from "./clientNews";
import UserCalendar from "./aCallender";
import ArmyRankGallery from "./ranks";
import NccSongLyrics from "./song";


const Home = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const drawerAnimation = new Animated.Value(0);
    const [userName, setUserName] = useState("");

    useEffect(() => {
        if (isDrawerOpen) {
            Animated.timing(drawerAnimation, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(drawerAnimation, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [isDrawerOpen]);

    const handleMenuPress = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const handleMenuOptionPress = (screen) => {
        setIsDrawerOpen(false);
        navigation.navigate(screen);
    };

    const handleLogout = () => {
        // Navigate to the Login screen
        navigation.navigate('Login');
    };

    const handleBackdropPress = () => {
        setIsDrawerOpen(false);
    };

    const drawerTranslateX = drawerAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [-wp('60%'), 0],
    });

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.menuButton} onPress={handleMenuPress}>
                <Ionicons name="menu" size={24} color="black" />
                <Text style={styles.userName}>{userName}</Text>
            </TouchableOpacity>
            <Image source={require('../assets/image-90.png')} style={styles.topImage} />
            <Text style={styles.title}>About NCC</Text>
            <Text style={styles.heading}>Moto</Text>
            <Text style={styles.par}>Unity and Discipline</Text>
            <Text style={styles.para}>The cadet corps Committee was Started by HN Krunshuv. The NCC was Started in 1948 and November 4th Sunday was Celebrated as NCC Day</Text>
            
            {isDrawerOpen && (
                <TouchableWithoutFeedback onPress={handleBackdropPress}>
                    <View style={styles.backdrop} />
                </TouchableWithoutFeedback>
            )}
            
            <Animated.View style={[styles.drawer, { transform: [{ translateX: drawerTranslateX }] }]}>
                <TouchableOpacity
                    style={styles.drawerOption}
                    onPress={() => handleMenuOptionPress('Home')}
                    disabled={route.name === 'Home'} 
                >
                    <Text style={styles.txt}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.drawerOption}
                    onPress={() => handleMenuOptionPress(UserCalendar)}
                    disabled={route.name === 'UserCalendar'} 
                >
                    <Text style={styles.txt}>Calendar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.drawerOption}
                    onPress={() => handleMenuOptionPress('ClientNewsPage')}
                    disabled={route.name === 'ClientNewsPage'} 
                >
                    <Text style={styles.txt}>News Page</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.drawerOption}
                    onPress={() => handleMenuOptionPress('ArmyRankGallery')}
                    disabled={route.name ==='ArmyRankGallery'} 
                >
                    <Text style={styles.txt}>Rank Gallery</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.drawerOption}
                    onPress={() => handleMenuOptionPress('Enrollment')}
                    disabled={route.name ==='Enrollment'} 
                >
                    <Text style={styles.txt}>Enrollment</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.drawerOption}
                    onPress={() => handleMenuOptionPress('NccSongLyrics')}
                    disabled={route.name ==='NccSongLyrics'} 
                >
                    <Text style={styles.txt}>Ncc Song</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.drawerOption, { marginTop: 'auto' }]} // Push the logout button to the bottom
                    onPress={handleLogout}
                >
                    <Text style={styles.txt}>Logout</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5DC', // Change the background color if needed
    },
    menuButton: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: hp('7%'),
        left: wp('2%'),
        padding: 10,
        zIndex: 1, // Ensure that the menu button is above other elements
    },
    userName: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
    topImage: {
        width: wp('100%'),
        height: hp('30%'),
        resizeMode: 'cover',
        position: 'absolute',
        top: 90,
        left: 0,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: hp('30%'), // Adjust margin top to leave space for the image
        marginBottom: 10,
    },
    par: {
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 10,
    },
    para: {
        fontSize: 18,
        fontWeight: '600',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    drawer: {
        position: 'absolute',
        top: hp('0%'), 
        left: 0,
        bottom: 0,
        backgroundColor: '#FFF',
        width: wp('60%'), 
        elevation: 4, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        justifyContent: 'flex-start', 
        alignItems: 'stretch',
        paddingTop: hp('15%'),  
    },
    drawerOption: {
        padding: 10,
        fontSize: 20,
    },
    txt: {
        fontSize: 16,
    }
});

export default Home;
