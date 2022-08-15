import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList, Image, Modal} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import storage from '../utils/Storage';
import {RunningImage_urls} from '../components/ImageRoutes/RunningImage';
import {ReadingImage_urls} from '../components/ImageRoutes/ReadingImage';
import {PlayingBallsImage_urls} from '../components/ImageRoutes/PlayingBallsImage';
import {DinnerImage_urls} from '../components/ImageRoutes/DinnerImage';
import {PhoneImage_urls} from '../components/ImageRoutes/PhoneImage';
import {ListenMusicImage_urls} from '../components/ImageRoutes/ListeningMusicImage';
import {CustomizedImage_urls} from '../components/ImageRoutes/CustomizedImage';
import ImageViewer from 'react-native-image-zoom-viewer';
// Connection to access the pre-populated user_db.db
const db = openDatabase({name: 'appData.db', createFromLocation: 1});

export default function Images({navigation}) {
  const user = storage.user;
  let [flatListItems, setFlatListItems] = useState([]);
  let [imageUrls, setImageUrls] = useState([]);
  console.log(imageUrls);
  useEffect(() => {
    viewAllImages();
  }, []);

  const viewAllImages = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT image_url, goal_name FROM goals WHERE goal_status=? and user_id=?',
        [1, user.user_id],
        (tx, results) => {
          const temp = [];
          let image;
          const url = [];
          for (let i = 0; i < results.rows.length; ++i) {
            let item = results.rows.item(i);
            temp.push(item);
            console.log(item);
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
            url.push({url: '', props: {source: image}});
          }
          setImageUrls(url);
          setFlatListItems(temp);
        },
      );
    });
  };
  let listItemView = item => {
    let image;
    const imageUrls = [];
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
    imageUrls.push({url: '', props: {source: image}});
    return (
      <View key={item.goal_name}>
        <ImageViewer style={styles.goal_image} imageUrls={imageUrls} />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {/*<FlatList*/}
      {/*  data={flatListItems}*/}
      {/*  keyExtractor={(item, index) => index.toString()}*/}
      {/*  renderItem={({item}) => listItemView(item)}*/}
      {/*  numColumns={3}*/}
      {/*/>*/}
      <Modal visible={true} transparent={true}>
        <ImageViewer imageUrls={imageUrls} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    marginTop: 10,
  },
  goal_image: {width: 120, height: 120, margin: 5},
});
