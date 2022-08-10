import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Button, Image, FlatList} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import storage from '../utils/Storage';
import TodayDate from '../components/TodayDate';
// Connection to access the pre-populated user_db.db
const db = openDatabase({name: 'appData.db', createFromLocation: 1});

export default function Home({navigation}) {
  const user = storage.user;
  const [total_goals, setTotalGoals] = useState('');
  const [finished_goals, setFinishedGoals] = useState('');
  let [flatListItems, setFlatListItems] = useState([]);
  const date = TodayDate();

  const addDefaultGoals = list => {
    db.transaction(function (tx) {
      for (let i = 0; i < list.length; ++i) {
        tx.executeSql(
          'INSERT INTO goals (goal_name, goal_date,estimate_time,goal_status,image_id,user_id) VALUES (?,?,?,?,?,?)',
          [
            list[i].goal_name,
            date,
            list[i].estimateTime,
            'lock',
            1, //image_id(need changed)
            user.user_id,
          ],
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
        'SELECT * FROM goals WHERE goal_date=? and user_id=?',
        [date, user.user_id],
        (tx, results) => {
          const temp = [];
          let count = 0;
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
            // console.log(results.rows.item(i));
            if (results.rows.item(i).goal_status === 'unlock') {
              count = count + 1;
            }
          }
          setFlatListItems(temp);
          setFinishedGoals(count);
        },
      );
    });
  };

  useEffect(() => {
    if (!date) {
      return;
    }
    db.transaction(function (tx) {
      tx.executeSql(
        'SELECT * FROM goals WHERE goal_date=? and user_id=?',
        [date, user.user_id],
        (tx, results) => {
          const len = results.rows.length;
          console.log('goals.length===', len);
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
  }, [date]);

  let listItemView = item => {
    return (
      <View
        key={item.default_id}
        style={{width: 120, alignItems: 'center', marginTop: 30}}>
        <Image style={styles.goal_image} source={{}} />
        {/*<Text>{item.estimate_time}</Text>*/}
        <Text style={{marginTop: 5}}>{item.goal_name}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={[{flexDirection: 'row'}, styles.completion]}>
        <View style={{flex: 0.5}}>
          <Text style={styles.goalsCompletionText}>Goals{'\n'}Completion</Text>
        </View>
        <View style={{flex: 0.5}}>
          <Text style={styles.percentageText}>
            {(finished_goals / total_goals) * 100}%
          </Text>
          <Text style={styles.completeNum}>
            {finished_goals} of {total_goals}
          </Text>
        </View>
      </View>
      <View style={[{flexDirection: 'row'}, styles.encouragement]}>
        <View style={{flex: 0.5}}>
          <Image style={styles.image} source={{}} />
        </View>
        <View style={{flex: 0.5}}>
          <Text style={styles.encouragement_text}>Encouragement</Text>
        </View>
      </View>
      <View style={[{flexDirection: 'row'}, styles.dailyGoals]}>
        <View style={{flex: 0.6}}>
          <Text style={styles.DailyGoalsText}>Daily Goals</Text>
        </View>
        <View style={{flex: 0.4}}>
          <Button
            title="+ Add Goal"
            onPress={() => navigation.navigate('Add Goal')}
            color="#92C2DD"
          />
        </View>
      </View>

      <View style={styles.goals}>
        <FlatList
          data={flatListItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => listItemView(item)}
          numColumns={3}
        />
        {/*<Text>{date}</Text>*/}
        {/*<Text>user_id: {user.user_id}</Text>*/}
        {/*<Text>email: {user.email}</Text>*/}
        {/*<Text>password: {user.password}</Text>*/}
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
    flex: 0.1,
    marginTop: 10,
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
  },
  encouragement: {
    flex: 0.25,
    marginTop: 10,
    width: '90%',
  },
  goals: {
    flex: 0.6,
    backgroundColor: '#F9F9F9',
    marginTop: 20,
    width: '90%',
    borderRadius: 10,
    alignSelf: 'center',
  },
  goalsCompletionText: {
    fontSize: 22,
    textAlign: 'center',
    marginTop: 5,
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
  },
  completeNum: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
  },
  image: {
    width: 150,
    height: 100,
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 10,
    marginLeft: 20,
  },
  goal_image: {
    width: 80,
    height: 80,
    borderColor: 'black',
    borderWidth: 1,
  },
  encouragement_text: {
    marginTop: 20,
    fontSize: 14,
  },
});
