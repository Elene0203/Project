import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {openDatabase} from 'react-native-sqlite-storage';
import RNPickerSelect from 'react-native-picker-select';
import storage from '../utils/Storage';
import TodayDate from '../components/TodayDate';

// Connection to access the pre-populated user_db.db
const db = openDatabase({name: 'appData.db', createFromLocation: 1});
const {width, height} = Dimensions.get('window');
// let inputWidth = width;

export default function FinishGoal({route, navigation}) {
  const user = storage.user;
  const date = TodayDate();

  const {GoalID, GoalName, GoalStatus, EstimateTime} = route.params;
  const [comments, setComments] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [goalTime, setGoalTime] = useState(null);
  const [duration, setDuration] = useState(null);
  const [mood, setMood] = useState('');
  const [open, setOpen] = useState(false);
  let hours =
    startTime != null
      ? (startTime.getHours() < 10 ? '0' : '') + startTime.getHours()
      : 0;
  let minutes =
    startTime != null
      ? (startTime.getMinutes() < 10 ? '0' : '') + startTime.getMinutes()
      : 0;

  useEffect(() => {
    let titleFront = '';
    GoalStatus != 1
      ? (titleFront = 'New ')
      : ((titleFront = 'Update '), ViewGoalDetails());
    navigation.setOptions({
      title: titleFront + JSON.stringify(GoalName).replace(/^\"|\"$/g, ''),
    });
  }, [GoalName, GoalStatus, navigation]);

  const DurationPick = () => {
    return (
      <RNPickerSelect
        placeholder={{
          label: 'Select duration...',
          value: null,
          fontSize: 20,
        }}
        value={duration}
        onValueChange={(value, index) => setDuration(value)}
        items={[
          {label: '15min', value: '15min'},
          {label: '30min', value: '30min'},
          {label: '45min', value: '45min'},
          {label: '1hr', value: '1hr'},
          {label: '1hr 15min', value: '1hr 15min'},
          {label: '1hr 30min', value: '1hr 30min'},
          {label: '1hr 45min', value: '1hr 45min'},
          {label: '2hr', value: '2hr'},
          {label: '2hr+', value: '2hr+'},
        ]}
      />
    );
  };
  const MoodPick = () => {
    return (
      <RNPickerSelect
        placeholder={{
          label: 'Select Mood...',
          value: null,
          fontSize: 18,
        }}
        value={mood}
        onValueChange={(value, index) => setMood(value)}
        items={[
          {label: 'Great', value: 'Great'},
          {label: 'Good', value: 'Good'},
          {label: 'OK', value: 'OK'},
          {label: 'Poor', value: 'Poor'},
          {label: 'Bad', value: 'Bad'},
        ]}
      />
    );
  };

  const TimePick = () => {
    return (
      <View>
        <TouchableOpacity onPress={() => setOpen(true)}>
          <Text
            style={{
              fontSize: 16,
              color: 'black',
              paddingLeft: 15,
              marginTop: 15,
            }}>
            {startTime != null ? (
              hours + ':' + minutes
            ) : GoalStatus != 1 ? (
              <Text style={{color: 'black', fontSize: 16}}>{EstimateTime}</Text>
            ) : (
              <Text style={{color: 'black', fontSize: 16}}>{goalTime}</Text>
            )}
          </Text>
        </TouchableOpacity>
        <DatePicker
          modal
          open={open}
          date={startTime || new Date()}
          mode="time"
          is24Format={true}
          onConfirm={date => {
            setOpen(false);
            setStartTime(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </View>
    );
  };

  const ViewGoalDetails = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM goals WHERE goal_id=?',
        [GoalID],
        (tx, results) => {
          setDuration(results.rows.item(0).duration);
          setMood(results.rows.item(0).mood);
          setGoalTime(results.rows.item(0).finish_time);
          setComments(results.rows.item(0).comments);
        },
      );
    });
  };

  const SaveGoal = () => {
    if (!duration) {
      alert('Please select duration!');
      return;
    }
    if (!mood) {
      alert('Please select mood!');
      return;
    }
    if (!comments) {
      alert('Please enter the comments!');
      return;
    }
    console.log(
      startTime != null
        ? hours + ':' + minutes
        : GoalStatus != 1
        ? EstimateTime
        : goalTime,
      duration,
      mood,
      comments,
    );
    db.transaction(function (tx) {
      tx.executeSql(
        'UPDATE goals SET finish_time=?,goal_status=?,duration=?,mood=?,comments=? WHERE user_id=? AND goal_date=? AND goal_name=?',
        [
          startTime != null
            ? hours + ':' + minutes
            : GoalStatus != 1
            ? EstimateTime
            : goalTime,
          1,
          duration,
          mood,
          comments,
          user.user_id,
          date,
          GoalName,
        ],
        (tx, results) => {
          console.log(GoalName + ' updated as finished');
          if (results.rowsAffected > 0) {
            navigation.goBack();
          } else {
            alert('Failed to update the goal');
          }
        },
        err => {
          console.error(err);
        },
      );
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputs}>
        <Text style={styles.bodyText}>
          <MaterialIcons name="timer" size={25} />
          &ensp;Start time
        </Text>
        <View style={[{height: 55, marginRight: 10}, styles.pickerBox]}>
          <TimePick />
        </View>
      </View>

      <View style={styles.inputs}>
        <Text style={styles.bodyText}>
          <Entypo name="time-slot" size={23} />
          &ensp;Duration:
        </Text>
      </View>
      <View style={styles.pickerBox}>
        <DurationPick />
      </View>

      <View style={styles.inputs}>
        <Text style={styles.bodyText}>
          <MaterialIcons name="mood" size={25} />
          &ensp;Mood:
        </Text>
      </View>
      <View style={styles.pickerBox}>
        <MoodPick />
      </View>
      <View style={styles.inputs}>
        <Text style={styles.bodyText}>
          <MaterialIcons name="comment" size={25} />
          &ensp;Comments:
        </Text>
      </View>
      <TextInput
        style={styles.inputBox}
        placeholder="Enter comments here.."
        value={comments}
        onChangeText={setComments}
        multiline={true}
        blurOnSubmit={false}
      />
      <TouchableOpacity
        style={[{backgroundColor: '#92C2DD'}, styles.button]}
        onPress={SaveGoal}>
        <Text style={[{color: 'white'}, styles.button_text]}>
          {GoalStatus != 1 ? 'Save' : 'Update'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginTop: 20,
    marginLeft: 10,
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'blue',
  },
  inputs: {
    marginTop: 20,
    marginLeft: 10,
  },
  bodyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  picker: {
    marginVertical: 30,
    width: 300,
    padding: 10,
    borderWidth: 1,
    borderColor: '#666',
  },
  pickerBox: {
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
    width: width - 10,
    marginTop: 10,
    alignSelf: 'center',
  },
  inputBox: {
    fontSize: 18,
    paddingLeft: 15,
    borderColor: 'grey',
    borderWidth: 1,
    width: width - 10,
    height: 120,
    marginTop: 10,
    borderRadius: 10,
    textAlignVertical: 'top',
    padding: 0,
    alignSelf: 'center',
  },
  button: {
    alignItems: 'center',
    alignSelf: 'center',
    padding: 8,
    marginTop: 25,
    width: '50%',
    borderRadius: 20,
  },
  button_text: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});
