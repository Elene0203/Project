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
import storage from '../utils/Storage';
// Connection to access the pre-populated user_db.db
const db = openDatabase({name: 'appData.db', createFromLocation: 1});

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const Signin = () => {
    if (!email) {
      alert('Please enter email address.');
      return;
    }
    if (!password) {
      alert('Please enter password.');
      return;
    }
    db.transaction(function (tx) {
      tx.executeSql(
        'SELECT * FROM user WHERE email=? and password=?',
        [email, password],
        (tx, results) => {
          const len = results.rows.length;
          if (len > 0) {
            storage.user = results.rows.item(0);
            // console.log('uuuu', results.rows.length);
            // console.log('uuuu2222', storage.user);
            setEmail('');
            setPassword('');
            navigation.navigate('Home');
          } else {
            alert('No user found. Check your email address and password.');
          }
        },
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome !</Text>
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

      <TouchableOpacity
        style={[{backgroundColor: '#92C2DD'}, styles.button]}
        onPress={Signin}>
        <Text style={[{color: 'white'}, styles.button_text]}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[{borderWidth: 1, borderColor: '#92C2DD'}, styles.button]}
        onPress={() => navigation.navigate('SignUp')}>
        <Text style={[{color: '#92C2DD'}, styles.button_text]}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#92C2DD',
    marginBottom: 50,
    alignSelf: 'center',
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
