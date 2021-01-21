/* eslint-disable react/prop-types */
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Problem from '../data/Problem';
import { blueJeans } from './constants';

export default class DetailsScreen extends React.Component {
    static navigationOptions = {
        title: 'Add details',
        headerStyle: {
            backgroundColor: blueJeans
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    };

    _description = '';

    async _sendProblem() {
        await this.props.setDescription(this.props.problem, this._description);
        await this.props.setCitizenEmail(this.props.problem, this.props.citizen.email);
        this.props.navigation.popToTop();
        const responseProblem = await this._fetchProblemSend(this.props.problem);
        if (responseProblem) {
            this._fetchImagesSend(responseProblem.id, this.props.problemImages);
        }
    }

    _fetchProblemSend = async (problem) => {
        try {
            const response = await fetch('http://192.168.0.179:8080/problem/new', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + this.props.citizen.token
                },
                body: JSON.stringify(problem)
            });
            return Problem.buildProblem(await response.json());
        } catch (error) {
            console.log('Error fetching data: ' + error);
        }
    };

    _fetchImagesSend = async (problemId, images) => {
        console.log('Images: ' + images);
        if (!images || images.length === 0) {
            return;
        }
        images.forEach(async (image) => {
            try {
                const formData = this._createFormData(image);
                console.log('Form data: ' + JSON.stringify(formData));
                await fetch('http://192.168.0.179:8080/problem/new/images/' + problemId, {
                    method: 'POST',
                    headers: {
                        Authorization: 'Bearer ' + this.props.citizen.token
                    },
                    body: formData
                });
            } catch (e) {
                console.log(e);
            }
        });
    };

    _createFormData(image) {
        const data = new FormData();
        data.append('file', {
            type: 'image/jpg',
            uri: image,
            name: 'problem_image.jpg'
        });
        return data;
    }

    _updateDescription(text) {
        this._description = text;
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.describeLabel}>Describe the problem: </Text>
                    <TextInput
                        onChangeText={(text) => this._updateDescription(text)}
                        style={styles.description}
                        editable
                        multiline
                    />
                </View>

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
        justifyContent: 'space-between'
    },
    descriptionContainer: {
        flex: 2,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    describeLabel: {
        marginTop: 20,
        alignSelf: 'flex-start',
        justifyContent: 'flex-start',
        fontSize: 20
    },
    description: {
        marginTop: 15,
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
    sendButton: {
        borderRadius: 20,
        height: 55,
        width: 150,
        backgroundColor: blueJeans,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        elevation: 3,
        marginBottom: 35
    },
    sendText: {
        fontSize: 20,
        color: '#fff'
    }
});
