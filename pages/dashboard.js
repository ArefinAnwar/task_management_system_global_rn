import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
import Skeleton from 'react-loading-skeleton';

// Firebase Libraries
import * as firebase from "firebase";// Firebase Library
import { firebaseConfig } from "../Firebase_config";// Firebase Library
import "firebase/storage";// Firebase Library
import 'firebase/auth';

import up from '../assets/user_photo.jpg';

//Firebase checking if another app is initialized, if yes use that else create new app
if (!firebase.default.apps.length) {
    firebase.default.initializeApp(firebaseConfig);
} else {
    firebase.default.app(); // if already initialized, use that one
}



import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function App({ route, navigation }) {
    const [meeting_list, set_meeting_list] = React.useState([]); //for storing all recipe data

    const [user_name_with_hello, set_user_name_with_hello] = React.useState(null);

    const [user_name, set_user_name] = React.useState(null);

    const [user_mail, set_user_mail] = React.useState(null);

    const [is_loading, set_is_loading] = React.useState(true);

    const [user_data_recieved, set_user_data_recieved] = React.useState(false);
    //const [, set_user_name] = React.useState(null);

    var data = route.params;
    console.log(data);
    var temporary_recipe_list = [];

    React.useEffect(() => {
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
        });


        firebase.default
            .firestore()
            .collection("meetings")
            .get().then((querySnapshot) => {
                querySnapshot.forEach((doucument) => {
                    const d = doucument.data();
                    temporary_recipe_list.push(d); //pushing data to temporary list
                });

                if (meeting_list.length == 0) { //checking if recipe list == null 
                    set_meeting_list(temporary_recipe_list);  //we are pushing data from temp list to final recipe list
                    console.log(meeting_list);
                }
            })
        console.log(meeting_list);
    });
    /*firebase.default.auth().createUserWithEmailAndPassword('fd@gmail.com', 'SuperSecretPassword!')
    .then(() => {
      console.log('User account created & signed in!');
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }
  
      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
  
      console.error(error);
    });
    */
    const percentage = 60;
    var classes = [
        {
            className: "Science",
            classTime: "9:00 - 9:30",
        },
        {
            className: "Mathematics",
            classTime: "9:30 - 10:00",
        },
        {
            className: "English",
            classTime: "10:00 - 10:30",
        },
    ];

    var meetings = [
        {
            meeting_name: "Meeting with Head",
            meeting_time: "9:00 - 9:30",
        },
        {
            meeting_name: "Meeting with Employes",
            meeting_time: "9:00 - 9:30",
        },
        {
            meeting_name: "Meeting with Parents",
            meeting_time: "9:00 - 9:30",
        },
    ];
    const [time, setTime] = React.useState(true)
    const ColoredLine = ({ color }) => (
        <hr
            style={{
                color: color,
                backgroundColor: color,
                height: 1,
                width: '95%',
            }}
        />
    );

    //<Text style={styles.employe_name}>{user_name_with_hello || <Skeleton width={250} />}</Text>
    return (
        <View style={styles.background_container}>
            <View style={styles.main_content}>
                <View style={{ flexDirection: 'row', }}>
                    <View style={{ width: '50%' }}>
                        <Text style={styles.dashboard_heading}>Dashboard</Text>

                    </View>
                    <View style={styles.user_login_con}>
                        <View style={styles.user_login_inner_con}>
                            <View style={{ width: '70%' }}>
                                <Text style={styles.current_user_login_user_name}>{user_name || <Skeleton width={150} />}</Text>
                                <Text style={styles.current_user_login_user_mail}>{user_mail || <Skeleton width={150} />}</Text>
                            </View>
                            <View style={styles.current_user_login_photo}>
                                {<Image source={up} style={{ width: 55, height: 55, borderRadius: 50, }} /> || <Skeleton width={55} height={55} circle={true} />}
                            </View>
                        </View>

                    </View>
                </View>

                <TouchableOpacity onPress={() => { navigation.openDrawer() }}><Text style = {{color: 'white', fontSize: 20,}}>Open Sidebar</Text></TouchableOpacity>
                <View style={styles.for_meeting_mass_con}>

                    <View>
                        <View style={styles.performance_con}>
                            <Text style={{ color: 'white', fontSize: 20, }}>Performance</Text>
                            <View style={{ height: '70%', width: '70%', alignItems: 'center', justifyContent: 'center' }}>

                                <CircularProgressbar value={percentage} text={`${percentage}%`}
                                    styles={{
                                        text: {
                                            fill: 'white',
                                            fontWeight: 'bold',

                                            // fontFamily: 'NotoSans_400Regular',
                                        },
                                        path: {
                                            // Path color
                                            stroke: '#243ce6',
                                            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                            strokeLinecap: 'round',
                                            // Customize transition animation
                                            transition: 'stroke-dashoffset 0.5s ease 0s',
                                            // Rotate the path

                                            transformOrigin: 'center center',
                                        },
                                    }} />
                            </View>
                        </View>
                        <View style={styles.class_today_con}>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ color: 'white', fontSize: 25, fontWeight: '600', marginTop: '2%' }}>Classes Today</Text>
                            </View>

                            <FlatList
                                data={meeting_list}
                                renderItem={({ item }) =>
                                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{ width: '50%' }}>
                                            <Text style={styles.class_heading_text}>{item.meeting_name}</Text>
                                            <Text style={styles.class_time_text}></Text>
                                        </View>

                                        {(() => {
                                            if (true) {
                                                return (
                                                    <TouchableOpacity style={styles.class_status}>
                                                        <Text style={styles.class_status_text}>Join Class</Text>
                                                    </TouchableOpacity>
                                                )
                                            }
                                        })()}
                                    </View>
                                }

                            />
                        </View>
                    </View>


                    <View style={styles.meeting_today_con}>
                        <View style={{ alignItems: 'center', marginBottom: 20, }}>
                            <Text style={{ color: 'white', fontSize: 25, fontWeight: '600', marginTop: '2%' }}>Meetings Today</Text>
                        </View>
                        <FlatList
                            data={meetings}
                            renderItem={({ item }) =>
                                <View style={{ flex: 1, flexDirection: 'column' }}>
                                    <Text style={styles.meeting_heading_text}>{item.meeting_name}</Text>
                                    <Text style={styles.meeting_time_text}>{item.mee}</Text>

                                    {(() => {
                                        if (true) {
                                            return (
                                                <TouchableOpacity style={styles.join_meeting_con}>
                                                    <Text style={styles.join_meeting_text}>Join Meeting</Text>
                                                </TouchableOpacity>
                                            )
                                        }
                                    })()}
                                    <ColoredLine color="#1a1420" />
                                </View>

                            }

                        />
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
        fontFamily: 'NotoSans_400Regular',

    },
    main_content: {
        backgroundColor: '#222937',
        height: '100%',
        width: '100%',
    },
    dashboard_heading: {
        color: 'white',
        fontSize: 35,
        fontWeight: 'bold',
        marginLeft: '6%',
        marginTop: '4%',
        //fontFamily: 'NotoSans_400Regular',
    },

    greeting_text: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        //fontFamily: 'NotoSans_400Regular',

    },
    employe_name: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: '4%',
        //fontFamily: 'NotoSans_700Bold',
    },
    user_login_con: {
        width: '50%',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },

    user_login_inner_con: {
        height: 70,
        width: '50%',
        backgroundColor: '#171e29',
        marginRight: '10%',

        borderRadius: 25,
        shadowColor: "rgba(0,0,0, .3)", // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 10, //IOS
        elevation: 2, // Android0

        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',

        marginTop: '4%',
    },
    current_user_login_user_name: {
        width: '100%',
        marginLeft: '8%',
        fontSize: 18,
        color: 'white',
    },
    current_user_login_user_mail: {
        width: '100%',
        marginLeft: '8%',
        fontSize: 12,
        color: 'white',

    },

    current_user_login_photo: {
        height: 55,
        width: 55,
        borderRadius: 50,
        backgroundColor: 'white',
    },

    class_today_con: {
        width: 600,
        height: 250,
        backgroundColor: '#171e29',
        borderRadius: 25,
        marginLeft: '8%',
        marginTop: '5%',

        shadowColor: "rgba(0,0,0, .3)", // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 10, //IOS
        elevation: 2, // Android

    },
    performance_con: {
        width: 250,
        height: 200,
        backgroundColor: '#171e29',
        borderRadius: 25,
        marginLeft: '8%',
        marginTop: '2%',

        shadowColor: "rgba(0,0,0, .3)", // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 10, //IOS
        elevation: 2, // Android

        alignItems: 'center',
        justifyContent: 'center',
    },
    for_meeting_mass_con: {
        flex: 1,
        flexDirection: 'row',
    },
    meeting_today_con: {
        width: 250,
        height: 500,
        backgroundColor: '#171e29',
        borderRadius: 25,
        marginLeft: '33%',

        shadowColor: "rgba(0,0,0, .3)", // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 10, //IOS
        elevation: 2, // Android
    },


    class_heading_text: {
        fontSize: 25,
        color: 'white',

        marginLeft: '6%',
        marginTop: '4%',

    },

    class_time_text: {
        fontSize: 15,
        color: 'white',

        marginLeft: '6%',
        marginTop: '1%',
    },

    class_status: {
        width: '20%',
        height: '80%',

        borderRadius: 25,
        backgroundColor: '#243ce6',
        alignItems: 'center',
        justifyContent: 'center',

        marginTop: '2%',
        marginLeft: '25%',
    },
    class_status_text: {
        color: 'white',
        fontWeight: '100',
        fontSize: 18,
    },
    join_meeting_con: {
        width: 120,
        height: 40,

        borderRadius: 25,
        backgroundColor: '#243ce6',
        alignItems: 'center',
        justifyContent: 'center',

        marginTop: '2%',
        marginLeft: '25%',
    },
    join_meeting_text: {
        color: 'white',
        fontWeight: '100',
        fontSize: 15,
    },
    meeting_heading_text: {
        fontSize: 25,
        color: 'white',

        marginLeft: '6%',
        marginTop: '4%',

    },

    meeting_time_text: {
        fontSize: 15,
        color: 'white',

        marginLeft: '6%',
        marginTop: '1%',
    },
})
