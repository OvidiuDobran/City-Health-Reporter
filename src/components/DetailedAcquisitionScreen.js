/* eslint-disable react/prop-types */
import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { formatDateFromMillis, formatHourFromMillis } from '../data/time-utils';
import { blueJeans, color2 } from './constants';

export default class DetailedAcquisitionScreen extends React.Component {
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
        const acquisition = this.props.acquisition;
        return (
            <ImageBackground style={styles.container} source={require('../../assets/claimed-reward.png')}>
                <View style={styles.acquisitionContainer}>
                    <View style={styles.header}>
                        <Text style={styles.title}>{acquisition.title}</Text>
                    </View>
                    <Text style={{ alignSelf: 'center', fontFamily: 'serif' }}>
                        Claimed on {formatDateFromMillis(acquisition.creationDate)},{' '}
                        {formatHourFromMillis(acquisition.creationDate)}
                    </Text>
                    <View style={styles.details}>
                        <Text style={styles.description}>{acquisition.description}</Text>
                        <View style={styles.qrView}>
                            <QRCode
                                value={acquisition.code}
                                //Setting the value of QRCode
                                size={200}
                                //Size of QRCode
                                bgColor='#000'
                                //Backgroun Color of QRCode
                                fgColor='#fff'
                                //Front Color of QRCode
                            />
                            <Text style={{ marginTop: 10 }}>{acquisition.code}</Text>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 30
    },
    acquisitionContainer: {
        flex: 5,
        flexDirection: 'column',
        borderRadius: 10,
        padding: 10
    },
    header: {
        // marginBottom: ,
        borderBottomColor: 'gray',
        borderBottomWidth: 2
    },
    title: {
        fontSize: 27,
        fontFamily: 'serif',
        alignSelf: 'center'
    },
    details: {
        justifyContent: 'space-between',
        flex: 4,
        flexDirection: 'column'
    },
    description: { fontSize: 19, flex: 5, fontFamily: 'serif' },
    qrView: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: 20,
        flex: 5
    },
    footer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    claimButton: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: color2,
        borderRadius: 17,
        elevation: 3,
        height: 60,
        width: 150,
        flexDirection: 'row'
    }
});
