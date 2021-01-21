/* eslint-disable react/prop-types */
import React from 'react';
import {
    TouchableOpacity,
    AsyncStorage,
    Button,
    StyleSheet,
    ScrollView,
    Text,
    View,
    TextInput,
    ImageBackground
} from 'react-native';
import { color1, color2, blueJeans, midnightBlue } from './constants';
import MapView from 'react-native-maps';
import { formatDateFromMillis, formatHourFromMillis } from '../data/time-utils';
import RatingComponent from './RatingComponent';
import { Octicons, Ionicons, MaterialCommunityIcons, FontAwesome5, Feather } from '@expo/vector-icons';
import { AppLoading } from 'expo';

export default class CityMenuScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('city', 'City Menu'),
            headerStyle: {
                backgroundColor: blueJeans
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold'
            }
        };
    };

    componentDidMount() {
        this._loadRewards();
        this._loadAcquisitions();
        this._calculateUserBudget();
    }

    async _loadRewards() {
        try {
            const response = await fetch(
                'http://192.168.0.179:8080/reward/all?cityName=' +
                    this.props.city.name +
                    '&countryName=' +
                    this.props.city.country.name,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + this.props.citizen.token
                    }
                }
            );
            const rewards = await response.json();
            this.props.setDefinedRewards(rewards);
        } catch (e) {
            console.log('Error fetching the rewards' + e);
            this.props.setDefinedRewards([]);
        }
    }

    async _loadAcquisitions() {
        try {
            const response = await fetch(
                'http://192.168.0.179:8080/reward/acquisition/all?citizenEmail=' +
                    this.props.citizen.email +
                    '&cityName=' +
                    this.props.city.name +
                    '&countryName=' +
                    this.props.city.country.name,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + this.props.citizen.token
                    }
                }
            );
            const acquisitions = await response.json();
            this.props.setClaimedRewards(acquisitions);
        } catch (e) {
            console.log('Error fetching the acquisitions' + e);
            this.props.setClaimedRewards([]);
        }
    }

    async _calculateUserBudget() {
        try {
            const response = await fetch(
                'http://192.168.0.179:8080/reward/budget?citizenEmail=' +
                    this.props.citizen.email +
                    '&cityName=' +
                    this.props.city.name +
                    '&countryName=' +
                    this.props.city.country.name,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + this.props.citizen.token
                    }
                }
            );
            const budget = await response.json();
            this.props.setBudget(budget);
        } catch (e) {
            console.log('Error fetching the acquisitions' + e);
            this.props.setBudget(0);
        }
    }

    render() {
        console.log(JSON.stringify(this.props.city));
        return (
            <ImageBackground style={styles.container} source={require('../../assets/town-hall.jpg')}>
                <View style={styles.buttonsView}>
                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => this.props.navigation.navigate('ProblemsList')}
                    >
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Reported problems</Text>
                        <View style={styles.icons}>
                            <Octicons name='issue-closed' size={24} color='white' />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => this.props.navigation.navigate('DefinedRewards', { budget: this.props.budget })}
                    >
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Defined rewards</Text>
                        <View style={styles.icons}>
                            <Feather name='gift' size={20} color='white' />
                            <MaterialCommunityIcons name='city' size={20} color='white' />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => this.props.navigation.navigate('ClaimedRewards')}
                    >
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Claimed rewards</Text>
                        <View style={styles.icons}>
                            <Feather name='gift' size={20} color='white' />
                            <FontAwesome5 name='user' size={20} color='white' />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} onPress={() => this.props.navigation.navigate('News')}>
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>News</Text>
                        <View style={styles.icons}>
                            <FontAwesome5 name='newspaper' size={24} color='white' />
                        </View>
                    </TouchableOpacity>
                </View>
                <Text
                    style={{
                        marginBottom: 170,
                        alignSelf: 'center',
                        fontWeight: 'bold',
                        fontFamily: 'serif',
                        color: '#484538',
                        fontStyle: 'italic'
                    }}
                >
                    {this.props.city.name}
                </Text>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    buttonsView: {
        marginTop: 20,
        justifyContent: 'space-evenly'
    },
    menuItem: {
        backgroundColor: '#28536B',
        elevation: 2,
        borderRadius: 10,
        height: 50,
        width: 230,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        marginBottom: 30
    },
    icons: {
        flexDirection: 'row'
    }
});
