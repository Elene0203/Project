// import React, {useEffect, useState} from 'react';
// import {StyleSheet, View, Text, FlatList, SafeAreaView} from 'react-native';
// import {openDatabase} from 'react-native-sqlite-storage';
//
// // Connection to access the pre-populated user_db.db
// const db = openDatabase({name: 'appData.db', createFromLocation: 1});
//
// export default function Insights() {
//   let [flatListItems, setFlatListItems] = useState([]);
//
//   useEffect(() => {
//     db.transaction(tx => {
//       tx.executeSql('SELECT * FROM defaultGoals', [], (tx, results) => {
//         const temp = [];
//         for (let i = 0; i < results.rows.length; ++i) {
//           temp.push(results.rows.item(i));
//         }
//         setFlatListItems(temp);
//       });
//     });
//   }, []);
//
//   let listViewItemSeparator = () => {
//     return (
//       <View style={{height: 0.2, width: '100%', backgroundColor: '#808080'}} />
//     );
//   };
//
//   let listItemView = item => {
//     return (
//       <View
//         key={item.default_id}
//         style={{backgroundColor: 'white', padding: 20}}>
//         <Text>Id: {item.default_id}</Text>
//         <Text>Name: {item.goal_name}</Text>
//         <Text>Time: {item.estimateTime}</Text>
//       </View>
//     );
//   };
//   return (
//     <SafeAreaView style={{flex: 1}}>
//       <View style={{flex: 1}}>
//         <View style={{flex: 1}}>
//           <FlatList
//             data={flatListItems}
//             ItemSeparatorComponent={listViewItemSeparator}
//             keyExtractor={(item, index) => index.toString()}
//             renderItem={({item}) => listItemView(item)}
//           />
//         </View>
//         <Text style={{fontSize: 18, textAlign: 'center', color: 'grey'}}>
//           Pre-Populated SQLite Database in React Native
//         </Text>
//         <Text style={{fontSize: 16, textAlign: 'center', color: 'grey'}}>
//           www.aboutreact.com
//         </Text>
//       </View>
//     </SafeAreaView>
//   );
// }
//
// const styles = StyleSheet.create({});

// Pre-Populated SQLite Database in React Native
// https://aboutreact.com/example-of-pre-populated-sqlite-database-in-react-native
// Screen to view all the user*/

import React, {useState, useEffect} from 'react';
import {FlatList, Text, View, SafeAreaView} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import storage from '../utils/Storage';

// Connction to access the pre-populated user_db.db
let db = openDatabase({name: 'appData.db', createFromLocation: 1});

const Insights = () => {
  const user = storage.user;
  const addDefaultGoals = () => {
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO goals (goal_name, goal_date,estimate_time,goal_status,image_id) VALUES (?,?,?,?,?)',
        ['walking', '2022/07/21', '8:00', 'lock', 1],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            console.log('goals added Successfully');
          } else {
            console.log('Default Goals added Failed');
          }
        },
      );
    });
  };
  let [flatListItems, setFlatListItems] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM goals WHERE user_id=?',
        [user.user_id],
        (tx, results) => {
          // console.log('goals-insit-.length===', results.rows.length);
          const temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }
          setFlatListItems(temp);
        },
      );
    });
  }, []);

  let listViewItemSeparator = () => {
    return (
      <View style={{height: 0.2, width: '100%', backgroundColor: '#808080'}} />
    );
  };

  let listItemView = item => {
    return (
      <View key={item.goal_id} style={{backgroundColor: 'white', padding: 20}}>
        <Text>Id: {item.goal_id}</Text>
        <Text>user_id: {item.user_id}</Text>
        <Text>Name: {item.goal_name}</Text>
        <Text>Status: {item.goal_status}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <FlatList
            data={flatListItems}
            ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => listItemView(item)}
          />
        </View>
        <Text style={{fontSize: 18, textAlign: 'center', color: 'grey'}}>
          Pre-Populated SQLite Database in React Native
        </Text>
        <Text style={{fontSize: 16, textAlign: 'center', color: 'grey'}}>
          www.aboutreact.com
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Insights;
