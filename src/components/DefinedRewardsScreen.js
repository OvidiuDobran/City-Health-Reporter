/* eslint-disable react/prop-types */
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import InsetShadow from 'react-native-inset-shadow';
import { blueJeans } from './constants';

export default class DefinedRewardsScreen extends React.Component {
    static navigationOptions = {};

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Defined Rewards' + navigation.getParam('budget', ''),
            headerStyle: {
                backgroundColor: blueJeans
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold'
            },
            headerTitle: () => (
                <View style={styles.headerContainer}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Defined rewards</Text>
                    <InsetShadow>
                        <View style={styles.budgetContainer}>
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
                                {'Budget ' + navigation.getParam('budget', '') + ' '}
                            </Text>
                            <FontAwesome5 name='coins' size={17} color='#fccf03' />
                        </View>
                    </InsetShadow>
                </View>
            )
        };
    };

    constructor() {
        super();
        this.state = {
            rewards: []
        };
    }

    render() {
        const rewards = this.props.definedRewards;
        return (
            <ImageBackground style={styles.backgroundContainer} source={require('../../assets/get-rewards.jpg')}>
                <ScrollView style={styles.container}>
                    {rewards.map((reward, index) => (
                        <TouchableOpacity
                            style={{
                                ...styles.rewardItem,
                                backgroundColor: reward.cost <= this.props.budget ? '#FFEEDB' : '#003249'
                            }}
                            key={index}
                            onPress={() => {
                                this.props.setReward(reward);
                                this.props.navigation.navigate('DetailedReward');
                            }}
                        >
                            <View style={styles.rewardInfo}>
                                <Text
                                    style={{
                                        fontSize: 20,
                                        fontFamily: 'serif',
                                        color: reward.cost <= this.props.budget ? '#003249' : '#FFEEDB'
                                    }}
                                >
                                    {reward.title}
                                </Text>
                                <Text>
                                    <Text
                                        style={{
                                            fontFamily: 'serif',
                                            color: reward.cost <= this.props.budget ? '#003249' : '#FFEEDB'
                                        }}
                                    >
                                        {reward.cost + ' '}
                                    </Text>
                                    <FontAwesome5 name='coins' size={17} color='#fccf03' />
                                </Text>
                            </View>
                            <Ionicons
                                name='ios-arrow-forward'
                                size={20}
                                color={reward.cost <= this.props.budget ? '#003249' : '#FFEEDB'}
                            />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: blueJeans,
        alignContent: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: 280
    },
    budgetContainer: {
        flexDirection: 'row',
        backgroundColor: '#0065b3',
        padding: 5,
        borderRadius: 5
    },
    backgroundContainer: {
        flex: 1
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: 10
    },
    rewardItem: {
        elevation: 4,
        height: 70,
        width: 350,
        margin: 3,
        alignSelf: 'center',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 5,
        borderRadius: 5
    },

    rewardInfo: {
        flexDirection: 'column'
    }
});
