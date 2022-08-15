import React from 'react';
import {StyleSheet, View, Text, Button, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import storage from '../utils/Storage';

export default function Setting({navigation}) {
  const user = storage.user;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account</Text>
      <View style={styles.body}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 0.4}}>
            <Text style={styles.body_text}> Email: </Text>
          </View>
          <View style={{flex: 0.4}}>
            <Text style={styles.body_text}>{user.email}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Change Password')}>
          <Text style={[{color: '#92C2DD'}, styles.body_text]}>
            Change Password
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text
            style={[{color: '#92C2DD', marginBottom: 20}, styles.body_text]}>
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
    fontSize: 18,
    marginTop: 10,
    alignSelf: 'center',
  },
});
