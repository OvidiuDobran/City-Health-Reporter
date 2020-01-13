import React from 'react';
import { TouchableOpacity, AsyncStorage, Button, StyleSheet, View, Text } from 'react-native';
import HomeMenuItem from './HomeMenuItem';
import { Octicons, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Home'
    };

    _signOutAsync = async () => {
        await AsyncStorage.clear();
    };

    _reportProblem() {
        this.props.createProblem();
        this.props.navigation.navigate('Category');
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Logged user: {JSON.stringify(this.props)}</Text>
                <View style={styles.menu}>
                    <HomeMenuItem title='Reported problems' icon={<Octicons name='tasklist' size={27} />} />
                    <HomeMenuItem title='Rewards' icon={<Ionicons name='ios-ribbon' size={30} />} />
                    <HomeMenuItem title='Profile' icon={<MaterialCommunityIcons name='account' size={30} />} />
                    <HomeMenuItem title='Cities Ranking' icon={<MaterialIcons name='location-city' size={30} />} />
                </View>
                <View style={styles.reportButtonArea}>
                    <TouchableOpacity style={styles.reportButton} onPress={() => this._reportProblem()}>
                        <Text style={styles.reportButtonTitle}>REPORT A NEW PROBLEM</Text>
                        <Octicons name='report' size={30} />
                    </TouchableOpacity>
                </View>
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
    menu: { flex: 3, justifyContent: 'space-around' },
    reportButtonArea: { flex: 1, justifyContent: 'space-around' },
    reportButton: {
        flexDirection: 'row',
        borderRadius: 10,
        padding: 9,
        height: 55,
        width: 300,
        backgroundColor: '#b30b0b',
        borderColor: '#fff',
        justifyContent: 'space-around',
        alignItems: 'center',
        elevation: 2,
        fontSize: 28
    },
    reportButtonTitle: {
        fontSize: 18
    }
});
