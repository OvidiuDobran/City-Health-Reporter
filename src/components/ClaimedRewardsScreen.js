import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { formatDateFromMillis, formatHourFromMillis } from '../data/time-utils';
import { blueJeans } from './constants';

export default class ClaimedRewardsScreen extends React.Component {
    static navigationOptions = {
        title: 'Claimed Rewards',
        headerStyle: {
            backgroundColor: blueJeans
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    };

    render() {
        const acquisitions = this.props.claimedRewards;
        return (
            <ImageBackground style={styles.backgroundContainer} source={require('../../assets/claimed-rewards.jpg')}>
                <ScrollView style={styles.container}>
                    {acquisitions.map((acquisition, index) => (
                        <TouchableOpacity
                            style={styles.acquisitionItem}
                            key={index}
                            onPress={() => {
                                this.props.setAcquisition(acquisition);
                                this.props.navigation.navigate('DetailedAcquisition');
                            }}
                        >
                            <View style={styles.acquisitionInfo}>
                                <Text style={{ fontSize: 20, fontFamily: 'serif', color: '#303E65' }}>
                                    {acquisition.title}
                                </Text>
                                <Text>
                                    <Text style={{ fontFamily: 'serif', color: '#303E65' }}>
                                        {formatDateFromMillis(acquisition.creationDate) +
                                            ', ' +
                                            formatHourFromMillis(acquisition.creationDate)}
                                    </Text>
                                </Text>
                            </View>
                            <Ionicons name='ios-arrow-forward' size={20} />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </ImageBackground>
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
    acquisitionItem: {
        flexDirection: 'row',
        backgroundColor: '#FFF1D0',
        elevation: 3,
        height: 70,
        width: 350,
        margin: 3,
        alignSelf: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
        borderRadius: 5
    },
    acquisitionInfo: {
        flexDirection: 'column'
    }
});
