import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';

import tick from '../assets/check.png';
import cross from '../assets/close.png';

import * as firebase from "firebase";// Firebase Library
import { firebaseConfig } from "../Firebase_config";// Firebase Library
import "firebase/storage";// Firebase Library
import 'firebase/auth';

export default function add_task_page({ route, navigation }) {

    var data = route.params;

    const [user_name, set_user_name] = React.useState(null);

    const [user_mail, set_user_mail] = React.useState(null);

    const [deadline_expired, set_deadline_expired] = React.useState(false);

    const [task_heading, set_task_heading] = React.useState(null);

    const [task_body, set_task_body] = React.useState(null);

    const [task_deadline, set_task_deadline] = React.useState(null);

    const [task_owner, set_task_owner] = React.useState(null);
    const u = firebase.default.auth().currentUser.uid;
    console.log(u)
    var task = {
        Task_Heading: task_heading,
        Task_Body: task_body,
        Task_Deadline: task_deadline,
        Task_Owner: user_name,
        Task_Owner_ID: u,
    };
    React.useEffect(() => {
        const u = firebase.default.auth().currentUser.uid;
        firebase.default.firestore().collection('users').doc(u).get().then((doc) => {
            if (doc.exists) {
                const n = doc.data().User_Name;
                const e = doc.data().User_Email; //fetching data and storing it
                const b = doc.data().User_Password; //fetching data and storing it
                //const i = doc.data().image_base64_str_Database;

                console.log(n)

                //checking if value = null
                set_user_name(n); //setting heading

                //set_user_name(n);
                //set_user_mail(e);
                //setbodytext(b); //setting body text
                //set_image_base64_str(i);
            }
            else {
                console.log("Data not found!")
            }
        });

        firebase.default
            .firestore()
            .collection("tasks")
            .doc(data.task_id)
            .onSnapshot((doc) => {
                if (doc.exists) {
                    /*const TOI = doc.data().Task_Owner_ID;
                    const uid = firebase.default.auth().currentUser.uid;

                    if (TOI === uid) {
                        set_user_is_task_owner(true);
                    }
                    */

                    const h = doc.data().Task_Heading; //fetching data and storing it
                    const b = doc.data().Task_Body; //fetching data and storing it
                    const d = doc.data().Task_Deadline;
                    const o = doc.data().Task_Owner;



                    console.log(h)

                    if (task_body == null && task_heading == null && task_owner == null && task_deadline == null) {
                        //checking if value = null
                        set_task_body(b);
                        set_task_heading(h);
                        set_task_owner(o);
                        set_task_deadline(d);

                    }
                }
                else {
                    console.log("Data not found!")
                }

            });

    });

    const add_task = () => {
        firebase.default.firestore().collection("tasks").doc(data.task_id).update({
            Task_Heading: task_heading,
            Task_Body: task_body,
            Task_Deadline: task_deadline,
            Task_Owner: user_name,
            Task_Owner_ID: u,
        });

    };
    return (
        <View style={styles.background_container}>
            <View style={styles.main_content}>
                <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 47 }}>
                    <View style={styles.add_task_heading}>
                        <Text style={{ fontSize: 30 }}>Edit Task</Text>

                    </View>
                </View>
                <TouchableOpacity onPress={() => { navigation.openDrawer() }}><Text style={{ fontSize: 20, }}>Open Sidebar</Text></TouchableOpacity>
                <View style={{ width: '100%', marginTop: 30, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={styles.add_task_con}>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>


                            <View style={styles.task_heading_con}>
                                <View style={{ marginLeft: 25 }}>
                                    <Text style={{ fontSize: 18 }}>Task Heading</Text>
                                    <TextInput style={styles.task_heading_input} value={task_heading} onChangeText={(text) => set_task_heading(text)}></TextInput>
                                </View>


                            </View>
                            <View style={styles.task_deadline_con}>
                                <View>
                                    <Text style={{ fontSize: 18 }}>Task Deadline</Text>
                                    <TextInput style={styles.task_deadline_input} value={task_deadline} onChangeText={(text) => set_task_deadline(text)}></TextInput>
                                </View>
                            </View>


                            <View style={styles.task_owner_con}>
                                <View>
                                    <Text style={{ fontSize: 18 }}>Task Owner</Text>
                                    <TextInput style={styles.task_owner_input} editable={false} placeholder={user_name}></TextInput>
                                </View>
                            </View>
                        </View>

                        <View style={styles.task_body_con}>
                            <View style={{}}>
                                <Text style={{ fontSize: 18 }}>Task Body</Text>
                                <TextInput style={styles.task_body_input} multiline={true} value={task_body} onChangeText={(text) => set_task_body(text)}></TextInput>
                            </View>

                        </View>




                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', alignSelf: 'stretch' }}>
                        <View style={{ marginLeft: 900, marginTop: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={add_task}><Image source={tick} style={{ width: 34, height: 34 }} /><Text style={{ color: '#2DFF35', fontSize: 18 }}>Done</Text></TouchableOpacity>
                            <TouchableOpacity onPress={()=>{ navigation.goBack() }} style={{ marginLeft: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}><Image source={cross} style={{ width: 28, height: 28 }} /><Text style={{ color: '#F83C3C', fontSize: 18 }}>Cancel</Text></TouchableOpacity>
                        </View>
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
        height: '100%',
        width: '100%',
    },
    add_task_heading: {
        width: 319,
        height: 65,

        backgroundColor: '#F1FFFB',

        borderRadius: 25,

        alignItems: 'center',
        justifyContent: 'center',
    },
    add_task_con: {
        width: 946,
        height: 400,

        borderRadius: 25,

        backgroundColor: '#F1FFFB',
    },
    task_heading_con: {
        height: 93,

        alignSelf: 'stretch',
        flex: 1,

        marginTop: 20,

        alignItems: 'center',
        justifyContent: 'center',

        //borderColor: 'black',
        //borderWidth: 2,
    },
    task_heading_input: {
        width: 170,
        height: 40,

        borderRadius: 25,

        backgroundColor: '#fff',

        paddingLeft: 14,
        paddingRight: 14,

        alignItems: 'center',
        justifyContent: 'center',

        marginTop: 10,
    },
    task_deadline_con: {
        height: 93,

        alignSelf: 'stretch',
        flex: 1,

        marginTop: 20,

        alignItems: 'center',
        justifyContent: 'center',

        //borderColor: 'black',
        //borderWidth: 2,
    },
    task_deadline_input: {
        width: 170,
        height: 40,

        borderRadius: 25,

        backgroundColor: '#fff',

        paddingLeft: 14,
        paddingRight: 14,

        alignItems: 'center',
        justifyContent: 'center',

        marginTop: 10,
    },
    task_owner_con: {
        height: 93,

        alignSelf: 'stretch',
        flex: 1,

        marginTop: 20,

        alignItems: 'center',
        justifyContent: 'center',

        //borderColor: 'black',
        //borderWidth: 2,
    },
    task_owner_input: {
        width: 170,
        height: 40,

        borderRadius: 25,

        backgroundColor: '#fff',

        paddingLeft: 14,
        paddingRight: 14,

        alignItems: 'center',
        justifyContent: 'center',

        marginTop: 10,
    },
    task_body_con: {
        height: 93,

        alignSelf: 'stretch',
        flex: 1,


        alignItems: 'center',
        justifyContent: 'center',
    },
    task_body_input: {
        width: 780,
        height: 180,

        borderRadius: 25,

        backgroundColor: '#fff',

        paddingLeft: 14,
        paddingRight: 14,
        paddingTop: 10,
        paddingBottom: 10,

        marginTop: 10,

        alignItems: 'center',
        justifyContent: 'center',
    },
})
