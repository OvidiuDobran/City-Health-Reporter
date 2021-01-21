/* eslint-disable react/prop-types */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { formatDateFromMillis, formatHourFromMillis } from '../data/time-utils';
import { blueJeans } from './constants';

export default class NewsComponent extends React.Component {
    static navigationOptions = {
        title: 'News',
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
        this.state = { articles: [] };
    }

    componentDidMount() {
        this._fetchNews();
    }

    async _fetchNews() {
        try {
            const response = await fetch(
                'http://192.168.0.179:8080/news/all?cityName=' +
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
            const articles = await response.json();

            this.setState({ articles });
        } catch (e) {
            console.log('Error fetching the articles ' + e);
            this.setState({ articles: [] });
        }
    }

    _formatTitle(title) {
        if (title.length > 30) {
            return title.substring(0, 30) + '...';
        }
        return title;
    }

    render() {
        const { articles } = this.state;
        return (
            <View style={styles.container}>
                <ScrollView /*contentContainerStyle={'center'}*/>
                    {articles.map((article, index) => (
                        <TouchableOpacity
                            style={styles.article}
                            key={index}
                            onPress={() => this.props.navigation.navigate('NewsArticle', { articleId: article.id })}
                        >
                            <Text style={{ fontSize: 17, fontFamily: 'serif' }}>
                                {/* {this._formatTitle(article.title)} */}
                                {article.title}
                            </Text>
                            <Text style={{ fontFamily: 'serif' }}>
                                {formatDateFromMillis(article.creationDate)},{' '}
                                {formatHourFromMillis(article.creationDate)}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    article: {
        backgroundColor: 'white',
        borderColor: 'gray',
        borderWidth: 1,
        height: 100,
        margin: 5,
        justifyContent: 'space-between',
        padding: 5,
        elevation: 3,
        borderRadius: 10
    }
});
