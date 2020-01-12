import React from 'react';
import { TouchableOpacity, AsyncStorage, Button, StyleSheet, View, Text } from 'react-native';

export default class HomeMenuItem extends React.Component {
    render() {
        return (
            <TouchableOpacity style={styles.menuItem}>
                <Text style={styles.title}>{this.props.title}</Text>
                {this.props.icon}
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    menuItem: {
        flexDirection: 'row',
        borderRadius: 10,
        padding: 9,
        height: 55,
        width: 250,
        backgroundColor: '#00BCD4',
        borderColor: '#fff',
        justifyContent: 'space-around',
        alignItems: 'center',
        elevation: 2
    },
    title: {
        fontSize: 18
    }
});
