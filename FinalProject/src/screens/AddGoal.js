import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import DatePicker from 'react-native-date-picker';
import storage from '../utils/Storage';
import TodayDate from '../components/TodayDate';
import {CustomizedImage_urls} from '../components/ImageRoutes/CustomizedImage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Connection to access the pre-populated user_db.db
const db = openDatabase({name: 'appData.db', createFromLocation: 1});

export default function AddGoal({navigation}) {
  const user = storage.user;
  const date = TodayDate();
  const [name, setName] = useState('');
  const [time, setTime] = useState(null);
  const [open, setOpen] = useState(false);
  let hours =
    time != null ? (time.getHours() < 10 ? '0' : '') + time.getHours() : 0;
  let minutes =
    time != null ? (time.getMinutes() < 10 ? '0' : '') + time.getMinutes() : 0;
  const [GoalImage, setGoalImage] = useState('');
  const [GoalImageUrl, setGoalImageUrl] = useState('');

  const GetGoalImage = () => {
    const num = parseInt(Math.random() * 32);
    setGoalImage(CustomizedImage_urls[num]);
    setGoalImageUrl(num);
  };

  const SaveGoal = () => {
    if (!name) {
      alert('Please enter the goal name!');
      return;
    }
    if (!time) {
      alert('Please select time!');
      return;
    }
    console.log(
      name,
      date,
      hours + ':' + minutes,
      0,
      GoalImageUrl,
      user.user_id,
    );
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO goals (goal_name, goal_date, estimate_time, goal_status,image_url,user_id) VALUES (?,?,?,?,?,?)',
        [name, date, hours + ':' + minutes, 0, GoalImageUrl, user.user_id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          console.log('added');
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'A new goal was added Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.goBack(),
                },
              ],
              {cancelable: false},
            );
          } else {
            alert('Failed to add the goal');
          }
        },
        err => {
          console.error(err);
        },
      );
    });
  };
  const TimePick = () => {
    return (
      <View>
        <TouchableOpacity onPress={() => setOpen(true)}>
          <Text
            style={{
              fontSize: 18,
              color: 'grey',
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              width: 250,
              paddingLeft: 10,
            }}>
            {time != null ? hours + ':' + minutes : 'Select time'}
          </Text>
        </TouchableOpacity>
        <DatePicker
          modal
          open={open}
          date={time || new Date()}
          mode="time"
          onConfirm={date => {
            setOpen(false);
            setTime(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </View>
    );
  };
  useEffect(() => {
    GetGoalImage();
  }, []);
  return (
    <View style={styles.container}>
      <View style={[{flexDirection: 'row'}, styles.inputs]}>
        <View style={{flex: 0.3}}>
          <Text style={styles.bodyText}>
            <MaterialIcons name="drive-file-rename-outline" size={25} />
            &ensp;Name:
          </Text>
        </View>
        <View style={{flex: 0.7}}>
          <TextInput
            style={styles.inputBox}
            placeholder="e.g. Running"
            value={name}
            onChangeText={setName}
          />
        </View>
      </View>
      <View style={[{flexDirection: 'row'}, styles.inputs]}>
        <View style={{flex: 0.3}}>
          <Text style={styles.bodyText}>
            <MaterialIcons name="timer" size={25} />
            &ensp;Time:
          </Text>
        </View>
        <View style={{flex: 0.7}}>
          <TimePick />
        </View>
      </View>
      <ImageBackground style={styles.image} source={GoalImage}>
        <MaterialIcons
          name="lock"
          color="black"
          size={80}
          style={{alignSelf: 'center', marginTop: 40}}
        />
      </ImageBackground>
      <TouchableOpacity
        style={[{backgroundColor: '#92C2DD'}, styles.button]}
        onPress={SaveGoal}>
        <Text style={[{color: 'white'}, styles.button_text]}>Save</Text>
      </TouchableOpacity>
    </View>
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
  inputs: {
    marginTop: 20,
    marginLeft: 10,
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  bodyText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputBox: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    padding: 0,
    width: 250,
    fontSize: 16,
    paddingLeft: 10,
  },
  image: {
    width: 270,
    height: 180,
    alignSelf: 'center',
    marginTop: 40,
    opacity: 0.6,
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
