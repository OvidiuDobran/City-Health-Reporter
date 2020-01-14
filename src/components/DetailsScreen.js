import React from 'react';
import { TouchableOpacity, AsyncStorage, Button, StyleSheet, ScrollView, Text, View, TextInput } from 'react-native';
import HomeMenuItem from './HomeMenuItem';
import { Octicons, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import CATEGORIES from '../data/problem-category-mock';
import ProblemCategory from '../data/ProblemCategory';
import { ListItem } from 'react-native-elements';
import CategoryListItem from './CategoryListItem';
import Problem from '../data/Problem';

export default class DetailsScreen extends React.Component {
    static navigationOptions = {
        title: 'Add Details'
    };

    _description = '';

    _sendProblem() {
        this.props.setDescription(this.props.problem, this._description);
        this.props.addProblem(this.props.problems, { ...this.props.problem, description: this._description });
        this.props.navigation.popToTop();
    }

    _updateDescription(text) {
        this._description = text;
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.describeLabel}>Describe the problem: </Text>
                <TextInput
                    onChangeText={(text) => this._updateDescription(text)}
                    style={styles.description}
                    editable
                    multiline
                />

                {/* <Text>
                    {'Citizen: ' +
                        JSON.stringify(this.props.citizen) +
                        'Problem: ' +
                        JSON.stringify(this.props.problem) +
                        '\nProblems: ' +
                        JSON.stringify(this.props.problems)}
                </Text> */}
                <TouchableOpacity style={styles.photosButton}>
                    <Text style={styles.photosText}>Attach photos</Text>
                    <MaterialIcons name='add-a-photo' size={30} color='black' />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this._sendProblem()} style={styles.sendButton}>
                    <Text style={styles.sendText}>Send</Text>
                    <MaterialIcons name='send' size={30} color='white' />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    description: {
        fontSize: 18,
        padding: 10,
        borderWidth: 2,
        width: 300,
        height: 200,
        borderRadius: 7,
        borderColor: 'gray',
        elevation: 2,
        textAlignVertical: 'top',
        backgroundColor: 'white'
    },
    describeLabel: {
        alignSelf: 'flex-start',
        justifyContent: 'flex-start',
        margin: 30,
        fontSize: 20
    },
    photosButton: {
        width: 230,
        height: 55,
        backgroundColor: '#e6c339',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: 20,
        elevation: 3,
        marginTop: 90
    },
    photosText: {
        fontSize: 20,
        color: '#000'
    },
    sendButton: {
        borderRadius: 20,
        height: 55,
        width: 150,
        backgroundColor: '#000',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        elevation: 3,
        marginTop: 30
    },
    sendText: {
        fontSize: 20,
        color: '#fff'
    }
});
