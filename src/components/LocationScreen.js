/* eslint-disable react/prop-types */
import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapView from 'react-native-maps';
import marker from '../../assets/marker.png';
import { City, Country } from '../data/City';
import { blueJeans } from './constants';

export default class LocationScreen extends React.Component {
    static navigationOptions = {
        title: 'Location',
        headerStyle: {
            backgroundColor: blueJeans
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            region: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0.003,
                longitudeDelta: 0.004
            },
            error: null
        };
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    region: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: position.coords.latitudeDelta,
                        longitudeDelta: position.coords.longitudeDelta
                    },
                    error: null
                });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 500 }
        );
    }

    async _confirmLocation() {
        const response = await fetch(
            'https://maps.googleapis.com/maps/api/geocode/json?address=' +
                this.state.region.latitude +
                ',' +
                this.state.region.longitude +
                '&key=' +
                'AIzaSyDE7TNTJLCQo4Y_zzAN3cOFU1zdLlaNQ8A'
        );
        const responseJson = await response.json();
        console.log(JSON.stringify(responseJson));
        const cityName = this._getCityFromFullAddress(responseJson);
        const countryName = this._getCountryFromFullAddress(responseJson);
        const formattedAddress = this._getFormattedAddressFromFullAddress(responseJson);
        const city = new City(cityName, new Country(countryName));

        await this.props.setCityProblem(this.props.problem, city);
        await this.props.setCoordinates(this.props.problem, this.state.region.latitude, this.state.region.longitude);
        await this.props.setAddress(this.props.problem, formattedAddress);
        this.props.navigation.navigate('Attachments');
    }

    _getCityFromFullAddress = (responseJson) => {
        for (let result of responseJson.results) {
            for (let addrComponent of result.address_components) {
                if (addrComponent.types[0] == 'locality') {
                    return addrComponent.long_name;
                }
            }
        }
        return null;
    };

    _getCountryFromFullAddress = (responseJson) => {
        for (let result of responseJson.results) {
            for (let addrComponent of result.address_components) {
                if (addrComponent.types[0] == 'country') {
                    return addrComponent.long_name;
                }
            }
        }
        return null;
    };

    _getFormattedAddressFromFullAddress = (responseJson) => {
        const addresses = [];
        for (let result of responseJson.results) {
            let street, number, postalCode;
            for (let addrComponent of result.address_components) {
                if (addrComponent.types[0] === 'route' && !street) {
                    street = addrComponent.long_name;
                } else if (addrComponent.types[0] === 'postal_code' && !postalCode) {
                    postalCode = addrComponent.long_name;
                } else if (addrComponent.types[0] === 'street_number' && !number) {
                    number = addrComponent.long_name;
                }
                if (street && postalCode && number) {
                    addresses.push({
                        street,
                        number,
                        postalCode
                    });
                }
            }
        }
        if (addresses.length == 0) {
            return '';
        }
        for (let address of addresses) {
            if (address.street && address.number && address.postalCode) {
                return '' + address.street + ' ' + address.number + ', ' + address.postalCode;
            }
        }
        const address = addresses[0];
        return (
            '' +
            (address.street || '') +
            ' ' +
            (address.number || '') +
            (address.postalCode ? ', ' + address.postalCode : '')
        );
    };

    _handleMapRegionChange = (newRegion) => {
        this.setState({
            region: {
                latitude: newRegion.latitude,
                longitude: newRegion.longitude,
                latitudeDelta: newRegion.latitudeDelta,
                longitudeDelta: newRegion.longitudeDelta
            }
        });
    };

    render() {
        return (
            <View style={styles.map}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: this.state.region.latitude,
                        longitude: this.state.region.longitude,
                        latitudeDelta: 0.003,
                        longitudeDelta: 0.004
                    }}
                    region={{
                        latitude: this.state.region.latitude,
                        longitude: this.state.region.longitude,
                        latitudeDelta: this.state.region.latitudeDelta ? this.state.region.latitudeDelta : 0.003,
                        longitudeDelta: this.state.region.longitudeDelta ? this.state.region.longitudeDelta : 0.004
                    }}
                    onRegionChangeComplete={this._handleMapRegionChange}
                />
                <View style={styles.markerFixed}>
                    <Image style={styles.marker} source={marker} />
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity onPress={() => this._confirmLocation()} style={styles.confirmButton}>
                        <Text style={styles.text}>Confirm</Text>
                        <AntDesign name={'pushpin'} color={'white'} size={30} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    markerFixed: {
        left: '50%',
        marginLeft: -24,
        marginTop: -48,
        position: 'absolute',
        top: '50%'
    },
    marker: {
        height: 75,
        width: 50
    },
    footer: {
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 10,
        position: 'absolute',
        width: '100%'
    },
    region: {
        color: '#fff',
        lineHeight: 20,
        margin: 20
    },

    container: {
        flex: 1
    },
    controlArea: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    confirmButton: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        // borderWidth: 1,
        backgroundColor: blueJeans,
        height: 55,
        width: 140,
        borderRadius: 20,
        elevation: 2
    },
    text: {
        color: '#fff',
        fontSize: 20
    }
});
