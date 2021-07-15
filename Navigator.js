import { createStackNavigator } from '@react-navigation/stack';

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { View, Text } from 'react-native';

import dashboard_code from './pages/dashboard'; // Dashboard Page

import login_code from './pages/login_page.js';

import sign_up_code from './pages/sign_up_page';

import to_do_code from './pages/Tasks';

import view_task_code from './pages/view_task_page';

import add_task_code from './pages/add_task_page';

import edit_task_code from './pages/edit_task_page';

import task_done_by_code from './pages/task_done_by';

const Stack = createStackNavigator();

export function Navigator() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" >
        <Stack.Screen
          name="Login"
          component={login_code}
          
          options={{ 
            title: 'Login',
            headerShown: false,
            
          }}
        />
        <Stack.Screen
          name="Add Task"
          component={add_task_code}
          options={{ 
            title: 'Add Task' 
          }}
        />
        <Stack.Screen
          name="Tasks"
          component={to_do_code}

          options={{ 
            title: 'Tasks',
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Edit Task"
          component={edit_task_code}
          options={{ 
            title: 'Edit Task',
            headerShown: false,
           }}
        />
        <Stack.Screen
          name="Task Done By"
          component={task_done_by_code}
          options={{ 
            title: 'Task Done By' 
          }}
        />
        <Stack.Screen
          name="View Tasks"
          component={view_task_code}
          options={{ 
            title: 'View Tasks',
          }}
        />




        <Stack.Screen
          name="Sign-up"
          component={sign_up_code}
          options={{ 
            title: 'Sign Up',
            headerShown: false
          }}
        />
        




      </Stack.Navigator>
    </NavigationContainer>
  );
}