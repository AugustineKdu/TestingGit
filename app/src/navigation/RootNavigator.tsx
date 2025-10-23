/**
 * 루트 내비게이터
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SplashScreen } from '../screens/SplashScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { SignupScreen } from '../screens/SignupScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { EditProfileScreen } from '../screens/EditProfileScreen';
import { ScreenListScreen } from '../screens/ScreenListScreen';
import { TabNavigator } from './TabNavigator';

const Stack = createStackNavigator();

export const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ScreenList"
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* 데모: 화면 목록 */}
        <Stack.Screen name="ScreenList" component={ScreenListScreen} />

        {/* 인증 */}
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />

        {/* 메인 (탭 네비게이터) */}
        <Stack.Screen name="Main" component={TabNavigator} />

        {/* 설정 */}
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
