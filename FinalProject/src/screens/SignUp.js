import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Connection to access the pre-populated user_db.db
const db = openDatabase({name: 'appData.db', createFromLocation: 1});

export default function SignUp({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [RepeatPassword, setRepeatPassword] = useState('');

  const addUser = () => {
    if (!email) {
      alert('Please enter email address.');
      return;
    }
    if (!password) {
      alert('Please enter password.');
      return;
    }
    if (!RepeatPassword) {
      alert('Please enter confirm password.');
      return;
    }
    if (password !== RepeatPassword) {
      alert('Your password and confirmation password do not match.');
      return;
    }
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO user (email, password) VALUES (?,?)',
        [email, password],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          console.log(email + ' ' + password + ' added');
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'You are Registered Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Login'),
                },
              ],
              {cancelable: false},
            );
          } else {
            alert('Registration Failed');
          }
        },
      );
    });
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.back}
        onPress={() => navigation.navigate('Login')}>
        <MaterialIcons name="arrow-back" size={36} />
      </TouchableOpacity>
      <Text style={styles.title}>Create Your Account</Text>

      <Text style={styles.text}>Email:</Text>
      <TextInput
        placeholder="Your email address"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <Text style={styles.text}>Password:</Text>
      <TextInput
        placeholder="Your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        style={styles.input}
      />
      <Text style={styles.text}>Confirm Password:</Text>
      <TextInput
        placeholder="Confirm your password"
        value={RepeatPassword}
        onChangeText={setRepeatPassword}
        secureTextEntry={true}
        style={styles.input}
      />
      <TouchableOpacity
        style={[{backgroundColor: '#92C2DD'}, styles.button]}
        onPress={addUser}>
        <Text style={[{color: 'white'}, styles.button_text]}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#92C2DD',
    marginBottom: 50,
    marginTop: 80,
    alignSelf: 'center',
  },
  back: {
    marginLeft: 10,
    marginTop: 20,
  },
  text: {
    fontSize: 22,
    alignSelf: 'flex-start',
    marginLeft: 40,
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 14,
    width: '80%',
    height: 34,
    paddingLeft: 10,
    alignSelf: 'center',
  },
  button: {
    alignItems: 'center',
    alignSelf: 'center',
    padding: 8,
    marginTop: 25,
    width: '80%',
    borderRadius: 20,
  },
  button_text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
