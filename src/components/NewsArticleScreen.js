/* eslint-disable react/prop-types */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
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
        this.state = {
            article: null
        };
    }

    componentDidMount() {
        const articleId = this.props.navigation.state.params.articleId;
        this._loadArticle(articleId);
    }

    async _loadArticle(articleId) {
        try {
            console.log('News from: ' + JSON.stringify(this.props.city));
            const response = await fetch('http://192.168.0.179:8080/news/' + articleId, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + this.props.citizen.token
                }
            });
            const article = await response.json();

            this.setState({ article });
        } catch (e) {
            console.log('Error fetching the articles ' + e);
            this.setState({ article: null });
        }
    }

    render() {
        const { article } = this.state;
        const content = article && article.content;
        const title = article && article.title;
        const creationDate = article && article.creationDate;
        const cityName = article && article.city && article.city.name;
        return (
            <ScrollView style={styles.container}>
                <View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{title}</Text>
                    </View>
                    <Text style={styles.creationDate}>
                        {cityName + ' '}
                        {formatDateFromMillis(creationDate)}, {formatHourFromMillis(creationDate)}
                    </Text>
                </View>

                <View style={styles.contentContainer}>
                    <Text style={styles.content}>{content}</Text>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white', padding: 10 },
    titleContainer: { borderBottomWidth: 1, borderBottomColor: 'black', padding: 5 },
    title: { fontSize: 24, fontWeight: 'bold', fontFamily: 'serif' },
    creationDate: { color: 'gray', fontStyle: 'italic', margin: 3, fontFamily: 'serif' },
    contentContainer: { marginTop: 10, marginBottom: 30 },
    content: { fontSize: 17, fontFamily: 'serif' }
});
