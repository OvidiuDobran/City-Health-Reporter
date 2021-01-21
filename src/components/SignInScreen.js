/* eslint-disable react/prop-types */
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground } from 'react-native';
import { Overlay, SocialIcon } from 'react-native-elements';
import { blueJeans } from './constants';

const FAIL_REASON = { CONNECTION_ERROR: 'Connection Error', NO_ACCOUNT: 'Accound not found', NONE: 'NONE' };

export default class SignInScreen extends React.Component {
    static navigationOptions = {
        title: 'Please sign in',
        headerStyle: {
            backgroundColor: blueJeans
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    };

    constructor() {
        super();
        this.state = { failReason: FAIL_REASON.NONE };
    }

    _signInAsync = async () => {
        const loginResponse = await this._fetchAuthenticatingCitizen(this.email, this.password);
        if (loginResponse.status == 200) {
            const citizen = loginResponse.responseData;
            this.props.login(citizen);
            this.props.navigation.navigate('ReportingApp');
        } else if (!loginResponse || loginResponse.status == 403) {
            this.setState({ failReason: FAIL_REASON.NO_ACCOUNT });
        }
    };

    _fetchAuthenticatingCitizen = async (email, password) => {
        let loginForm = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        };
        try {
            const response = await fetch('http://192.168.0.179:8080/session/login/citizen', loginForm);
            if (response.status != 200) {
                return { status: response.status };
            }
            const responseData = await response.json();
            return { status: response.status, responseData };
        } catch (error) {
            return null;
        }
    };

    _updateEmail(text) {
        this.email = text;
    }

    _updatePassword(text) {
        this.password = text;
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground
                    source={require('../../assets/signin_background.png')}
                    style={styles.backgroundContainer}
                >
                    <TextInput
                        style={styles.input}
                        keyboardType='email-address'
                        placeholder='Email'
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
                        placeholder='Password'
                        onChangeText={(text) => this._updatePassword(text)}
                        onSubmitEditing={() => this._signInAsync()}
                        ref={(input) => {
                            this.passwordInput = input;
                        }}
                    />

                    <TouchableOpacity onPress={() => this._signInAsync()} style={styles.signInButton}>
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Sign in</Text>
                    </TouchableOpacity>

                    {/* <TouchableOpacity>
                        <SocialIcon
                            title='Sign In With Facebook'
                            button
                            type='facebook'
                            width={250}
                            style={{ borderRadius: 10, marginTop: 20, marginBottom: 10 }}
                        />
                    </TouchableOpacity> */}

                    <Overlay
                        isVisible={this.state.failReason != FAIL_REASON.NONE}
                        width={300}
                        height={70}
                        overlayStyle={styles.overlayStyle}
                    >
                        <View>
                            <Text>{this.state.failReason}</Text>
                            <TouchableOpacity
                                onPress={() => this.setState({ failReason: FAIL_REASON.NONE })}
                                style={styles.okButton}
                            >
                                <Text style={{ color: '#34a4eb', fontSize: 18, fontWeight: 'bold' }}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </Overlay>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch'
        // justifyContent: 'stretch'
    },
    backgroundContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    input: {
        fontSize: 18,
        height: 40,
        width: 280,
        borderBottomWidth: 3,
        borderBottomColor: 'gray',
        margin: 1
    },
    signInButton: {
        width: 120,
        height: 50,
        backgroundColor: blueJeans,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        elevation: 3,
        marginBottom: 40
    },
    okButton: {
        width: 40,
        height: 20,
        backgroundColor: 'white'
    },
    overlayStyle: { justifyContent: 'space-between' }
});
