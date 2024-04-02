import React, { useState, useEffect } from 'react';
import { View, ScrollView, ImageBackground, StyleSheet, Text, TouchableOpacity, Animated } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TouchableWithoutFeedback } from 'react-native';

const ArmyRankGallery = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const drawerAnimation = new Animated.Value(0);
    const [userName, setUserName] = useState("Admin");

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

    const handleArmyPress = (Army) => {
        navigation.navigate('ArmyRanks', { Army });
    };

    const handleNavyPress = (Navy) => {
        navigation.navigate('NavyRank', { Navy });
    };

    const handleAirforcePress = (Airforce) => {
        navigation.navigate('Airforce', { Airforce });
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.menuButton} onPress={handleMenuPress}>
                <Ionicons name="menu" size={24} color="black" />
                <Text style={styles.userName}>{userName}</Text>
            </TouchableOpacity>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <TouchableOpacity onPress={() => handleArmyPress('Army')} style={styles.branchButton}>
                    <ImageBackground
                        source={require('../assets/army.jpg')}
                        style={styles.imageBackground}
                        imageStyle={styles.branchButtonImage}
                    >
                        <View style={styles.textContainer}>
                            <Text style={styles.buttonText}>Army</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleNavyPress('Navy')} style={styles.branchButton}>
                    <ImageBackground
                        source={require('../assets/navy.jpg')}
                        style={styles.imageBackground}
                        imageStyle={styles.branchButtonImage}
                    >
                        <View style={styles.textContainer}>
                            <Text style={styles.buttonText}>Navy</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleAirforcePress('Airforce')} style={styles.branchButton}>
                    <ImageBackground
                        source={require('../assets/Airforce.jpg')}
                        style={styles.imageBackground}
                        imageStyle={styles.branchButtonImage}
                    >
                        <View style={styles.textContainer}>
                            <Text style={styles.buttonText}>Airforce</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            </ScrollView>
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
                    <Text style={styles.txt}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.drawerOption}
                    onPress={() => handleMenuOptionPress('GridCalendar')}
                    disabled={route.name === 'GridCalendar'}
                >
                    <Text style={styles.txt}>Calendar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.drawerOption}
                    onPress={() => handleMenuOptionPress('ArmyRankGallery')}
                    disabled={route.name === 'ArmyRankGallery'}
                >
                    <Text style={styles.txt}>Rank Gallery</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.drawerOption}
                    onPress={() => handleMenuOptionPress('AdminNewsPage')}
                    disabled={route.name === 'AdminNewsPage'}
                >
                    <Text style={styles.txt}>News</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.drawerOption}
                    onPress={() => handleMenuOptionPress('Enrollment')}
                    disabled={route.name === 'Enrollment'}
                >
                    <Text style={styles.txt}>Enrollment</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.drawerOption, { marginTop: 'auto' }]}
                    onPress={handleLogout}
                >
                    <Text style={styles.txt}>Logout</Text>
                </TouchableOpacity>
            </Animated.View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: 10,
    },
    menuButton: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: hp('7%'),
        left: wp('2%'),
        padding: 10,
        zIndex: 1,
    },
    userName: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    branchButton: {
        width: wp(80),
        height: hp(30),
        justifyContent: 'flex-end',
        margin: 5,
    },
    imageBackground: {
        flex: 1,
    },
    branchButtonImage: {
        borderRadius: 15,
        opacity: 0.8,
    },
    textContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
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

export default ArmyRankGallery;
