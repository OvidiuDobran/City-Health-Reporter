/* eslint-disable react/prop-types */
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { blueJeans } from './constants';
import FavoriteCities from './FavoriteCities';

export default class CitiesRankingScreen extends React.Component {
    static navigationOptions = {
        title: 'Ranking',
        headerStyle: {
            backgroundColor: blueJeans
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    };

    constructor() {
        super();
        this.state = { ranking: [] };
    }

    componentDidMount() {
        this._loadRanking();
    }

    async _loadRanking() {
        try {
            const response = await fetch('http://192.168.0.179:8080/geography/cities/ranking', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + this.props.citizen.token
                }
            });
            const ranking = await response.json();
            this.setState({ ranking });
        } catch (e) {
            this.setState({ ranking: [] });
            console.log(e);
        }
    }

    render() {
        const { ranking } = this.state;
        const favoriteCities = this.props.citizen.favoriteCities || [];
        return (
            <ImageBackground style={styles.backgroundContainer} source={require('../../assets/ranking.jpg')}>
                <ScrollView contentContainerStyle={'center'}>
                    <View style={{ marginVertical: 10 }}>
                        <FavoriteCities
                            cities={favoriteCities}
                            navigation={this.props.navigation}
                            setCity={this.props.setCity}
                        />
                    </View>

                    {ranking.map((cityRank, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.rankingItem}
                            onPress={() => {
                                this.props.setCity(cityRank.city);
                                this.props.navigation.navigate('CityMenu', { city: cityRank.city.name });
                            }}
                        >
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.index}>{index + 1}</Text>
                                <Text>
                                    {cityRank.city.name}, {cityRank.city.country.name}
                                </Text>
                            </View>

                            <View style={styles.rank}>
                                <FontAwesome name='star' color='#fcbe03' size={15} />
                                <Text>{cityRank.rank.toFixed(1)}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    backgroundContainer: { flex: 1 },
    rankingItem: {
        flexDirection: 'row',
        elevation: 1,
        borderColor: 'gray',
        borderWidth: 2,
        margin: 4,
        padding: 4,
        height: 40,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        opacity: 0.8
    },
    index: {
        borderRightWidth: 1,
        borderColor: '#d4d4d4',
        paddingRight: 5,
        marginRight: 5
    },
    rank: {
        width: 35,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});
