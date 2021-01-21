/* eslint-disable react/prop-types */
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { blueJeans, color2 } from './constants';

export default class AttachmentsScreen extends React.Component {
    static navigationOptions = {
        title: 'Attach photos',
        headerStyle: {
            backgroundColor: blueJeans
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    };

    state = {
        images: [],
        pic: null
    };

    render() {
        let { images } = this.state;

        return (
            <View style={{ flex: 1, alignItems: 'stretch' }}>
                <ImageBackground style={styles.backgroundContainer} source={require('../../assets/take_photo.png')}>
                    <View style={styles.sourceButtons}>
                        <TouchableOpacity style={styles.picSourceButton} onPress={this._pickImage}>
                            <Text style={{ color: '#ffff', fontSize: 16 }}>Browse...</Text>
                            <Ionicons name='md-images' size={30} color={'white'} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.picSourceButton} onPress={this._takePhoto}>
                            <Text style={{ color: '#ffff', fontSize: 16 }}>New Photo</Text>
                            <MaterialIcons name='add-a-photo' size={28} color={'white'} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView contentContainerStyle={styles.imageList}>
                        {images.map((image, index) => (
                            <View style={styles.imageRow} key={index}>
                                <Image source={{ uri: image }} style={styles.image} />
                                <TouchableOpacity
                                    style={styles.deleteButton}
                                    onPress={() => {
                                        this._removeImage(index);
                                    }}
                                >
                                    <MaterialIcons name='delete' size={30} />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 25 }}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate('Details');
                                this.props.setProblemImages(images);
                            }}
                            style={styles.confirmButton}
                        >
                            <Text
                                style={{
                                    fontSize: 20,
                                    color: '#fff'
                                }}
                            >
                                Next
                            </Text>
                            <MaterialIcons name='navigate-next' size={35} color='white' />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        );
    }

    componentDidMount() {
        this.getPermissionAsync();
    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    };

    _pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [ 4, 3 ],
                quality: 1
            });
            if (!result.cancelled) {
                const images = this.state.images;
                images.push(result.uri);
                this.setState({ images: images, pic: result });
            }

            console.log(result);
        } catch (e) {
            console.log(e);
        }
    };

    _takePhoto = async () => {
        try {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [ 4, 3 ],
                quality: 1
            });
            if (!result.cancelled) {
                const images = this.state.images;
                images.push(result.uri);
                this.setState({ images: images });
            }

            console.log(result);
        } catch (e) {
            console.log(e);
        }
    };

    _removeImage(index) {
        const { images } = this.state;
        images.splice(index, 1);
        this.setState(images);
    }

    async _sendImage(image) {
        console.log('Image: ' + JSON.stringify(image));
        try {
            const formData = this._createFormData(image);
            console.log('Form data: ' + JSON.stringify(formData));
            await fetch('http://192.168.0.179:8080/problem/image', {
                method: 'POST',
                body: formData
            });
        } catch (e) {
            console.log(e);
        }
    }

    _createFormData(image) {
        const data = new FormData();
        data.append('file', {
            type: 'image/jpg',
            uri: image.uri,
            name: 'problem_image.jpg'
        });
        return data;
    }
}

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageList: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        marginBottom: 80,
        marginTop: 20,
        elevation: 3
    },
    imageRow: {
        margin: 5,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: 300,
        borderBottomWidth: 1,
        borderBottomColor: '#d1d1d1',
        padding: 5
    },
    image: {
        width: 150,
        height: 100
    },
    deleteButton: {
        borderRadius: 30,
        height: 40,
        width: 40,
        backgroundColor: '#cccccc',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3
    },
    picSourceButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: blueJeans,
        borderRadius: 10,
        height: 40,
        width: 150,
        elevation: 3
    },
    sourceButtons: {
        marginTop: 15,
        width: 400,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    confirmButton: {
        borderRadius: 20,
        height: 55,
        width: 150,
        backgroundColor: blueJeans,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        elevation: 3,
        marginTop: 30
    }
});
