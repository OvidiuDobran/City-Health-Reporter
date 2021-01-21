/* eslint-disable react/prop-types */
import { FontAwesome5, Entypo } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import { blueJeans } from './constants';

export default class FavoriteCities extends React.Component {
    renderButtons() {
        const cities = this.props.cities || [];
        return cities.map((city, index) => (
            <TouchableOpacity
                style={{ ...styles.favoriteItem, backgroundColor: itemsColours[index] }}
                key={index}
                onPress={() => {
                    this.props.setCity(city);
                    this.props.navigation.navigate('CityMenu', { city: city.name });
                }}
            >
                <Text style={styles.itemText}>{city.name}</Text>
            </TouchableOpacity>
        ));
    }

    render() {
        const cities = this.props.cities || [];
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Favorites</Text>
                    <TouchableOpacity
                        style={{ alignSelf: 'center' }}
                        onPress={() => this.props.navigation.navigate('FavoriteCities')}
                    >
                        <FontAwesome5 name='edit' size={27} color='white' />
                    </TouchableOpacity>
                </View>
                <View style={styles.body}>
                    {cities.length == 0 ? (
                        <Text style={{ color: 'white', marginTop: 20, fontSize: 16 }}>
                            You don`t have a favorite city
                        </Text>
                    ) : (
                        this.renderButtons()
                    )}
                </View>
                {this.props.displayRank ? (
                    <View>
                        <TouchableOpacity
                            style={{ alignSelf: 'flex-end', marginRight: 8 }}
                            onPress={() => this.props.navigation.navigate('CitiesRanking')}
                        >
                            <Entypo name='dots-three-horizontal' size={24} color='white' />
                        </TouchableOpacity>
                    </View>
                ) : null}
            </View>
        );
    }
}

const itemsColours = [ '#ED6A5A', '#63C132', '#372772' ];

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        flex: 1,
        backgroundColor: blueJeans,
        borderRadius: 10,
        width: 350,
        elevation: 3,
        height: 100,
        padding: 5
    },
    header: { flex: 2, justifyContent: 'space-between', flexDirection: 'row' },
    title: {
        color: 'white',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 18
    },
    body: { flex: 3, flexDirection: 'row', justifyContent: 'center' },
    favoriteItem: {
        margin: 10,
        justifyContent: 'center',
        padding: 10,
        borderRadius: 10,
        elevation: 4,
        width: 100
    },
    itemText: { color: 'white', alignSelf: 'center', fontWeight: 'bold' }
});
