import React from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView, { Marker } from 'react-native-maps';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class LocationScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: 0,
            longitude: 0,
            error: null
        };
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null
                });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 500 }
        );
    }

    _confirmLocation() {
        console.log(this.state.latitude + ' ' + this.state.longitude);
        this.props.setCoordinates(this.props.problem, this.state.latitude, this.state.longitude);
        this.props.navigation.navigate('Details');
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    region={{
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                        latitudeDelta: 0.003,
                        longitudeDelta: 0.004
                    }}
                >
                    <Marker coordinate={this.state} />
                </MapView>
                <View style={styles.controlArea}>
                    <TouchableOpacity onPress={() => this._confirmLocation()} style={styles.confirmButton}>
                        <Text style={styles.text}>Confirm</Text>
                    </TouchableOpacity>
                    <Text>{JSON.stringify(this.props.problem)}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        flex: 3
    },
    controlArea: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    confirmButton: {
        borderWidth: 1,
        backgroundColor: '#000',
        height: 60,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        elevation: 2
    },
    text: {
        color: '#fff',
        fontSize: 20
    }
});
