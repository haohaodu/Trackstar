import React from 'react';
import { Text, View } from 'react-native';

import GradesForm from '../components/GradesForm';

// TO DO:
// error detection (right now we handle it but don't bug the user about it)
//  - non-numerical/empty values
//  - not adding up to 100, should be working
//  - skipping rows
// auto-population

const GradesScreen = (props) => {
  const navigation = props.navigation;
    return (
      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between', marginTop: 50}}>
        <GradesForm />
      </View>
    );
};

export default GradesScreen;
