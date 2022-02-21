import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Detail from '../screens/Detail';
import Search from '../screens/Search';
import Navbar from './Navbar';

const Stack = createStackNavigator();

const MainNavigation = () => {
    return (
        <Stack.Navigator headerMode={'screen'}>
            <Stack.Screen 
                name="Home"
                component={Home}
                options={{
                    headerTransparent: true,
                    header: ({ navigation }) => (
                        <Navbar navigation={navigation} main={true} />
                    ),
                }}  
            />
            <Stack.Screen
                name="Detail"
                component={Detail}
                options={{
                    headerTransparent: true,
                    header: ({ navigation }) => (
                        <Navbar navigation={navigation} />
                    ),
                }}
            />
            <Stack.Screen
                name="Search"
                component={Search}
                options={{
                    headerTransparent: true,
                    header: ({ navigation }) => (
                        <Navbar navigation={navigation} />
                    ),
                }}
            />
        </Stack.Navigator>
    );
}

export default MainNavigation;