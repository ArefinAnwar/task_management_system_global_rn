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
import Sign_illus from "./components/sign_up_page_illustration";


export default function sign_up_page() {
    const [user_email, set_user_email] = React.useState(null);
    const [user_password, set_user_password] = React.useState('');
    const [user_name, set_user_name] = React.useState(null);
    const [user_performance, set_user_performance] = React.useState(null);



    ///? Flags ///
    const [user_added, set_user_added] = React.useState(false);
    const [password_weak, set_password_weak] = React.useState(false);
    const [user_email_valid, set_user_email_valid] = React.useState(true);
    const [user_exists, set_user_exists] = React.useState(false);
    React.useEffect(() => {
        if (user_password.length >= 6) {
            set_password_weak(false);
        }


    });


    const add_user = () => {

        firebase.default.auth().createUserWithEmailAndPassword(user_email, user_password)
            .then(() => {
                console.log('User account created & signed in!');
                set_user_added(true);


                const user = {
                    User_Email: user_email,
                    User_Password: user_password,
                    User_Name: user_name,
                };


                var main_user_info = firebase.default.auth().currentUser;

                var uid = main_user_info.uid;

                firebase.default.firestore().collection("users").doc(uid).set(user);
            })
            .catch(error => {
                set_user_added(false);
                if (error.code === 'auth/email-already-in-use') {
                    set_user_exists(true);
                }

                else if (error.code === 'auth/invalid-email') {
                    set_user_email_valid(false);
                }

                else if (error.code === 'auth/weak-password') {
                    set_password_weak(true);
                }

                console.error(error);
            });
    };

    return (
        <View style={styles.background_container}>
            <View style={styles.main_content}>
                <View style={styles.sign_up_main_con}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.sign_up_all_con}>
                            <Text style={{ color: '#7FFFDD', fontSize: 36, fontWeight: '400' }}>Task Management</Text>
                            <View>
                                <Text style={{ color: '#7FFFDD', fontSize: 48, fontWeight: 'bold' }}>Create Account</Text>
                            </View>
                            {(() => {
                                if (user_added) {
                                    return (
                                        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                            <View style={{ width: 292, height: 49, backgroundColor: '#'}}>

                                            </View>
                                        </View>

                                    )
                                }
                            })()}
                            <View style={{ marginTop: 40, }}>
                                <Text style={{ fontSize: 20, color: '#7FFFDD', marginLeft: 15, }}>Email</Text>
                                <TextInput style={styles.email_text} onChangeText={(text) => set_user_email(text)} placeholder='Email' >
                                </TextInput>
                                {(() => {
                                    if (user_email_valid === false) {
                                        return (
                                            <Text style={{ color: 'red', marginLeft: 15, }}>Enter a valid email!</Text>
                                        )
                                    }
                                    if (user_exists === true) {
                                        return (
                                            <Text style={{ color: 'red', marginLeft: 15, }}>The email address is already in use by another account!</Text>
                                        )
                                    }
                                })()}
                            </View>

                            <View style={{ marginTop: 20, }}>
                                <Text style={{ fontSize: 20, color: '#7FFFDD', marginLeft: 15, }}>Full Name</Text>
                                <TextInput style={styles.email_text} onChangeText={(text) => set_user_name(text)} placeholder='John Doe'>
                                </TextInput>

                            </View>
                            <View style={{ marginTop: 20, }}>
                                <Text style={{ fontSize: 20, color: '#7FFFDD', marginLeft: 15, }}>Password</Text>
                                <TextInput style={styles.email_text} onChangeText={(text) => set_user_password(text)} placeholder='Password'>
                                </TextInput>
                                {(() => {
                                    if (password_weak) {
                                        return (
                                            <Text style={{ color: 'red', marginLeft: 15, }}>Password should be at least 6 characters!</Text>
                                        )
                                    }
                                })()}
                            </View>
                            <TouchableOpacity style={styles.submit_button} onPress={add_user}>
                                <Text style={{ fontSize: 24, color: 'white' }}>Create Account</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>

                <View style={styles.sign_up_illustration_con}>

                    <View style={{ width: 630, height: 440, alignItems: 'center', justifyContent: 'center' }}>
                        <Sign_illus />
                    </View>

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

        flex: 1,
        flexDirection: 'row',
    },
    sign_up_main_con: {
        backgroundColor: '#fff',
        width: '40%',
        height: '100%',
    },
    sign_up_all_con: {
        width: 357,
        height: 569,

        backgroundColor: '#fff',
        marginTop: 40,
    },

    create_account_text: {
        color: '#231e29',
        fontSize: 45,
        fontWeight: 'bold',


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

        marginTop: '10%',
    },
    sign_up_illustration_con: {
        backgroundColor: '#DAFFEF',
        height: '100%',
        width: '60%',
        alignSelf: 'flex-end',

        alignItems: 'center',
        justifyContent: 'center',
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
