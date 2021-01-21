/* eslint-disable react/prop-types */
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { blueJeans, color1, onyx } from './constants';

export default class DetailedRewardsScreen extends React.Component {
    static navigationOptions = {
        title: 'Reward',
        headerStyle: {
            backgroundColor: blueJeans
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    };

    async _claimReward(rewardId) {
        await fetch(
            'http://192.168.0.179:8080/reward/acquisition?citizenEmail=' +
                this.props.citizen.email +
                '&rewardId=' +
                rewardId,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + this.props.citizen.token
                }
            }
        );
    }

    render() {
        const reward = this.props.reward;
        console.log(JSON.stringify(reward));
        return (
            <View style={styles.container}>
                <ImageBackground style={styles.backgroundContainer} source={require('../../assets/blue-gradient.png')}>
                    <ImageBackground style={styles.rewardContainer} source={require('../../assets/giftcard.png')}>
                        <View style={{ justifyContent: 'center', alignContent: 'center' }}>
                            <View style={{ justifyContent: 'center', alignContent: 'center', marginLeft: 45 }}>
                                <Text style={styles.title}>{reward.title}</Text>
                            </View>

                            <View style={styles.details}>
                                <View style={styles.descriptionContainer}>
                                    <Text style={styles.description}>{reward.description}</Text>
                                </View>
                                <Text style={{ alignSelf: 'flex-end', marginBottom: 40, marginRight: 10 }}>
                                    <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}>
                                        {reward.cost + ' '}
                                    </Text>
                                    <FontAwesome5 name='coins' size={24} color='#fccf03' />
                                </Text>
                            </View>
                        </View>
                    </ImageBackground>
                    <View style={styles.footer}>
                        <TouchableOpacity
                            style={reward.cost <= this.props.budget ? styles.claimButton : styles.disabledButton}
                            disabled={reward.cost > this.props.budget}
                            onPress={() => {
                                this._claimReward(reward.id);
                                this.props.navigation.popToTop();
                            }}
                        >
                            <Text style={{ fontSize: 22, color: 'white' }}>Claim</Text>
                            <MaterialIcons name='payment' color='white' size={23} />
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
        flexDirection: 'column'
    },
    backgroundContainer: {
        flex: 1,
        flexDirection: 'column',
        padding: 5,
        alignContent: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#2d68cf'
    },
    rewardContainer: {
        flex: 1,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
        paddingTop: 10,
        height: 225,
        width: 330,
        alignSelf: 'center',
        elevation: 5
    },
    header: {
        marginBottom: 10
    },
    title: {
        fontSize: 27,
        color: 'white',
        alignSelf: 'center',
        fontFamily: 'serif'
    },
    details: {
        justifyContent: 'space-evenly',
        flex: 4,
        marginTop: 15,
        // borderColor: 'black',
        // borderWidth: 10,
        alignContent: 'flex-start',
        alignItems: 'flex-start',
        width: 250,
        marginLeft: 100,
        marginRight: 20
    },
    descriptionContainer: {},
    description: {
        fontSize: 19,
        fontFamily: 'serif',
        color: 'white',
        marginTop: 12
    },
    footer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 30
    },
    claimButton: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: blueJeans,
        borderRadius: 17,
        elevation: 3,
        height: 60,
        width: 150,
        flexDirection: 'row'
    },
    disabledButton: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius: 17,
        elevation: 3,
        height: 60,
        width: 150,
        flexDirection: 'row',
        backgroundColor: '#8a8a8a'
    }
});
