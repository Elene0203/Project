import React from 'react';
import {StyleSheet, View, Text, Button, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import storage from '../utils/Storage';

export default function Setting({navigation}) {
  const user = storage.user;
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.body_text}>
          {' '}
          Email: <Text style={styles.input}>{user.email}</Text>
        </Text>

        <TouchableOpacity
          style={[{borderWidth: 1, borderColor: '#92C2DD'}, styles.button]}
          onPress={() => navigation.navigate('Change Password')}>
          <Text style={[{color: '#92C2DD'}, styles.button_text]}>
            Change Password
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            {borderWidth: 1, borderColor: '#92C2DD', marginBottom: 10},
            styles.button,
          ]}
          onPress={() => navigation.navigate('Login')}>
          <Text style={[{color: '#92C2DD'}, styles.button_text]}>
            <Ionicons name="log-out-outline" color="#92C2DD" size={24} />
            Sign Out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  body: {
    width: '90%',
    backgroundColor: '#F9F9F9',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  body_text: {
    fontSize: 20,
    marginTop: 20,
    color: 'black',
    marginLeft: 40,
    borderBottomWidth: 1,
    width: '80%',
  },
  input: {
    fontSize: 20,
    padding: 10,
    alignSelf: 'center',
    marginTop: 5,
  },
  button: {
    alignItems: 'center',
    alignSelf: 'center',
    padding: 8,
    borderRadius: 20,
    marginTop: 20,
  },
  button_text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
