import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CheckBox } from 'react-native-elements';
import Toast from 'react-native-root-toast';

const items = [
  { text: 'get groceries', done: false },
  { text: 'feed dog', done: false },
  { text: 'take out trash', done: false },
];

const RemindersScreen = ({ route, navigation }) => {

  const [reminders, setReminders] = useState(items.sort(comparator));

  useEffect(() => {
    if (route.params?.text) {
      setReminders([...reminders, route.params].sort(comparator));
    }
  }, [route.params?.text]);

  const comparator = (item1, item2) => {
    return item1.text.toLowerCase() > item2.text.toLowerCase();
  };

  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('AddReminder');
        }}
        >
          <Feather style={{marginRight: 10 }} name="edit" size={24} />
        </TouchableOpacity>
    ),
  });

  const renderReminder = ({ index, item }) => {
    return (
      <CheckBox
        title={item.text}
        checked={item.done}
        onPress={() => {
          let newArr = [...reminders];
          newArr[index] = { ...item, done: !item.done};
          setReminders(newArr.sort(comparator));
        }}
        onLongPress={() => {
          let newArr = reminders.filter((val,idx) => {
            return idx == index ? false : true;
          });
          setReminders(newArr.sort(comparator));
          Toast.show(`Deleted ${item.text}`, {
            duration: Toast.durations.SHORT,
            animation: true, 
            hideOnPress: true,
          });
        }}
      />
    )
  };
  
  return (
    <FlatList
      keyExtractor={(item) => item.text}
      data={reminders}
      renderItem={renderReminder}
    />
  );
};

const styles = StyleSheet.create({

});

export default RemindersScreen;