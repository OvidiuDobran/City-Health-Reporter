import React from 'react';
import {
    KeyboardAvoidingView,
    AsyncStorage,
    Button,
    TextInput,
    StyleSheet,
    View,
    TouchableOpacity,
    Text
} from 'react-native';
import Citizen from '../data/Citizen';
import CITIZENS from '../data/citizens-mock';

export default class SignInScreen extends React.Component {
    static navigationOptions = {
        title: 'Please sign in'
    };

    _signInAsync = () => {
        const citizen = this.getAuthenticatingCitizen(this.email, this.password);
        if (citizen) {
            this.props.login(citizen);
            // console.log('Wlecome back, ' + this.props.store.state.citizen.firstName() + ' ' + this.props.citizen.lastName());
            //await AsyncStorage.setItem('userToken', 'abc');
            this.props.navigation.navigate('ReportingApp');
        } else {
            console.log('NO ACCOUNT FOUND');
        }
    };

    getAuthenticatingCitizen(email, password) {
        const mockedCitizen = CITIZENS.find((obj) => obj.email === email && obj.password === password);
        if (mockedCitizen) {
            return new Citizen(mockedCitizen.id, mockedCitizen.firstName, mockedCitizen.lastName, mockedCitizen.email);
        }
        return null;
    }

    _updateEmail(text) {
        this.email = text;
    }

    _updatePassword(text) {
        this.password = text;
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
                <View style={styles.container}>
                    <TextInput
                        style={styles.input}
                        keyboardType='email-address'
                        placeholder='email'
                        autoFocus={true}
                        returnKeyType={'next'}
                        onChangeText={(text) => this._updateEmail(text)}
                        onSubmitEditing={() => {
                            this.passwordInput.focus();
                        }}
                        blurOnSubmit={false}
                    />
                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        placeholder='password'
                        onChangeText={(text) => this._updatePassword(text)}
                        onSubmitEditing={() => this._signInAsync()}
                        ref={(input) => {
                            this.passwordInput = input;
                        }}
                    />

                    <TouchableOpacity style={styles.signInButton}>
                        <Button title='Sign in' onPress={() => this._signInAsync()} />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        fontSize: 18,
        height: 40,
        width: 280,
        borderBottomWidth: 3,
        borderBottomColor: 'gray',
        margin: 1
    },
    signInButton: { marginTop: 10 }
});
