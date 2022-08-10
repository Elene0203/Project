import React from 'react';

const TodayDate = () => {
  let date = new Date().getDate();
  let month = new Date().getMonth() + 1;
  let year = new Date().getFullYear();

  return year + '/' + month + '/' + date; //format:yyyy/mm/dd;
};

export default TodayDate;
