// MainComponent.js
import React from 'react';
import { View, Text } from 'react-native';
import NoteList from './NoteListNew'; // Replace with the actual component you want to render

const MainComponent = () => {
  return (
    <View>
      <Text>Welcome to My Note App!</Text>
      <NoteList /> 
    </View>
  );
};

export default MainComponent;

