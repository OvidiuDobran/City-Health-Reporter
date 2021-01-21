/* eslint-disable react/prop-types */
import React from 'react';
import { ScrollView } from 'react-native';
import CategoryListItem from './CategoryListItem';
import { blueJeans } from './constants';

export default class CategoryScreen extends React.Component {
    static navigationOptions = {
        title: 'Choose a category',
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
            categories: []
        };
    }

    componentDidMount() {
        this._loadCategories();
    }

    async _loadCategories() {
        let categories = await this._fetchCategories();
        this.setState({ categories });
    }

    async _fetchCategories() {
        let request = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.props.citizen.token
            }
        };
        try {
            const response = await fetch('http://192.168.0.179:8080/problem/categories', request);
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.log('Error fetching data: ' + error);
            return [];
        }
    }

    _setCategory(category) {
        this.props.setCategory(this.props.problem, category);
    }

    _navigateFurther() {
        this.props.navigation.navigate('Location');
    }

    render() {
        return (
            <ScrollView>
                {this.state.categories.map((category, i) => (
                    <CategoryListItem
                        key={i}
                        index={i}
                        title={category}
                        onPress={() => {
                            this._setCategory(category);
                            this._navigateFurther();
                        }}
                    />
                ))}
            </ScrollView>
        );
    }
}
