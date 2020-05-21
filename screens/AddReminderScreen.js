import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Input } from 'react-native-elements';

const AddReminderScreen = ({ route, navigation }) => {

  const [reminder, setReminder] = useState('');

  navigation.setOptions({
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Reminders', {text: reminder, done: false});
        }}
      >
        <Text>Save</Text>
      </TouchableOpacity>
    ),
    headerRight: () => (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Reminders');
        }}
      >
        <Text>Cancel</Text>
      </TouchableOpacity>
    ),
  });

  return (
    <View>
      <Input
        placeholder='Enter reminder'
        value={reminder}
        onChangeText={setReminder}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default AddReminderScreen;
