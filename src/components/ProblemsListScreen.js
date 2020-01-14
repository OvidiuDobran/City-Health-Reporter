import React from 'react';
import { TouchableOpacity, AsyncStorage, Button, StyleSheet, View, Text, ScrollView } from 'react-native';
import HomeMenuItem from './HomeMenuItem';
import { Octicons, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

export default class ProblemsListScreen extends React.Component {
    render() {
        const problems =
            this.props.problems && this.props.problems.length > 0
                ? this.props.problems.map((problem) => <Text>{JSON.stringify(problem)}</Text>)
                : [ <Text>No problems reported.</Text> ];
        return <ScrollView>{problems}</ScrollView>;
    }
}
