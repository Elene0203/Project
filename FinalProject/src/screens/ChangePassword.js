import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import storage from '../utils/Storage';
import {openDatabase} from 'react-native-sqlite-storage';

// Connection to access the pre-populated user_db.db
const db = openDatabase({name: 'appData.db', createFromLocation: 1});

export default function ChangePassword({navigation}) {
  const user = storage.user;
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const ChangePassword = () => {
    if (!currentPassword) {
      alert('Please enter your current password.');
      return;
    }
    if (currentPassword !== user.password) {
      alert('Your current password was wrong');
      return;
    }
    if (!newPassword) {
      alert('Please enter your new password.');
      return;
    }
    if (!confirmPassword) {
      alert('Please enter confirm password.');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('Your new password and confirmation password do not match.');
      return;
    }
    console.log(newPassword);
    db.transaction(function (tx) {
      tx.executeSql(
        'UPDATE user SET password=? WHERE user_id=?',
        [newPassword, user.user_id],
        (tx, results) => {
          console.log('Password Changed');
          if (results.rowsAffected > 0) {
            navigation.goBack();
          } else {
            alert('Failed to change password');
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
      <View style={styles.body}>
        <Text style={styles.body_text}>Current Password</Text>
        <TextInput
          placeholder="Current password"
          value={currentPassword}
          onChangeText={setCurrentPassword}
          secureTextEntry={true}
          style={styles.input}
        />
        <Text style={styles.body_text}>New Password</Text>
        <TextInput
          placeholder="New password"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry={true}
          style={styles.input}
        />
        <Text style={styles.body_text}>Confirm Password</Text>
        <TextInput
          placeholder="Confirm password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={true}
          style={styles.input}
        />
        <TouchableOpacity
          style={[{borderWidth: 1, borderColor: '#92C2DD'}, styles.button]}
          onPress={ChangePassword}>
          <Text style={[{color: '#92C2DD'}, styles.button_text]}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
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
    color: 'black',
    marginLeft: 40,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 16,
    width: '80%',
    // height: 34,
    padding: 10,
    alignSelf: 'center',
    marginTop: 5,
  },
  button: {
    alignItems: 'center',
    alignSelf: 'center',
    padding: 8,
    marginTop: 25,
    width: '20%',
    borderRadius: 20,
    marginBottom: 10,
  },
  button_text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
