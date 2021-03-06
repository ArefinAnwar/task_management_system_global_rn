import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';

import * as firebase from "firebase";// Firebase Library
import { firebaseConfig } from "../Firebase_config";// Firebase Library
import "firebase/storage";// Firebase Library
import 'firebase/auth';

import moment from 'moment';

import tick from '../assets/check.png';
import cross from '../assets/close.png';

import delete_illus from '../assets/delete.png';
import edit from '../assets/edit.png';

import done_task_illus from '../assets/Done Task.png';
import cancel_task_illus from '../assets/Cancel Task.png';
import task_done_illus from '../assets/Task is Done.png';


export default function view_task_page({ route, navigation }) {


    var data = route.params;



    //? Flags /////

    const [user_is_task_owner, set_user_is_task_owner] = React.useState(false);

    const [deadline_expired, set_deadline_expired] = React.useState(false);

    const [user_task_done, set_user_task_done] = React.useState(false);

    const [task_data_received, set_task_data_received] = React.useState(false);

    //? End Flags /////



    const [user_name, set_user_name] = React.useState(""); //User Data



    //? Task Data ////
    const [task_heading, set_task_heading] = React.useState(null);

    const [task_body, set_task_body] = React.useState(null);

    const [task_deadline, set_task_deadline] = React.useState(null);

    const [submission_date_international, set_submission_date_international] = React.useState("");

    const [task_owner, set_task_owner] = React.useState(null);

    const [t_id, set_t_id] = React.useState(null);

    //? End Task Data ////



    //console.log(data.data);
    var task = {
        Task_Heading: task_heading,
        Task_Body: task_body,
        Task_Deadline: task_deadline,
        Task_Owner: firebase.default.auth().currentUser,
    };
    const [done_by_list, set_done_by_list] = React.useState([]); //for storing all recipe data

    var temporary_done_by_list = []; //temporary storing recipe data
    var time = new Date();
    //console.log(
    //     time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    //);

    //console.log(k);

    const task_is_done = () => {

        var k = new Date();
        //console.log(k);
        var today = new Date();

        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        var today = dd + '/' + mm + '/' + yyyy;

        var time = new Date();



        var current_time = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })

        firebase.default
            .firestore()
            .collection("tasks")
            .doc(t_id)
            .collection('Done_By')
            .doc(user_name)

            .set({
                Name: user_name,
                Submission_Date: today,
                Submission_Time: current_time,
                Submission_Date_International: k,
            }).then(() => { set_user_task_done(true) })
    };

    const will_not_do_task = () => {

        firebase.default
            .firestore()
            .collection("tasks")
            .doc(t_id)
            .collection('Done_By')
            .doc(user_name)

            .delete().then(() => { set_user_task_done(false) });
    };
    React.useEffect(() => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = dd + '/' + mm + '/' + yyyy;
        console.log("Curren date", today);

        var date = task_deadline;

        console.log("Task Deadline:", date);

        console.log("Function is running!");
        //console.log(moment(date, "DD/MM/YYYY").isSame(moment(today, "DD/MM/YYYY")));
        if (moment(date, "DD/MM/YYYY").isSame(moment(today, "DD/MM/YYYY"))) {
            set_deadline_expired(true);
            console.log("Is a", deadline_expired);
        }
        else if (moment(date, "DD/MM/YYYY").isBefore(moment(today, "DD/MM/YYYY"))) {
            set_deadline_expired(true);
            console.log("Is a", deadline_expired);
        }
        else if (moment(date, "DD/MM/YYYY").isAfter(moment(today, "DD/MM/YYYY"))) {
            set_deadline_expired(false);
            console.log("Is a", deadline_expired);
        }
        else {
            set_deadline_expired(false);
            console.log("Is a", deadline_expired);
        }
        const v = firebase.default.auth().currentUser.uid;

        console.log("Data fetching")
        //////////////////////////? User Data ///////////////////////////////
        firebase.default.firestore().collection('users').doc(v).get().then((doc) => {
            if (doc.exists) {
                const n = doc.data().User_Name;
                const e = doc.data().User_Email; //fetching data and storing it
                const b = doc.data().User_Password; //fetching data and storing it
                //const i = doc.data().image_base64_str_Database;

                //console.log(n)

                //checking if value = null
                if (user_name == "") {
                    set_user_name(n); //setting heading
                };


                //set_user_name(n);
                //set_user_mail(e);
                //setbodytext(b); //setting body text
                //set_image_base64_str(i);
            }
            else {
                console.log("Data not found!")
            }
        });

        //////////////////////////? End User Data ///////////////////////////////



        //////////////////////////? Task Data ///////////////////////////////
        firebase.default
            .firestore()
            .collection("tasks")
            .doc(data.data)
            .onSnapshot((doc) => {
                if (doc.exists) {
                    const TOI = doc.data().Task_Owner_ID;
                    const uid = firebase.default.auth().currentUser.uid;

                    if (TOI === uid) {
                        set_user_is_task_owner(true);
                    }

                    const h = doc.data().Task_Heading; //fetching data and storing it
                    const b = doc.data().Task_Body; //fetching data and storing it
                    const o = doc.data().Task_Owner;
                    const d = doc.data().Task_Deadline;
                    const td = doc.data().Id;  //Temporary storing task ID

                    var today = new Date();
                    var dd = String(today.getDate()).padStart(2, '0');
                    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                    var yyyy = today.getFullYear();

                    today = dd + '/' + mm + '/' + yyyy;
                    //console.log("Curren date", today);

                    var date = task_deadline;

                    //console.log(date);


                    //console.log(h)

                    if (task_body == null && task_heading == null && task_owner == null && t_id == null && task_deadline == null) {
                        //checking if value = null
                        set_task_body(b);
                        set_task_heading(h);
                        set_task_owner(o);
                        set_task_deadline(d);
                        set_t_id(td); //Storing task ID

                        set_task_data_received(true);

                    };

                }
                else {
                    console.log("Data not found!")
                }

            });
        //////////////////////////? End Task Data ///////////////////////////////



        //////////////////////////? Done Data ///////////////////////////////
        firebase.default
            .firestore()
            .collection("tasks")
            .doc(data.data)
            .collection('Done_By')
            .get().then((querySnapshot) => {
                querySnapshot.forEach((doucument) => {
                    const d = doucument.data();
                    temporary_done_by_list.push(d); //pushing data to temporary list
                });

                if (done_by_list.length == 0) { //checking if recipe list == null 
                    set_done_by_list(temporary_done_by_list);  //we are pushing data from temp list to final recipe list
                    //console.log(done_by_list);
                }
            });
        //console.log(done_by_list);

        if (task_data_received && user_name !== "") {
            firebase.default
                .firestore()
                .collection("tasks")
                .doc(t_id)
                .collection('Done_By')
                .doc(user_name)
                .get()
                .then((doc) => {
                    if (doc.exists) {
                        const h = doc.data().Submission_Date_International; //fetching data and storing it
                        // console.log(h);
                        set_user_task_done(true);





                        //console.log('Exists');
                    }
                    else {
                        set_user_task_done(false);
                        //constconsole.log('Does not exist!')
                    };

                }).catch((e) => {
                    console.log(e);
                });
            navigation.setOptions({
                title: task_heading,
            });

        };



        //////////////////////////? End Done Data ///////////////////////////////

    }
    );




    const delete_task = () => {
        navigation.navigate('Tasks');
        firebase.default.firestore().collection("tasks").doc(data.data).delete();
        firebase.default.firestore().collection('tasks').doc(data.data).collection('Done_By').get().then((doc) => {

        })
    };

    const cancel_task_illus_url = { uri: 'https://firebasestorage.googleapis.com/v0/b/hr-management-system-ade34.appspot.com/o/Cancel%20Task.png?alt=media&token=c55ae805-feb7-4ac6-9ff5-1637e79391e4' };

    return (
        <View style={styles.background_container}>
            <View style={styles.main_content}>
                <View style={{ width: '100%', flexDirection: 'row' }}>

                    {(() => {
                        if (deadline_expired === false) {
                            return (
                                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', marginTop: 25 }}>
                                    <View style={{ flex: 1, alignSelf: 'stretch', /*borderWidth: 5, borderColor: 'black',*/ justifyContent: 'center' }}>
                                        <View style={styles.ongoing_task}>
                                            <Text style={{ color: 'white', fontSize: 18, }}>Ongoing</Text>

                                        </View>
                                    </View>

                                    <View style={{ flex: 1, alignSelf: 'stretch', /*borderWidth: 5, borderColor: 'black',*/ alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 30, }}>{task_heading}</Text>
                                    </View>

                                    <View style={{ flex: 1, alignSelf: 'stretch', /*borderWidth: 5, borderColor: 'black',*/ alignItems: 'flex-start', justifyContent: 'center' }}>
                                        <View style={styles.task_owner}>
                                            <Text style={{ color: 'white', fontSize: 18 }}>Owner: {task_owner}</Text>
                                        </View>
                                    </View>

                                </View>
                            )
                        }

                        else if (deadline_expired === true) {
                            return (
                                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', marginTop: 25 }}>
                                    <View style={{ flex: 1, alignSelf: 'stretch', /*borderWidth: 5, borderColor: 'black',*/ justifyContent: 'center' }}>
                                        <View style={styles.deadline_expired}>
                                            <Text style={{ color: 'white', fontSize: 18, }}>Deadline Expired</Text>

                                        </View>
                                    </View>

                                    <View style={{ flex: 1, alignSelf: 'stretch', /*borderWidth: 5, borderColor: 'black',*/ alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 30, }}>{task_heading}</Text>
                                    </View>

                                    <View style={{ flex: 1, alignSelf: 'stretch', /*borderWidth: 5, borderColor: 'black',*/ alignItems: 'flex-start', justifyContent: 'center' }}>
                                        <View style={styles.task_owner}>
                                            <Text style={{ color: 'white', fontSize: 18 }}>Owner: {task_owner}</Text>
                                        </View>
                                    </View>

                                </View>

                            )
                        }
                    })()}

                </View>


                <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={styles.task_body_con}>
                        <ScrollView>
                            <Text style={{ fontSize: 18, marginLeft: 30, marginRight: 30, marginTop: 30 }}>{task_body}</Text>
                        </ScrollView>

                    </View>

                    <View style={{ width: '100%', flexDirection: 'row', marginTop: -10, alignItems: 'center', justifyContent: 'center' }}>
                        {(() => {
                            if (deadline_expired === false) {
                                if (user_is_task_owner) {
                                    return (
                                        <View style={{ flexDirection: 'row', width: '80%', alignItems: 'center', justifyContent: 'center' }}>
                                            <View style={{ flexDirection: 'row', width: 1117, }}>
                                                <TouchableOpacity onPress={() => { navigation.navigate('Edit Task', { task_id: t_id }) }}><Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/hr-management-system-ade34.appspot.com/o/edit.png?alt=media&token=20cfdf05-957e-4b2d-bea8-24a636bf02c1' }} style={{ width: 174, height: 132, marginTop: 30, borderWidth: 1, borderColor: '#BCBCBC', borderRadius: 25, }} /></TouchableOpacity>

                                                <TouchableOpacity onPress={delete_task} ><Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/hr-management-system-ade34.appspot.com/o/delete.png?alt=media&token=6a03edea-d886-493d-985f-33ec311209a0' }} style={{ width: 174, height: 132, marginLeft: 30, marginTop: 30, borderWidth: 1, borderColor: '#BCBCBC', borderRadius: 25, }} /></TouchableOpacity>

                                                {(() => {
                                                    if (user_task_done) {
                                                        return (
                                                            <View style={{ flexDirection: 'row', width: '63%', alignItems: 'center', justifyContent: 'flex-end' }}>
                                                                <Image source={task_done_illus} style={{ width: 174, height: 132, marginTop: 30, marginRigth: 20, borderWidth: 1, borderColor: '#BCBCBC', borderRadius: 25, alignSelf: 'flex-end' }} />
                                                                <TouchableOpacity style={styles.not_done_task} onPress={will_not_do_task}>
                                                                    <Image source={cancel_task_illus_url} style={{ width: 174, height: 132, marginTop: 30, borderWidth: 1, borderColor: '#BCBCBC', borderRadius: 25, alignSelf: 'flex-end' }} />
                                                                </TouchableOpacity>
                                                            </View>

                                                        )
                                                    };
                                                    if (user_task_done === false) {
                                                        return (
                                                            <View style={{ flexDirection: 'row', width: '62%', alignItems: 'center', justifyContent: 'flex-end' }}>
                                                                <TouchableOpacity style={styles.done_task} onPress={task_is_done}>
                                                                    <Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/hr-management-system-ade34.appspot.com/o/Done%20Task.png?alt=media&token=98b96f15-73c9-4be0-a05c-bf57bfc0ffc9' }} style={{ width: 174, height: 132, marginTop: 30, borderWidth: 1, borderColor: '#BCBCBC', borderRadius: 25, alignSelf: 'flex-end' }} />
                                                                </TouchableOpacity>
                                                            </View>
                                                        )
                                                    };
                                                })()}

                                            </View>

                                        </View>


                                    )
                                }
                                else {
                                    return (
                                        <View style={{ flexDirection: 'row', width: '80%', alignItems: 'center', justifyContent: 'center' }}>
                                            <View style={{ flexDirection: 'row', width: 1117, }}>
                                                <View><Image style={{ width: 174, height: 132, marginTop: 30, }} /></View>

                                                <View><Image style={{ width: 174, height: 132, marginLeft: 30, marginTop: 30, }} /></View>

                                                {(() => {
                                                    if (user_task_done) {
                                                        return (
                                                            <View style={{ flexDirection: 'row', width: '63%', alignItems: 'center', justifyContent: 'flex-end' }}>
                                                                <Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/hr-management-system-ade34.appspot.com/o/Task%20is%20Done.png?alt=media&token=f2b9d1ae-ad52-46ae-8af7-3312179b1b8e' }} style={{ width: 174, height: 132, marginTop: 30, marginRigth: 20, borderWidth: 1, borderColor: '#BCBCBC', borderRadius: 25, alignSelf: 'flex-end' }} />
                                                                <TouchableOpacity style={styles.not_done_task} onPress={will_not_do_task}>
                                                                    <Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/hr-management-system-ade34.appspot.com/o/Cancel%20Task.png?alt=media&token=c55ae805-feb7-4ac6-9ff5-1637e79391e4' }} style={{ width: 174, height: 132, marginTop: 30, borderWidth: 1, borderColor: '#BCBCBC', borderRadius: 25, alignSelf: 'flex-end' }} />
                                                                </TouchableOpacity>
                                                            </View>

                                                        )
                                                    };
                                                    if (user_task_done === false) {
                                                        return (
                                                            <View style={{ flexDirection: 'row', width: '62%', alignItems: 'center', justifyContent: 'flex-end' }}>
                                                                <TouchableOpacity style={styles.done_task} onPress={task_is_done}>
                                                                    <Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/hr-management-system-ade34.appspot.com/o/Done%20Task.png?alt=media&token=98b96f15-73c9-4be0-a05c-bf57bfc0ffc9' }} style={{ width: 174, height: 132, marginTop: 30, borderWidth: 1, borderColor: '#BCBCBC', borderRadius: 25, alignSelf: 'flex-end' }} />
                                                                </TouchableOpacity>
                                                            </View>
                                                        )
                                                    };
                                                })()}


                                            </View>

                                        </View>



                                    )
                                };
                            }
                            
                            else { //deadline expired case
                                if (user_is_task_owner) {
                                    return (
                                        <View style={{ flexDirection: 'row', width: '80%', alignItems: 'center', justifyContent: 'center' }}>
                                            <View style={{ flexDirection: 'row', width: 1117, }}>
                                                <TouchableOpacity onPress={() => { navigation.navigate('Edit Task', { task_id: t_id }) }}><Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/hr-management-system-ade34.appspot.com/o/edit.png?alt=media&token=20cfdf05-957e-4b2d-bea8-24a636bf02c1' }} style={{ width: 174, height: 132, marginTop: 30, borderWidth: 1, borderColor: '#BCBCBC', borderRadius: 25, }} /></TouchableOpacity>

                                                <TouchableOpacity onPress={delete_task} ><Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/hr-management-system-ade34.appspot.com/o/delete.png?alt=media&token=6a03edea-d886-493d-985f-33ec311209a0' }} style={{ width: 174, height: 132, marginLeft: 30, marginTop: 30, borderWidth: 1, borderColor: '#BCBCBC', borderRadius: 25, }} /></TouchableOpacity>

                                                {(() => {
                                                    if (user_task_done) {
                                                        return (
                                                            <View style={{ flexDirection: 'row', width: '63%', alignItems: 'center', justifyContent: 'flex-end' }}>
                                                                <Image source={task_done_illus} style={{ width: 174, height: 132, marginTop: 30, marginRigth: 20, borderWidth: 1, borderColor: '#BCBCBC', borderRadius: 25, alignSelf: 'flex-end', opacity: 0.5 }} />
                                                                <View style={styles.not_done_task} >
                                                                    <Image source={cancel_task_illus_url} style={{ width: 174, height: 132, marginTop: 30, borderWidth: 1, borderColor: '#BCBCBC', borderRadius: 25, alignSelf: 'flex-end', opacity: 0.5 }} />
                                                                </View>
                                                            </View>

                                                        )
                                                    };
                                                    if (user_task_done === false) {
                                                        return (
                                                            <View style={{ flexDirection: 'row', width: '62%', alignItems: 'center', justifyContent: 'flex-end' }}>
                                                                <View style={styles.done_task} >
                                                                    <Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/hr-management-system-ade34.appspot.com/o/Done%20Task.png?alt=media&token=98b96f15-73c9-4be0-a05c-bf57bfc0ffc9' }} style={{ width: 174, height: 132, marginTop: 30, borderWidth: 1, borderColor: '#BCBCBC', borderRadius: 25, alignSelf: 'flex-end', opacity: 0.5 }} />
                                                                </View>
                                                            </View>
                                                        )
                                                    };
                                                })()}

                                            </View>

                                        </View>


                                    )
                                }
                                else { //For random user case
                                    return (
                                        <View style={{ flexDirection: 'row', width: '80%', alignItems: 'center', justifyContent: 'center' }}>
                                            <View style={{ flexDirection: 'row', width: 1117, }}>
                                                <View><Image style={{ width: 174, height: 132, marginTop: 30, }} /></View>

                                                <View><Image style={{ width: 174, height: 132, marginLeft: 30, marginTop: 30, }} /></View>

                                                {(() => {
                                                    if (user_task_done) {
                                                        return (
                                                            <View style={{ flexDirection: 'row', width: '63%', alignItems: 'center', justifyContent: 'flex-end' }}>
                                                                <Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/hr-management-system-ade34.appspot.com/o/Task%20is%20Done.png?alt=media&token=f2b9d1ae-ad52-46ae-8af7-3312179b1b8e' }} style={{ width: 174, height: 132, marginTop: 30, marginRigth: 20, borderWidth: 1, borderColor: '#BCBCBC', borderRadius: 25, alignSelf: 'flex-end', opacity: 0.5 }} />
                                                                <View style={styles.not_done_task} >
                                                                    <Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/hr-management-system-ade34.appspot.com/o/Cancel%20Task.png?alt=media&token=c55ae805-feb7-4ac6-9ff5-1637e79391e4' }} style={{ width: 174, height: 132, marginTop: 30, borderWidth: 1, borderColor: '#BCBCBC', borderRadius: 25, alignSelf: 'flex-end' , opacity: 0.5}} />
                                                                </View>
                                                            </View>

                                                        )
                                                    };
                                                    if (user_task_done === false) {
                                                        return (
                                                            <View style={{ flexDirection: 'row', width: '62%', alignItems: 'center', justifyContent: 'flex-end' }}>
                                                                <View style={styles.done_task} onPress={task_is_done}>
                                                                    <Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/hr-management-system-ade34.appspot.com/o/Done%20Task.png?alt=media&token=98b96f15-73c9-4be0-a05c-bf57bfc0ffc9' }} style={{ width: 174, height: 132, marginTop: 30, borderWidth: 1, borderColor: '#BCBCBC', borderRadius: 25, alignSelf: 'flex-end' , opacity: 0.5}} />
                                                                </View>
                                                            </View>
                                                        )
                                                    };
                                                })()}


                                            </View>

                                        </View>



                                    )
                                };
                            }
                        })()}


                    </View>
                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', width: 84, height: 25, borderRadius: 25, backgroundColor: '#7FFFDD' }} onPress={() => { navigation.navigate('Task Done By', { data: t_id }) }}><Text style={{ color: 'white', fontSize: 12 }}>Task Done By</Text></TouchableOpacity>


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
    ongoing_task: {
        width: 124,
        height: 40,

        backgroundColor: '#2DFF35',

        marginLeft: 128,
        borderRadius: 25,

        alignItems: 'center',
        justifyContent: 'center',
    },
    deadline_expired: {
        width: 212,
        height: 40,

        backgroundColor: '#F83C3C',

        borderRadius: 25,
        marginLeft: 120,

        alignItems: 'center',
        justifyContent: 'center',
    },
    task_owner: {
        width: 273,
        height: 40,

        backgroundColor: '#6AFFAF',

        marginLeft: 50,
        borderRadius: 25,

        alignItems: 'center',
        justifyContent: 'center',
    },
    task_body_con: {
        width: 1117,
        height: 350,

        backgroundColor: '#E8FFF9',


        marginTop: 10,
        borderRadius: 25,

    },
    done_task: {
        height: 40,
        width: 149,

        flexDirection: 'row',

        alignSelf: 'flex-end',
        marginLeft: 20,
    },
    not_done_task: {
        height: 40,
        width: 149,

        flexDirection: 'row',

        alignSelf: 'flex-end',
        marginLeft: 20,
    }
})
