import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const AddReminderScreen = ({ route, navigation }) => {
  navigation.setOptions({
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Reminders');
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
      <Text> Add Reminder Screen </Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default AddReminderScreen;
