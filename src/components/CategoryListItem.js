/* eslint-disable react/prop-types */
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { blueJeans } from './constants';

export default class CategoryListItem extends React.Component {
    render() {
        return (
            <TouchableOpacity
                style={{ ...styles.item, backgroundColor: this.props.index % 2 === 0 ? '#e6e6e6' : 'white' }}
                onPress={this.props.onPress}
            >
                <Text style={styles.title}>{this.props.title}</Text>
                <Ionicons style={styles.icon} name='ios-arrow-forward' color={blueJeans} size={20} />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        height: 60,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: '#c9c9c9',
        borderBottomWidth: 1,
        paddingLeft: 10,
        paddingRight: 10
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        width: 320,
        color: blueJeans
    },
    icon: { marginRight: 10 }
});
