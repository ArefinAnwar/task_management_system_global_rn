import { set } from 'mockdate';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Skeleton from 'react-loading-skeleton';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import * as firebase from "firebase";// Firebase Library
import { firebaseConfig } from "../Firebase_config";// Firebase Library
import "firebase/storage";// Firebase Library
import 'firebase/auth';

//Firebase checking if another app is initialized, if yes use that else create new app
if (!firebase.default.apps.length) {
    firebase.default.initializeApp(firebaseConfig);
} else {
    firebase.default.app(); // if already initialized, use that one
}
//////////////////////////////////////////////////////////////////////////

import Login_illustration from './components/login_page_illustration';

export default function sign_up_page({ navigation }) {
    const [email, set_email] = React.useState(null);
    const [password, set_password] = React.useState(null);

    const [user_added, set_user_added] = React.useState(false);

    const [encountered_error, set_encountered_error] = React.useState(false);  //For detecting any error occured
    //For detecting any error occured

    const [error_mes, set_error_mes] = React.useState(null);



    const user_login = () => {

        firebase.default.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log('User account created & signed in!');
                set_user_added(true);
                var main_user_info = firebase.default.auth().currentUser;

                var uid = main_user_info.uid;
                console.log(uid);
                navigation.navigate('Tasks', {
                    userID: uid,
                });


            })
            .catch(error => {
                if (error.code === 'auth/user-not-found') {
                    console.log('Invalid email or password');
                    set_encountered_error(true);
                    set_error_mes('Invalid email or password!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.error(error);
            });
    };



    return (
        <View style={styles.background_container}>
            <View style={styles.main_content}>
                <View style={styles.login_main_con}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.login_all_content_inner_con}>
                            <Text style={{ color: '#7FFFDD', fontSize: 36, fontWeight: '400' }}>Task Management</Text>
                            <View>
                                <Text style={{ color: '#7FFFDD', fontSize: 64, fontWeight: 'bold' }}>Login</Text>
                            </View>

                            <View style={{ marginTop: 40, }}>
                                <Text style={{ fontSize: 20, color: '#7FFFDD', marginLeft: 15, }}>Email</Text>
                                <TextInput style={styles.email_text} onChangeText={(text) => set_email(text)} placeholder='Email' >
                                </TextInput>
                            </View>

                            <View style={{ marginTop: 20, }}>
                                <Text style={{ fontSize: 20, color: '#7FFFDD', marginLeft: 15, }}>Password</Text>
                                <TextInput style={styles.email_text} onChangeText={(text) => set_password(text)} placeholder='Password'>
                                </TextInput>
                            </View>

                            <TouchableOpacity style={styles.submit_button} onPress={user_login}>
                                <Text style={{ fontSize: 24, color: 'white' }}>Login</Text>
                            </TouchableOpacity>
                            <View style={{
                                width: 292, height: 49, alignItems: 'center', justifyContent: 'center'
                            }}>
                                <Text style = {{ color: '#7FFFDD', fontSize: 16, fontWeight: 'bold'}}>Don't have an account yet?<TouchableOpacity onPress = {()=> {navigation.navigate('Sign-up')}}><Text style = {{color: '#00F0FF', fontSize: 16}}> Sign up</Text></TouchableOpacity></Text>
                                
                            </View>

                        </View>
                    </View>


                </View>
                <View style={styles.login_illustration_con}>

                    <View style={{ width: 630, height: 440, alignItems: 'center', justifyContent: 'center' }}>
                        <Login_illustration />
                    </View>

                </View>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    background_container: {
        borderStartColor: 'background_container',
        backgroundColor: '#fff',
        height: '100%',
        width: '100%',
    },

    main_content: {
        backgroundColor: '#fff',


        flex: 1,
        flexDirection: 'row',
    },
    login_main_con: {
        backgroundColor: '#fff',
        height: '100%',
        width: '40%',
    },
    login_illustration_con: {
        backgroundColor: '#DAFFEF',
        height: '100%',
        width: '60%',
        alignSelf: 'flex-end',

        alignItems: 'center',
        justifyContent: 'center',
    },
    login_all_content_inner_con: {
        height: 480,
        width: 316,

        alignSelf: 'center',
        justifyContent: 'center',

        marginTop: 60,
    },
    email_text: {
        width: 292,
        height: 49,


        fontSize: 15,
        //color: '',

        marginTop: '1%',
        marginBottom: '1%',

        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#D2D2D2',
        paddingLeft: 25,
        paddingTop: 5,
        paddingBottom: 5,

        alignItems: 'center',
        justifyContent: 'center',


    },
    submit_button: {
        width: 292,
        height: 49,
        backgroundColor: '#7FFFDD',

        alignItems: 'center',
        justifyContent: 'center',

        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'white',

        marginTop: '20%',
    },
})
