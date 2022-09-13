import React, {useEffect, useState} from 'react';
import {View, Text, processColor, TouchableOpacity} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import {BarChart} from 'react-native-charts-wrapper';
import moment from 'moment';
import {useIsFocused} from '@react-navigation/native';
import storage from '../utils/Storage';
// Connection to access the pre-populated user_db.db
const db = openDatabase({name: 'appData.db', createFromLocation: 1});

export default function Insights() {
  const user = storage.user;
  const tabs = ['Day', 'Week', 'Month', 'Year'];
  const isFocused = useIsFocused();
  const [tab, setTab] = useState('Day');

  const [option, setOptions] = useState({dataSets: [{label: '', values: []}]});
  let [xAxis, setXAxis] = useState({
    valueFormatter: [],
    granularityEnabled: true,
    granularity: 1,
  });
  let formattedDate = new Date();
  const day =
    formattedDate.getDay().toString() +
    ' ' +
    formattedDate.getMonth().toString() +
    ' ' +
    formattedDate.getYear().toString();

  const [title, setTitle] = useState('');

  useEffect(() => {
    loadData();
    changeTab(tab);
  }, [isFocused]);

  const loadData = (xs, dates, cate) => {
    db.transaction(tx => {
      let sql =
        cate == 'Day'
          ? "SELECT * FROM goals where user_id =? AND goal_status=1 and goal_date='" +
            moment().format('YYYY/MM/DD') +
            "'"
          : 'SELECT * FROM goals where user_id =? AND goal_status=1';
      tx.executeSql(sql, [user.user_id], (tx, results) => {
        const temp = [];
        const values = xs.map(item => {
          return {
            y: 0,
          };
        });

        for (let i = 0; i < results.rows.length; ++i) {
          let item = results.rows.item(i);

          let index = dates.findIndex(date => {
            if (cate == 'Day') {
              if (
                moment(
                  item.goal_date + ' ' + item.finish_time + ':00',
                ).valueOf() <= date.valueOf()
              ) {
                return true;
              }
            } else {
              let f;
              if (cate == 'Week') {
                f = 'YYYY/MM/DD';
              } else if (cate == 'Month') {
                f = 'YYYY/MM';
              } else if (cate == 'Year') {
                f = 'YYYY';
              }
              return (
                (item.goal_date + ' ' + item.finish_time + ':00').indexOf(
                  date.format(f),
                ) !== -1
              );
            }
          });
          console.log(index);
          if (index !== -1) {
            values[index].y++;
          }
          temp.push(item);
        }

        setOptions({
          dataSets: [
            {
              label: 'Num',
              config: {
                color: processColor('#92C2DD'),
                barShadowColor: processColor('#92C2DD'),
                highlightAlpha: 90,
                highlightColor: processColor('#92C2DD'),
                valueTextSize: 12,
                valueTextColor: processColor('black'),
                valueFormatter: 'largeValue',
              },
              values: values,
            },
          ],
          config: {
            barWidth: 0.6,
          },
        });
        console.log(values);
      });
    });
  };

  const changeTab = item => {
    let now = moment();
    let xs = [];
    let dates = [];
    setTitle('Number of goals finished');
    if (item === 'Day') {
      dates.push(moment(now.format('YYYY/MM/DD') + ' 00:00:00'));
      for (let i = 0; i <= 8; i++) {
        let time = (i * 3 >= 10 ? i * 3 : '0' + i * 3) + ':00';
        dates.push(moment(now.format('YYYY/MM/DD') + ' ' + time + ':00'));
        xs.push(time);
      }
    } else if (item === 'Week') {
      xs.push(now.format('MM/DD'));
      dates.push(moment());
      for (let i = 0; i < 7; i++) {
        dates.splice(0, 0, moment().add(-1 - i, 'days'));
        xs.splice(0, 0, now.add(-1, 'days').format('MM/DD'));
      }
    } else if (item === 'Month') {
      xs.push(now.format('MM'));
      dates.push(moment());
      for (let i = 0; i < 7; i++) {
        dates.push(moment().add(-1 - i, 'months'));
        xs.push(now.add(-1, 'months').format('MM'));
      }
    } else if (item === 'Year') {
      xs.push(now.format('YYYY'));
      dates.push(moment());
      for (let i = 0; i < 7; i++) {
        dates.push(moment().add(-1 - i, 'years'));
        xs.push(now.add(-1, 'years').format('YYYY'));
      }
    }

    setXAxis({
      valueFormatter: xs,
      granularityEnabled: true,
      granularity: 1,
      textSize: 14,
      position: 'BOTTOM',
    });
    setTab(item);
    loadData(xs, dates, item);
  };

  return (
    <View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          margin: 20,
          backgroundColor: '#ddd',
          borderRadius: 10,
          marginTop: 50,
        }}>
        {tabs.map(item => {
          return (
            <TouchableOpacity
              style={{
                flex: 1,
                paddingHorizontal: 10,
                paddingVertical: 10,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                backgroundColor: tab === item ? '#fff' : 'transparent',
                borderRadius: 10,
              }}
              onPress={() => changeTab(item)}>
              <View>
                <Text style={{fontSize: 14}}>{item}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      <View>
        <Text
          style={{
            textAlign: 'center',
            color: '#000',
            marginVertical: 20,
            fontSize: 16,
          }}>
          {title.toString()}
        </Text>
      </View>
      <BarChart
        xAxis={xAxis}
        yAxis={{
          right: {
            enabled: false,
          },
          left: {
            enabled: true,
            textColor: processColor('black'),
            drawGridLines: true,
            drawAxisLine: false,
            drawLabels: true,
            gridLineWidth: 1,
            labelCount: 5,
            textSize: 14,
            labelCountForce: true,
            axisMinimum: 0,
          },
        }}
        legend={{
          enabled: true,
          textSize: 14,
          form: 'SQUARE',
          formSize: 14,
          xEntrySpace: 10,
          yEntrySpace: 5,
          formToTextSpace: 5,
          wordWrapEnabled: true,
          maxSizePercent: 1,
        }}
        style={{height: 400}}
        chartDescription={{text: ''}}
        data={option}
      />
    </View>
  );
}
