import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, FlatList, SafeAreaView} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';

// Connection to access the pre-populated user_db.db
const db = openDatabase({name: 'appData.db', createFromLocation: 1});

export default function Insights() {
  return (
    <View>
      <Text>in</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
