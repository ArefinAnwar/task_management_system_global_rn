import { set } from 'mockdate'
import React from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'

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



export default function sign_up_page() {
    const [user_email, set_user_email] = React.useState(null);
    const [password, set_user_password] = React.useState(null);
    const [user_name, set_user_name] = React.useState(null);
    const [user_performance, set_user_performance] = React.useState(null);

    const [user_added, set_user_added] = React.useState(false);

    const add_user = () => {

        firebase.default.auth().createUserWithEmailAndPassword(user_email, password)
            .then(() => {
                console.log('User account created & signed in!');
                set_user_added(true);


                const user = {
                    User_Email: user_email,
                    User_Password: password,
                    User_Name: user_name,
                };


                var main_user_info = firebase.default.auth().currentUser;

                var uid = main_user_info.uid;

                firebase.default.firestore().collection("users").doc(uid).set(user);
            })
            .catch(error => {
                set_user_added(false);
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
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

                <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: '8%', marginBottom: '1%' }}>
                    {(() => {
                        if (user_added) {
                            return (
                                <View style={styles.user_added_feedback}>
                                    <Text style={styles.user_added_feedback_text}>Succesfully Created Account</Text>
                                </View>
                            )
                        }

                    })()}
                    <Text style={styles.create_account_text}>Create Account</Text>
                </View>

                <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: '3%' }}>

                    <TextInput style={styles.email_text} onChangeText={(text) => set_user_name(text)} placeholder='Full Name'>
                    </TextInput>


                    <TextInput style={styles.email_text} onChangeText={(text) => set_user_email(text)} placeholder='Email'>
                    </TextInput>

                    <TextInput style={styles.email_text} onChangeText={(text) => set_user_password(text)} placeholder='Password'>
                    </TextInput>


                    <TouchableOpacity style={styles.submit_button} onPress={add_user}>
                        <Text style={styles.submit_button_text}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    background_container: {
        borderStartColor: 'background_container',
        backgroundColor: '#f7f9fe',
        height: '100%',
        width: '100%',
        fontFamily: 'NotoSans_400Regular',

    },

    main_content: {
        backgroundColor: '#f7f9fe',
        height: '100%',
        width: '100%',

    },

    create_account_text: {
        color: '#231e29',
        fontSize: 45,
        fontWeight: 'bold',


    },
    email_text: {
        width: '30%',


        fontSize: 25,
        color: '#231e29',

        marginTop: '1%',
        marginBottom: '1%',

        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'black',
        paddingLeft: 25,
        paddingTop: 6,
        paddingBottom: 6,

        alignItems: 'center',
        justifyContent: 'center',
    },

    submit_button: {
        width: '15%',
        height: '30%',
        backgroundColor: 'rgba(99,38,240,255)',

        alignItems: 'center',
        justifyContent: 'center',

        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'white',

        marginTop: '2%'
    },
    submit_button_text: {
        color: '#e2d4ff',
        fontWeight: '100',
        fontSize: 25,
    },

    user_added_feedback: {
        height: '60%',
        width: '20%',

        backgroundColor: '#B0DDFD',

        alignItems: 'center',
        justifyContent: 'center',

        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#0676C6',
    },
    user_added_feedback_text: {
        color: '#078EED',
        fontWeight: '100',
        fontSize: 15,
    }
})
