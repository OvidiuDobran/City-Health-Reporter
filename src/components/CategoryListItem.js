import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class CategoryListItem extends React.Component {
    render() {
        return (
            <TouchableOpacity style={styles.item} onPress={this.props.onPress}>
                <Text style={styles.title}>{this.props.title}</Text>
                <Ionicons style={styles.icon} name='ios-arrow-forward' color='#fff' size={20} />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        height: 60,
        backgroundColor: '#000',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: '#5e5e5d',
        borderBottomWidth: 1,
        paddingLeft: 10,
        paddingRight: 10
    },
    title: {
        color: '#fff',
        fontSize: 20
    }
});
