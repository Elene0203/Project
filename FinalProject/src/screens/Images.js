import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Modal,
  ImageBackground,
  Button,
  TouchableOpacity,
  Dimensions,
  Platform,
  PermissionsAndroid,
  Alert,
  ScrollView,
} from 'react-native';

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
import RNFS from 'react-native-fs';

export default function Images({navigation}) {
  const user = storage.user;
  let [flatListItems, setFlatListItems] = useState([]);
  let [imageUrls, setImageUrls] = useState([]);
  let [previewImage, setPreviewImage] = useState(null);
  const {width, height} = Dimensions.get('window');

  useEffect(() => {
    viewAllImages();
  }, []);

  const viewAllImages = () => {
    db.transaction(tx => {
      // tx.executeSql(
      //   'SELECT image_url, goal_name FROM goals WHERE goal_status=? and user_id=?',
      //   [1, user.user_id],
      tx.executeSql(
        'SELECT image_url, goal_name FROM goals WHERE goal_status=?',
        [1],
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
            url.push(image);
          }
          setImageUrls(url);
          setFlatListItems(temp);
        },
      );
    });
  };

  async function hasAndroidPermission() {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }
  return (
    <View style={styles.container}>
      {/*<FlatList*/}
      {/*  data={flatListItems}*/}
      {/*  keyExtractor={(item, index) => index.toString()}*/}
      {/*  renderItem={({item}) => listItemView(item)}*/}
      {/*  numColumns={3}*/}
      {/*/>*/}
      <ScrollView style={{flex: 1, height: 650}} horizontal={false}>
        <View style={styles.container}>
          {imageUrls.map(image => {
            let imageWidth = (width - 20) / 3;
            return (
              <TouchableOpacity
                onPress={() => {
                  setPreviewImage(image);
                }}>
                <ImageBackground
                  style={{
                    width: imageWidth,
                    height: imageWidth,
                    marginLeft: 5,
                    marginBottom: 5,
                  }}
                  imageStyle={{borderRadius: 2}}
                  source={image}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      <Modal visible={!!previewImage} transparent={true}>
        <ImageViewer imageUrls={[{url: '', props: {source: previewImage}}]} />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: '#000',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {/* <View style={{marginLeft:10,flex:1}}>
            <Button title='save' onPress={()=>{
              console.log("previewImage",previewImage);
              downLoad(previewImage,"jpg");
            }}></Button>
          </View> */}
          <View style={{marginLeft: 10, flex: 1}}>
            <Button
              title="close"
              onPress={() => {
                setPreviewImage(null);
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  goal_image: {width: 120, height: 120, margin: 5},
});
