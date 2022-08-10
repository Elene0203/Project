import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

export default function History({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.allImages}>
        <Button
          title="View all images"
          onPress={() => navigation.navigate('Images')}
          color="#92C2DD"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  allImages: {
    alignSelf: 'flex-end',
    marginRight: 10,
    marginTop: 10,
  },
});
