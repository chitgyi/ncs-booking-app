import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { RoomListScreen } from '../../screens/RoomListScreen/RoomListScreen';
import { WebViewScreen } from '../../screens/WebViewScreen/WebViewScreen';
import { ScannerScreen } from '../../screens/ScannerScreen/ScannerScreen';
import { Text, TouchableOpacity } from 'react-native';

export type RootStackParamList = {
  RoomList: undefined;
  Scanner: undefined;
  WebView: {uri: String};
  Test: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigation() {
  return (
    <Stack.Navigator initialRouteName="RoomList">
      <Stack.Screen 
      name="RoomList" 
      component={RoomListScreen}
      options={({ navigation }) => ({
        title: 'Room List',
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Scanner')}>
            <Text style={{ color: '#007AFF', marginRight: 10 }}>Camera</Text>
          </TouchableOpacity>
        ),
      })}
       />
      <Stack.Screen name="Scanner" component={ScannerScreen} />
      <Stack.Screen name="WebView" component={WebViewScreen} />
    </Stack.Navigator>
  );
}

export default AppNavigation;
