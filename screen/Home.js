import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Animated, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const HomeScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const drawerAnimation = new Animated.Value(0);

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

    const handleBackdropPress = () => {
        setIsDrawerOpen(false);
    };

    const drawerTranslateX = drawerAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [-wp('50%'), 0],
    });

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.menuButton} onPress={handleMenuPress}>
                <Ionicons name="menu" size={24} color="black" />
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
                    onPress={() => handleMenuOptionPress('HomeScreen')}
                    disabled={route.name === 'HomeScreen'} 
                >
                    <Text>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.drawerOption}
                    onPress={() => handleMenuOptionPress('GridCalendar')}
                    disabled={route.name === 'GridCalendar'} 
                >
                    <Text>Calendar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.drawerOption}
                    onPress={() => handleMenuOptionPress('ArmyRankGallery')}
                    disabled={route.name === 'ArmyRankGallery'} 
                >
                    <Text>Army Rank</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.drawerOption}
                    onPress={() => handleMenuOptionPress('AdminNewsPage')}
                    disabled={route.name ==='AdminNewsPage'} 
                >
                    <Text>News</Text>
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
        position: 'absolute',
        top: hp('7%'),
        left: wp('2%'),
        padding: 10,
        zIndex: 1, // Ensure that the menu button is above other elements
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
        top: hp('13%'), // Adjust the top position to create space for the menu button
        left: 0,
        bottom: 0,
        backgroundColor: '#FFF',
        width: wp('50%'), // Adjust the width as needed
        elevation: 4, // Android elevation
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        justifyContent: 'flex-start', // Align items to the top
        alignItems: 'flex-start',
        paddingTop: hp('2%'), // Adjust top padding to align with the menu button
    },
    drawerOption: {
        padding: 10,
    },
});

export default HomeScreen;
