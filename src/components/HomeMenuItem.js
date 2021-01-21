/* eslint-disable react/prop-types */
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { bdazzledBlue } from './constants';

export default class HomeMenuItem extends React.Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress} style={styles.menuItem}>
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
        backgroundColor: bdazzledBlue,
        justifyContent: 'space-around',
        alignItems: 'center',
        elevation: 2
    },
    title: {
        fontSize: 18,
        color: 'white'
    }
});
