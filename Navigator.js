import { createDrawerNavigator } from '@react-navigation/drawer';
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

const Drawer = createDrawerNavigator();

export function Navigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Feed">
        <Drawer.Screen
          name="Login"
          component={login_code}
          options={{ drawerLabel: 'Login' }}
        />
        <Drawer.Screen
          name="Add Task"
          component={add_task_code}
          options={{ drawerLabel: 'Add Task' }}
        />
        <Drawer.Screen
          name="Tasks"
          component={to_do_code}
          options={{ drawerLabel: 'Tasks' }}
        />
        <Drawer.Screen
          name="Edit Task"
          component={edit_task_code}
          options={{ drawerLabel: 'Edit Task' }}
        />
        <Drawer.Screen
          name="Task Done By"
          component={task_done_by_code}
          options={{ drawerLabel: 'Task Done By' }}
        />
        <Drawer.Screen
          name="View Tasks"
          component={view_task_code}
          options={{ drawerLabel: 'View Tasks' }}
        />




        <Drawer.Screen
          name="Sign-up"
          component={sign_up_code}
          options={{ drawerLabel: 'Sign Up' }}
        />
        <Drawer.Screen
          name="Dashboard"
          component={dashboard_code}
          options={{ drawerLabel: 'Dashboard' }}
        />




      </Drawer.Navigator>
    </NavigationContainer>
  );
}