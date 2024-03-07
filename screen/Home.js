import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const navigation = useNavigation();

    const handleMenuOptionPress = (screen) => {
        navigation.navigate(screen);
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.menuButton} onPress={() => handleMenuOptionPress('Menu')}>
                <Ionicons name="menu" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.title}>About NCC</Text>
            <Text style={styles.heading}>Moto</Text>
            <Text style={styles.par}>Unity and Discipline</Text>
            <Text style={styles.para}>The cadet corps Committee was Started by HN Krunshuv. The NCC was Started in 1948 and November 4th Sunday was Celebrated as NCC Day</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5DC',
    },
    menuButton: {
        position: 'absolute',
        top: hp('2%'),
        left: wp('2%'),
        padding: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    par: {
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 10,
    },
    para: {
        fontSize: 22,
        fontWeight: '600',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default HomeScreen;
