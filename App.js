import {StatusBar, SafeAreaView} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigation from './src/router/appnavigation';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar
        animated={true}
        backgroundColor={'black'}
        barStyle={'light-content'}
        showHideTransition={'fade'}
      />
      <SafeAreaView style={{flex: 1}}>
        <AppNavigation />
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default App;
