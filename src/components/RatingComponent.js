//This is an example code to make a Star Rating Bar //
import React, { Component } from 'react';
//import react in our code.
import { StyleSheet, View, Platform, Text, Image, TouchableOpacity } from 'react-native';
import { HitTestResultTypes } from 'expo/build/AR';
//import all the components we are going to use.

export default class RatingComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            defaultRating: 5,
            //To set the default Star Selected
            maxRating: 5
            //To set the max number of Stars
        };
        //Filled Star. You can also give the path from local
        this.Star = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';

        //Empty Star. You can also give the path from local
        this.Star_With_Border = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';
    }

    updateRating(key) {
        this.props.onRatingSelected(key);
        this.setState({ defaultRating: key });
    }
    render() {
        let React_Native_Rating_Bar = [];
        //Array to hold the filled or empty Stars
        for (var i = 1; i <= this.state.maxRating; i++) {
            React_Native_Rating_Bar.push(
                <TouchableOpacity activeOpacity={0.7} key={i} onPress={this.updateRating.bind(this, i)}>
                    <Image
                        style={styles.StarImage}
                        source={i <= this.state.defaultRating ? { uri: this.Star } : { uri: this.Star_With_Border }}
                    />
                </TouchableOpacity>
            );
        }
        return (
            <View style={styles.MainContainer}>
                <Text style={styles.textStyleSmall}>{"Rate the problem's fix"}</Text>
                {/*View to hold our Stars*/}
                <View style={styles.childView}>{React_Native_Rating_Bar}</View>

                <Text style={styles.textStyle}>
                    {/*To show the rating selected*/}
                    {this.state.defaultRating} / {this.state.maxRating}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Platform.OS === 'ios' ? 20 : 0
    },
    childView: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 10
    },
    StarImage: {
        width: 35,
        height: 35,
        resizeMode: 'cover'
    },
    textStyle: {
        textAlign: 'center',
        fontSize: 20,
        color: '#000',
        marginTop: 10
    },
    textStyleSmall: {
        textAlign: 'center',
        alignSelf: 'flex-start',
        fontSize: 16,
        color: '#000',
        marginTop: 10
    }
});
