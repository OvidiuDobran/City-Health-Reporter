import React from 'react';
import { TouchableOpacity, AsyncStorage, Button, StyleSheet, ScrollView, Text } from 'react-native';
import HomeMenuItem from './HomeMenuItem';
import { Octicons, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import CATEGORIES from '../data/problem-category-mock';
import ProblemCategory from '../data/ProblemCategory';
import { ListItem } from 'react-native-elements';
import CategoryListItem from './CategoryListItem';
import Problem from '../data/Problem';

export default class CategoryScreen extends React.Component {
    static navigationOptions = {
        title: 'Choose a category'
    };

    _categories = [];

    _loadCategories() {
        this._categories = CATEGORIES.map((c) => new ProblemCategory(c.id, c.name));
    }

    _setCategory(category) {
        this.props.setCategory(this.props.problem, category);
    }

    render() {
        if (!this.categories || this.categories.length == 0) {
            this._loadCategories();
        }
        return (
            <ScrollView>
                {this._categories.map((category, i) => (
                    <CategoryListItem key={i} title={category.name} onPress={() => this._setCategory(category)} />
                ))}
                <Text>
                    {'Category was updated. Problem:' +
                        JSON.stringify(this.props.problem) +
                        '. Citizen: ' +
                        JSON.stringify(this.props.citizen)}
                </Text>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});
