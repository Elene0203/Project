import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import storage from '../utils/Storage';
import {RunningImage_urls} from '../components/ImageRoutes/RunningImage';
import {ReadingImage_urls} from '../components/ImageRoutes/ReadingImage';
import {ListenMusicImage_urls} from '../components/ImageRoutes/ListeningMusicImage';
import {CustomizedImage_urls} from '../components/ImageRoutes/CustomizedImage';
import {PhoneImage_urls} from '../components/ImageRoutes/PhoneImage';
import {DinnerImage_urls} from '../components/ImageRoutes/DinnerImage';
import {PlayingBallsImage_urls} from '../components/ImageRoutes/PlayingBallsImage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useIsFocused} from '@react-navigation/native';
import TodayDate from '../components/TodayDate';
// Connection to access the pre-populated user_db.db
const db = openDatabase({name: 'appData.db', createFromLocation: 1});

export default function History({navigation}) {
  const todayDate = TodayDate();
  const user = storage.user;
  const isFocused = useIsFocused();
  let [flatListItems, setFlatListItems] = useState([]);
  let prevDate = '';
  useEffect(() => {
    viewAllGoals();
  }, [isFocused]);

  const viewAllGoals = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM goals WHERE user_id=? AND goal_status =? ORDER BY goal_date DESC, finish_time',
        [user.user_id, 1],
        (tx, results) => {
          const temp = [];
          console.log(results.rows);
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
            console.log(results.rows.item(i));
          }
          setFlatListItems(temp);
        },
      );
    });
  };

  let listItemView = item => {
    let image;
    if (item.goal_name === 'Running') {
      image = RunningImage_urls[item.image_url];
    } else if (item.goal_name === 'Reading') {
      image = ReadingImage_urls[item.image_url];
    } else if (item.goal_name === 'Playing balls') {
      image = PlayingBallsImage_urls[item.image_url];
    } else if (item.goal_name === 'Having dinner') {
      image = DinnerImage_urls[item.image_url];
    } else if (item.goal_name === 'Phone a friend') {
      image = PhoneImage_urls[item.image_url];
    } else if (item.goal_name === 'Listening music') {
      image = ListenMusicImage_urls[item.image_url];
    } else {
      image = CustomizedImage_urls[item.image_url];
    }

    let date;
    if (item.goal_date != prevDate) {
      date = (
        <View style={styles.dateBox}>
          <Text style={styles.dateText}>
            {item.goal_date != todayDate ? item.goal_date : 'Today'}
          </Text>
        </View>
      );
      prevDate = item.goal_date;
    } else {
      date = <></>;
    }

    return (
      <View>
        {date}
        <View key={item.default_id} style={styles.oneGoal}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Goal', {
                GoalID: item.goal_id,
                GoalName: item.goal_name,
                GoalStatus: item.goal_status,
              })
            }>
            <View style={[{flexDirection: 'row'}]}>
              <Image style={styles.image} source={image} />
              <View style={{flex: 0.9, margin: 10}}>
                <Text style={styles.goal_text}>{item.finish_time}</Text>
                <Text style={styles.goal_text}>{item.goal_name}</Text>
              </View>
              <MaterialIcons
                name="arrow-forward"
                color="black"
                size={30}
                style={{alignSelf: 'center'}}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.allImagesText}>
        <Button
          title="View all images"
          onPress={() => navigation.navigate('Images')}
          color="#92C2DD"
        />
      </View>
      <FlatList
        data={flatListItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => listItemView(item)}
        numColumns={1}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  allImagesText: {
    alignSelf: 'flex-end',
    marginRight: 10,
    marginTop: 10,
  },
  oneGoal: {
    margin: 5,
    borderRadius: 10,
    borderWidth: 1,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  goal_text: {
    marginTop: 5,
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
  },
  dateBox: {
    backgroundColor: '#92C2DD',
    width: 150,
    margin: 5,
    borderRadius: 5,
  },
  dateText: {
    fontWeight: 'bold',
    fontSize: 18,
    alignSelf: 'center',
    color: 'black',
    letterSpacing: 2,
  },
});
