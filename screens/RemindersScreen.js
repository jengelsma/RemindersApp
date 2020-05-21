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

const comparator = (item1, item2) => {
  return item1.text.toLowerCase() > item2.text.toLowerCase();
};

const RemindersScreen = ({ route, navigation }) => {

  const [reminders, setReminders] = useState(items.sort(comparator));
  const [display, setDisplay] = useState('All');

  useEffect(() => {
    if (route.params?.text) {
      setReminders([...reminders, route.params].sort(comparator));
    }
  }, [route.params?.text]);



  const displayFilter = (item) => {
    if(display==='All') {
      return true;
    } else if (display === 'Done') {
      return item.done ? true : false;
    } else {
      return item.done ? false : true;
    }
  }

  navigation.setOptions({
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => {
          if(display==='All') {
            setDisplay('Not Done') 
          } else if (display === 'Not Done' ) {
            setDisplay('Done');
          } else {
            setDisplay('All');
          }
        }}
      >
        <Text>{display}</Text>
      </TouchableOpacity>
    ),
    headerRight: () => (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('AddReminder');
        }}
      >
        <Feather style={{ marginRight: 10 }} name="edit" size={24} />
      </TouchableOpacity>
    ),
  });

  const addRemindersNotDisplayed = (newArr) => {
    if (display === 'Not Done') {
      newArr = newArr.concat(
        reminders.filter((i) => {
          return i.done;
        })
      );
    } else if (display === 'Done') {
      newArr = newArr.concat(
        reminders.filter((i) => {
          return !i.done;
        })
      );
    }
    return newArr;
  };

  const renderReminder = ({ index, item }) => {
    return (
      <CheckBox
        title={item.text}
        checked={item.done}
        onPress={() => {
          var newArr = [...reminders.filter(displayFilter)];
          newArr[index] = { text: item.text, done: !item.done };
          newArr = addRemindersNotDisplayed(newArr);
          setReminders(newArr.sort(comparator));
        }}
        onLongPress={() => {
          let subset = reminders.filter(displayFilter);
          let newArr = subset.filter((val, idx) => {
            return idx == index ? false : true;
          });
          newArr = addRemindersNotDisplayed(newArr);
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
      data={reminders.filter(displayFilter)}
      renderItem={renderReminder}
    />
  );
};

const styles = StyleSheet.create({

});

export default RemindersScreen;