/* eslint-disable react/prop-types */
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView from 'react-native-maps';
import { STATUS } from '../data/Problem';
import { formatDateFromMillis, formatHourFromMillis } from '../data/time-utils';
import { blueJeans, color2, midnightBlue } from './constants';
import RatingComponent from './RatingComponent';

export default class ProblemOverviewScreen extends React.Component {
    static navigationOptions = {
        title: 'Problem overview',
        headerStyle: {
            backgroundColor: blueJeans
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    };

    _rating = 5;

    render() {
        const problem = this.props.navigation.state.params.problem;
        const reportedDate = problem.getReportedDate();
        const currentStatus = problem.getCurrentStatus();
        const description =
            problem.description && problem.description.length > 0 ? (
                <Text style={{ fontStyle: 'italic', fontSize: 17, marginTop: 10 }}>
                    {"'" + problem.description + "'"}
                </Text>
            ) : (
                <Text>{'No description'}</Text>
            );
        return (
            <View style={styles.container}>
                <View style={styles.problemContainer}>
                    <Text style={styles.title}>{problem.category}</Text>
                    <Text>
                        Reported on {formatDateFromMillis(reportedDate)}, {formatHourFromMillis(reportedDate)}
                    </Text>
                    <Text>{'Address: ' + problem.address}</Text>
                    {description}
                    <MapView
                        style={{ height: 160, marginTop: 20 }}
                        initialRegion={{
                            latitude: problem.latitude,
                            longitude: problem.longitude,
                            latitudeDelta: 0.003,
                            longitudeDelta: 0.004
                        }}
                    >
                        <MapView.Marker
                            coordinate={{
                                latitude: problem.latitude,
                                longitude: problem.longitude
                            }}
                        />
                    </MapView>
                </View>
                {currentStatus === STATUS.RESOLVED ? (
                    <View style={{ flex: 2 }}>
                        <View style={styles.rating}>
                            <RatingComponent
                                onRatingSelected={(rating) => {
                                    this._rating = rating;
                                }}
                            />
                        </View>
                        <View style={styles.footer}>
                            <TouchableOpacity
                                style={styles.send}
                                onPress={() => {
                                    this._closeProblem(problem.id, this._rating);
                                    this.props.navigation.popToTop();
                                }}
                            >
                                <Text style={{ fontSize: 20, color: 'white' }}>Send</Text>
                                <MaterialIcons name='send' size={28} color='white' />
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <Text />
                )}
            </View>
        );
    }

    _closeProblem(problemId, rating) {
        try {
            fetch('http://192.168.0.179:8080/problem/close?problemId=' + problemId + '&rating=' + rating, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + this.props.citizen.token
                }
            });
        } catch (error) {
            console.log('Error fetching data: ' + error);
        }
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        backgroundColor: '#2C497F'
    },
    problemContainer: {
        flex: 3,
        borderColor: 'black',
        elevation: 2,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        borderRadius: 10,
        padding: 10,
        backgroundColor: 'white'
    },
    title: {
        fontSize: 25,
        borderBottomColor: '#bababa',
        borderBottomWidth: 2
    },
    rating: {
        flex: 1,
        borderColor: 'black',
        elevation: 2,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        borderRadius: 10,
        padding: 10,
        paddingBottom: 20,
        backgroundColor: 'white'
    },
    footer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    send: {
        backgroundColor: blueJeans,
        borderRadius: 13,
        width: 130,
        height: 50,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        elevation: 3
    }
});
