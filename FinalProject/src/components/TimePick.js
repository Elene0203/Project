import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';

export const TimePick = () => {
  const [time, setTime] = useState(null);
  const [open, setOpen] = useState(false);
  return (
    <View>
      <TouchableOpacity onPress={() => setOpen(true)}>
        <Text
          style={{
            fontSize: 18,
            color: 'grey',
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            width: 250,
            paddingLeft: 10,
          }}>
          {time != null
            ? time.getHours() + ':' + time.getMinutes()
            : 'Select time'}
        </Text>
      </TouchableOpacity>
      <DatePicker
        modal
        open={open}
        date={time || new Date()}
        mode="time"
        onConfirm={date => {
          setOpen(false);
          setTime(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </View>
  );
};
