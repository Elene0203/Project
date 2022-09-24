import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import storage from '../utils/Storage';
import TodayDate from '../components/TodayDate';
import {EncourageImage_urls} from '../components/ImageRoutes/EncourageImage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useIsFocused} from '@react-navigation/native';
import {ReadingImage_urls} from '../components/ImageRoutes/ReadingImage';
import {CustomizedImage_urls} from '../components/ImageRoutes/CustomizedImage';
import {EncourageWords} from '../components/EncourageWords';
import {RunningImage_urls} from '../components/ImageRoutes/RunningImage';
import {PlayingBallsImage_urls} from '../components/ImageRoutes/PlayingBallsImage';
import {PhoneImage_urls} from '../components/ImageRoutes/PhoneImage';
import {ListenMusicImage_urls} from '../components/ImageRoutes/ListeningMusicImage';
import {WalkingImage_urls} from '../components/ImageRoutes/WalkingImage';

// Connection to access the pre-populated user_db.db
const db = openDatabase({name: 'appData.db', createFromLocation: 1});

export default function Home({navigation}) {
  const isFocused = useIsFocused();
  const user = storage.user;
  const [total_goals, setTotalGoals] = useState('6');
  const [finished_goals, setFinishedGoals] = useState('');
  let [flatListItems, setFlatListItems] = useState([]);
  const [encouragement, setEncouragement] = useState('');
  const [encourageImage, setEncourageImage] = useState('');
  const [encourage, setEncourage] = useState('');

  const date = TodayDate();
  const alerted = {};

  const addDefaultGoals = list => {
    const num = parseInt(Math.random() * 30);
    db.transaction(function (tx) {
      for (let i = 0; i < list.length; ++i) {
        tx.executeSql(
          'INSERT INTO goals (goal_name, goal_date,estimate_time,goal_status,image_url,user_id) VALUES (?,?,?,?,?,?)',
          [list[i].goal_name, date, list[i].estimateTime, 0, num, user.user_id],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              console.log('goals added Successfully');
            } else {
              console.log('Default Goals added Failed');
            }
          },
          err => {
            console.error(err);
          },
        );
      }
    });
  };

  const viewAllGoals = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM goals WHERE goal_date=? and user_id=? ORDER BY goal_status, finish_time, estimate_time',
        [date, user.user_id],
        (tx, results) => {
          const temp = [];
          let count = 0;
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
            if (results.rows.item(i).goal_status === 1) {
              count = count + 1;
            }
          }
          setFlatListItems(temp);
          setFinishedGoals(count);
        },
      );
    });
  };

  const intervalDeal = () => {
    setInterval(() => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM goals WHERE goal_status=? and goal_date=? and user_id=?',
          [0, date, user.user_id],
          (tx, results) => {
            for (let i = 0; i < results.rows.length; ++i) {
              let item = results.rows.item(i);
              const time = date + ' ' + item.estimate_time;
              let seconds = new Date(time).getTime() - new Date().getTime();
              let count = 0;
              if (
                !alerted[item.id] &&
                seconds < 30 * 60 * 1000 &&
                seconds > 29 * 60 * 1000 &&
                count === 0
              ) {
                Alert.alert(
                  'Notification',
                  'The goal ' +
                    item.goal_name +
                    ' need to be finished 30min later',
                  [
                    {
                      text: 'OK',
                      onPress: () => navigation.navigate('Home'),
                    },
                  ],
                  {cancelable: false},
                );
                alerted[item.id] = true;
                count = 1;
              }
            }
          },
        );
      });
    }, 8000);
  };

  useEffect(() => {
    GetEncouragement();
    EncourageImage();
    intervalDeal();

    if (!date) {
      return;
    }
    db.transaction(function (tx) {
      tx.executeSql(
        'SELECT * FROM goals WHERE goal_date=? and user_id=?',
        [date, user.user_id],
        (tx, results) => {
          const len = results.rows.length;
          if (len > 0) {
            console.log('Default goals already added');
            viewAllGoals();
            setTotalGoals(len);
          } else {
            console.log('Add default goals');
            tx.executeSql('SELECT * FROM default_goals', [], (tx, results) => {
              const temp = [];
              for (let i = 0; i < results.rows.length; ++i) {
                temp.push(results.rows.item(i));
              }
              addDefaultGoals(temp);
              viewAllGoals();
            });
          }
        },
      );
    });
  }, [isFocused, date]);

  let listItemView = item => {
    let image;
    let lock;
    lock =
      item.goal_status != 1 ? (
        <MaterialIcons
          name="lock"
          color="black"
          size={40}
          style={{alignSelf: 'center', marginTop: 20}}
        />
      ) : (
        <></>
      );
    if (item.goal_name === 'Running') {
      image = RunningImage_urls[item.image_url];
    } else if (item.goal_name === 'Reading') {
      image = ReadingImage_urls[item.image_url];
    } else if (item.goal_name === 'Playing balls') {
      image = PlayingBallsImage_urls[item.image_url];
    } else if (item.goal_name === 'Walking') {
      image = WalkingImage_urls[item.image_url];
    } else if (item.goal_name === 'Phone a friend') {
      image = PhoneImage_urls[item.image_url];
    } else if (item.goal_name === 'Listening music') {
      image = ListenMusicImage_urls[item.image_url];
    } else {
      image = CustomizedImage_urls[item.image_url];
    }
    return (
      <View
        key={item.default_id}
        style={{width: 110, alignItems: 'center', marginTop: 30}}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Goal', {
              GoalID: item.goal_id,
              GoalName: item.goal_name,
              GoalStatus: item.goal_status,
              EstimateTime: item.estimate_time,
            })
          }>
          <ImageBackground
            style={styles.goal_image}
            imageStyle={{borderRadius: 15}}
            source={image}>
            {lock}
          </ImageBackground>
          <Text
            style={{
              marginTop: 5,
              fontWeight: 'bold',
              fontSize: 14,
              alignSelf: 'center',
            }}>
            {item.goal_status != 1 ? item.estimate_time : item.finish_time}
          </Text>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 14,
              alignSelf: 'center',
            }}>
            {item.goal_name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const GetEncouragement = () => {
    fetch('http://51.104.224.1:5000/encouragement')
      .then(response => response.json())
      .then(responseJson => {
        setEncouragement(responseJson[0].content);
        // console.log(responseJson);
      })
      .catch(error => {
        // console.error('failed==', error);
      });
    const num = parseInt(Math.random() * 30);
    setEncourage(EncourageWords[num].content);
  };
  const EncourageImage = () => {
    const num = parseInt(Math.random() * 43);
    setEncourageImage(EncourageImage_urls[num]);
  };

  return (
    <View style={styles.container}>
      <View style={[{flexDirection: 'row'}, styles.completion]}>
        <View style={{flex: 0.5}}>
          <Text style={styles.goalsCompletionText}>Goals{'\n'}Completion</Text>
        </View>
        <View style={{flex: 0.5}}>
          <Text style={styles.percentageText}>
            {((finished_goals / total_goals) * 100).toFixed(2)}%
          </Text>
          <Text style={styles.completeNum}>
            {finished_goals} of {total_goals}
          </Text>
        </View>
      </View>
      <View style={[{flexDirection: 'row'}, styles.encouragement]}>
        <View style={{flex: 0.5}}>
          <Image style={styles.image} source={encourageImage} />
        </View>
        <View style={{flex: 0.5}}>
          {/*<Text style={styles.encouragement_text}>{GetEncouragement()}</Text>*/}
          <Text style={styles.encouragement_text}>{encourage}</Text>
        </View>
      </View>
      <View style={[{flexDirection: 'row'}, styles.dailyGoals]}>
        <View style={{flex: 0.6}}>
          <Text style={styles.DailyGoalsText}>Daily Goals</Text>
        </View>
        <View style={{flex: 0.4}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Add Goal')}
            style={[{backgroundColor: '#92C2DD'}, styles.button]}>
            <Text style={styles.button_text}>+ Add Goal</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.goals}>
        <FlatList
          data={flatListItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => listItemView(item)}
          numColumns={3}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  completion: {
    backgroundColor: '#F9F9F9',
    flex: 0.12,
    marginTop: 10,
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
  },
  encouragement: {
    flex: 0.25,
    marginTop: 10,
    width: '98%',
  },
  goals: {
    flex: 0.6,
    backgroundColor: '#F9F9F9',
    marginTop: 20,
    width: '90%',
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
  },
  goalsCompletionText: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 5,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dailyGoals: {
    alignSelf: 'center',
    width: '90%',
  },
  DailyGoalsText: {
    fontSize: 22,
  },
  percentageText: {
    fontSize: 22,
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold',
    color: '#1E90FF',
  },
  completeNum: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
  },
  image: {
    width: 150,
    height: 100,
    marginTop: 10,
    marginLeft: 20,
    borderRadius: 10,
  },
  goal_image: {
    width: 70,
    height: 70,
    opacity: 0.8,
    alignSelf: 'center',
  },
  encouragement_text: {
    marginTop: 20,
    fontSize: 16,
  },
  button: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
  },
  button_text: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});
