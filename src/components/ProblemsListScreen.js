/* eslint-disable react/prop-types */
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import Problem, { STATUS } from '../data/Problem';
import { blueJeans, color2 } from './constants';
import ProblemsListItem from './ProblemsListItem';

export default class ProblemsListScreen extends React.Component {
    static navigationOptions = {
        title: 'Reported Problems',
        headerStyle: {
            backgroundColor: blueJeans
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    };

    _buttons = [ 'PENDING', 'SOLVED', 'CLOSED', 'REJECTED' ];

    _buttonsHandlers = {
        0: [ STATUS.NEW, STATUS.IN_PROGRESS ],
        1: [ STATUS.RESOLVED ],
        2: [ STATUS.CLOSED ],
        3: [ STATUS.REJECTED ]
    };

    constructor() {
        super();
        this.state = {
            selectedIndex: 0,
            problems: []
        };
    }

    async componentDidMount() {
        const problems = await this._loadProblems(this._buttonsHandlers[0]);
        this.setState({ ...this.state, problems: problems });
    }

    async _loadProblems(statusList) {
        const responseProblems = await this._fetchProblems(statusList);
        return responseProblems && responseProblems.map((res) => Problem.buildProblem(res));
    }

    async _fetchProblems(statusList) {
        let statusListString = statusList.join(',');
        try {
            const response = await fetch(
                'http://192.168.0.179:8080/problem/citizen?citizenEmail=' +
                    this.props.citizen.email +
                    '&statusList=' +
                    statusListString +
                    '&cityName=' +
                    this.props.city.name +
                    '&countryName=' +
                    this.props.city.country.name,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + this.props.citizen.token
                    }
                }
            );
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.log('Error fetching data: ' + error);
            return [];
        }
    }

    async _updateSelectedIndex(selectedIndex) {
        const problems = await this._loadProblems(this._buttonsHandlers[selectedIndex]);
        this.setState({ selectedIndex, problems });
    }

    render() {
        const { problems } = this.state;
        let problemsList;
        if (problems && problems.length > 0) {
            problemsList = (
                <ScrollView>
                    {problems.map((problem, i) => (
                        <ProblemsListItem
                            key={i}
                            problem={problem}
                            onPress={() => this.props.navigation.navigate('ProblemOverview', { problem })}
                        />
                    ))}
                </ScrollView>
            );
        } else {
            problemsList = (
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 17 }}>No problems reported</Text>
                </View>
            );
        }
        return (
            <View style={{ flex: 1, backgroundColor: '#2C497F', paddingHorizontal: 3 }}>
                <View>
                    <ButtonGroup
                        onPress={(selectedIndex) => this._updateSelectedIndex(selectedIndex)}
                        selectedIndex={this.state.selectedIndex}
                        buttons={this._buttons}
                        containerStyle={{ height: 40 }}
                        selectedButtonStyle={{ backgroundColor: blueJeans }}
                    />
                </View>
                {problemsList}
            </View>
        );
    }
}
