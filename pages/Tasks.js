import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import * as firebase from "firebase";// Firebase Library
import { firebaseConfig } from "../Firebase_config";// Firebase Library
import "firebase/storage";// Firebase Library
import 'firebase/auth';

export default function Tasks({navigation}) {
    const [task_list, set_task_list] = React.useState([]); //for storing all recipe data

    var temporary_task_list = []; //temporary storing recipe data

    const [meeting_list, set_meeting_list] = React.useState([]); //for storing all recipe data

    const [user_name_with_hello, set_user_name_with_hello] = React.useState(null);

    const [user_name, set_user_name] = React.useState(null);

    const [user_mail, set_user_mail] = React.useState(null);

    const [task_heading, set_task_heading] = React.useState(null);

    const [task_body, set_task_body] = React.useState(null);

    const [task_deadline, set_task_deadline] = React.useState(null);
    React.useEffect(() => {
        firebase.default
            .firestore()
            .collection("tasks")
            .get().then((querySnapshot) => {
                querySnapshot.forEach((doucument) => {
                    const d = doucument.data();
                    temporary_task_list.push(d); //pushing data to temporary list
                });

                if (task_list.length == 0) { //checking if recipe list == null 
                    set_task_list(temporary_task_list);  //we are pushing data from temp list to final recipe list
                    console.log(task_list);
                }
            });
        console.log(task_list);
        /*
        firebase.default.firestore().collection('tasks').get().then((doc) => {
            
                var t_h = doc.data().Task_Heading;
                var t_b = doc.data().Task_Body;
                var t_d = doc.data().Task_Deadline;

                //const i = doc.data().image_base64_str_Database;

               

                //checking if value = null
                set_task_heading(t_h); //setting heading
                set_task_body(t_b); //setting Body
                set_task_deadline(t_d); //setting Deadline
                //setbodytext(b); //setting body text
                //set_image_base64_str(i);
                console.log(doc);
        });*/
        /*
        firebase.default.firestore().collection('users').doc(data.userID).get().then((doc) => {
            if (doc.exists) {
                const n = doc.data().User_Name;
                const e = doc.data().User_Email; //fetching data and storing it
                const b = doc.data().User_Password; //fetching data and storing it

                //const i = doc.data().image_base64_str_Database;

                console.log(n)

                //checking if value = null
                set_user_name_with_hello('Hello, ' + n); //setting heading
                set_user_name(n);
                set_user_mail(e);
                //setbodytext(b); //setting body text
                //set_image_base64_str(i);
            }
            else {
                console.log("Data not found!")
            }
        });*/
    });

    return (
        <View style={styles.background_container}>
            <View style={styles.main_content}>
                <View style={{ marginTop: 50, width: '100%', alignItems: 'center', justifyContent: 'center', }}>
                    <Text style={{ fontSize: 30 }}>Task Management</Text>
                    <TouchableOpacity onPress = {() => { navigation.navigate('Add Task') }}>Add Task</TouchableOpacity>
                </View>
                <FlatList
                    data={task_list}
                    renderItem={({ item }) =>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <View style={styles.task_main_con}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: '50%' }}>
                                        <Text style={styles.task_heading}>{item.Task_Heading}</Text>
                                    </View>

                                    <View style={styles.task_owner}>
                                        <Text style={{ fontSize: 18, color: 'white' }}>{item.Task_Owner}</Text>
                                    </View>
                                </View>


                                <View style={{ height: 148, width: 670 }}>
                                    <Text style={styles.task_body} numberOfLines = {6}>{item.Task_Body}</Text>
                                </View>

                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity style={styles.view_task_but} onPress={() => {

                                        console.log(item.Id)
                                        navigation.navigate("View Tasks", {
                                            data: item.Id,
                                        });
                                    }}>
                                        <Text style={{ color: 'white', fontSize: 18 }}>View Task</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.task_status_but}>
                                        <Text style={{ color: 'white', fontSize: 18 }}>Ongoing</Text>
                                    </TouchableOpacity>

                                    <View style={styles.task_deadline}>
                                        <Text style={{ fontSize: 18 }}>Deadline: {item.Task_Deadline}</Text>
                                    </View>
                                </View>

                            </View>
                        </View>


                    }
                    keyExtractor={(item) => item.Id}
                />

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
        fontFamily: 'NotoSans_400Regular',

    },
    main_content: {
        backgroundColor: '#fff',
        height: '100%',
        width: '100%',


    },

    task_main_con: {
        height: 325,
        width: 719,
        backgroundColor: '#E8FFF9',

        marginLeft: 323,
        marginTop: 100,

        borderRadius: 25,

        shadowColor: "rgba(0,0,0, .3)", // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 10, //IOS
        elevation: 2, // Android
    },
    task_heading: {
        marginLeft: 30,
        marginTop: 23,
        fontSize: 24,
    },
    task_body: {
        marginLeft: 30,
        marginTop: 23,
        fontSize: 16,
    },
    view_task_but: {
        width: 145,
        height: 40,

        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: '#E94CEC',

        marginTop: 45,
        marginLeft: 30,
        borderRadius: 25,
    },
    task_status_but: {
        width: 124,
        height: 40,

        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: '#967CE2',

        marginTop: 45,
        marginLeft: 25,
        borderRadius: 25,
    },
    task_deadline: {
        width: 200,
        height: 40,

        alignItems: 'center',
        justifyContent: 'center',

        marginTop: 45,
        marginLeft: 150,
    },
    task_owner: {
        width: 200,
        height: 40,

        marginLeft: 125,
        marginTop: 23,
        borderRadius: 25,

        backgroundColor: '#6AFFAF',

        alignItems: 'center',
        justifyContent: 'center',
    }
})