/* eslint-disable react/prop-types */
import { MaterialIcons, Octicons } from '@expo/vector-icons';
import React from 'react';
import { AsyncStorage, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { blueJeans } from './constants';
import FavoriteCities from './FavoriteCities';
import HomeMenuItem from './HomeMenuItem';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: '',
        headerStyle: {
            backgroundColor: blueJeans
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        },
        headerBackground: () => <Image style={{ width: 400, height: 80 }} source={require('../../assets/header.png')} />
    };

    _signOutAsync = async () => {
        await AsyncStorage.clear();
    };

    _reportProblem() {
        this.props.createProblem();
        this.props.navigation.navigate('Category');
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground
                    style={styles.backgroundContainer}
                    source={require('../../assets/home_background.jpg')}
                >
                    <View style={{ height: 150 }}>
                        <FavoriteCities
                            cities={this.props.citizen.favoriteCities}
                            setCity={this.props.setCity}
                            navigation={this.props.navigation}
                            displayRank={true}
                        />
                    </View>

                    <View style={styles.reportButtonArea}>
                        <TouchableOpacity style={styles.reportButton} onPress={() => this._reportProblem()}>
                            <Text style={styles.reportButtonTitle}>REPORT A NEW PROBLEM</Text>
                            <Octicons name='report' size={30} color={'white'} />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch'
    },
    backgroundContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 10
    },
    menu: { flex: 3, justifyContent: 'space-around' },
    reportButtonArea: { flex: 1, justifyContent: 'flex-end', paddingBottom: 30 },
    reportButton: {
        flexDirection: 'row',
        borderRadius: 10,
        padding: 9,
        height: 55,
        width: 300,
        backgroundColor: '#D81159',
        borderColor: '#fff',
        justifyContent: 'space-around',
        alignItems: 'center',
        elevation: 2,
        fontSize: 28
    },
    reportButtonTitle: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold'
    }
});
