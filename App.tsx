import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NoteList from './NoteList';
import NoteFormScreen from './NoteFormScreen';
import { NoteProvider } from './NoteContext';

const Stack = createNativeStackNavigator();

function App() : React.JSX.Element {
  return (
    <NoteProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="NoteList">
        <Stack.Screen 
            name="NoteList" 
            component={NoteList}
            options={{ headerTitle: 'Your Notes'}}
        />
        <Stack.Screen
          name="NoteFormScreen"
          component={NoteFormScreen}
          options={{ headerTitle: 'New Note'}}
      />
      </Stack.Navigator>
    </NavigationContainer>
    </NoteProvider>
  );
}

export default App;
