import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';

import {AppNavigation} from './src/navigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
   <GestureHandlerRootView>
     <NavigationContainer>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={'white'}
      />
      <AppNavigation />
    </NavigationContainer>
   </GestureHandlerRootView>
  );
}

export default App;
