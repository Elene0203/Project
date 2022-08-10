import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';
import {TimePick} from '../components/TimePick';

export default function AddGoal({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>Enter Your Goal</Text>
      </View>
      <View
        style={{
          borderBottomColor: 'black',
          borderBottomWidth: 2,
          marginTop: 5,
        }}
      />
      <View style={[{flexDirection: 'row'}, styles.inputs]}>
        <View style={{flex: 0.2}}>
          <Text style={styles.bodyText}>Name:</Text>
        </View>
        <View style={{flex: 0.8}}>
          <TextInput style={styles.inputBox} placeholder="e.g. Running" />
        </View>
      </View>
      <View style={[{flexDirection: 'row'}, styles.inputs]}>
        <View style={{flex: 0.3}}>
          <Text style={styles.bodyText}>Time to do:</Text>
        </View>
        <View style={{flex: 0.7}}>
          <TimePick />
        </View>
      </View>
      <Image style={styles.image} source={{}} />
      <TouchableOpacity
        style={[{backgroundColor: '#92C2DD'}, styles.button]}
        onPress={() => {}}>
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
    padding: 2,
    width: 300,
    fontSize: 16,
  },
  image: {
    width: 270,
    height: 180,
    borderColor: 'black',
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: 10,
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
