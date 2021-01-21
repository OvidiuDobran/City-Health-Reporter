/* eslint-disable react/prop-types */
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { blueJeans } from './constants';

export default class FavoriteCitiesScreen extends React.Component {
    static navigationOptions = {
        title: 'Pick your favorites',
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
        let favoriteCities = [];
        if (this.props.citizen && this.props.citizen.favoriteCities) {
            favoriteCities = this.props.citizen.favoriteCities;
        }
        this.state = {
            cities: [],
            favoriteCities
        };
    }

    componentDidMount() {
        this._loadUserCities();
    }

    async _loadUserCities() {
        try {
            const response = await fetch('http://192.168.0.179:8080/geography/cities', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + this.props.citizen.token
                }
            });
            const cities = await response.json();
            this.setState({ cities });
        } catch (e) {
            console.log("Error fetching the user's cities");
            this.setState({ cities: [] });
        }
    }

    _getCityCheckedIndex(city) {
        const { favoriteCities } = this.state;
        let cityIndex = -1;
        favoriteCities.forEach((favoriteCity, index) => {
            if (favoriteCity.name === city.name && favoriteCity.country.name === city.country.name) {
                cityIndex = index;
            }
        });
        return cityIndex;
    }

    _handleCheckedCity(city) {
        const { favoriteCities } = this.state;
        const cityIndex = this._getCityCheckedIndex(city);
        if (cityIndex >= 0) {
            favoriteCities.splice(cityIndex, 1);
        } else {
            if (this.state.favoriteCities.length < 3) {
                favoriteCities.push(city);
            }
        }
        this.setState({ ...this.state, favoriteCities: favoriteCities });
    }

    renderFavoriteIcon(city) {
        const cityIndex = this._getCityCheckedIndex(city);
        if (cityIndex >= 0) {
            return <MaterialIcons name='favorite' size={23} color={blueJeans} />;
        }
        if (this.state.favoriteCities.length >= 3) {
            return null;
        }
        return <MaterialIcons name='favorite-border' size={23} />;
    }

    async _updateFavoriteCities() {
        const citizen = { ...this.props.citizen, favoriteCities: this.state.favoriteCities };
        try {
            const response = await fetch('http://192.168.0.179:8080/citizen/favorite-cities', {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + this.props.citizen.token
                },
                body: JSON.stringify(citizen)
            });
            const updatedCitizen = await response.json();
            this.props.setCitizen(updatedCitizen);
        } catch (error) {
            console.log('Error fetching data: ' + error);
        }
    }

    render() {
        const { cities } = this.state;
        return (
            <View style={styles.container}>
                <ScrollView>
                    {cities.map((city, index) => (
                        <TouchableOpacity
                            style={styles.cityItem}
                            key={index}
                            onPress={() => this._handleCheckedCity(city)}
                        >
                            <Text style={{ fontSize: 18 }}>{city.name + ', ' + city.country.name}</Text>
                            {this.renderFavoriteIcon(city)}
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={() => {
                        this._updateFavoriteCities();
                        this.props.navigation.popToTop();
                    }}
                >
                    <Text style={styles.saveText}>Save</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    cityItem: {
        backgroundColor: 'white',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        marginBottom: 5,
        elevation: 3,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10
    },
    saveButton: {
        alignSelf: 'center',
        backgroundColor: blueJeans,
        margin: 20,
        borderRadius: 10,
        height: 50,
        width: 150,
        justifyContent: 'center',
        elevation: 3
    },
    saveText: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 19,
        fontWeight: 'bold'
    }
});
