const DAY_IN_MONTH = {
  1: 31,
  2: 28,
  3: 31,
  4: 30,
  5: 31,
  6: 30,
  7: 31,
  8: 31,
  9: 30,
  10: 31,
  11: 30,
  12: 31,
};

const format_date = (string_raw) => {
  var d     = new Date(string_raw),
      month = '' + (d.getMonth() + 1),
      day   = '' + d.getDate(),
      year  = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [day, month, year].join('-');
}


const detect_age = (birthday) => {
  let date_birth = new Date(birthday)
  let date_now   = new Date()

  let abs = (date_now.getTime() - date_birth.getTime()) / 1000;

  // 31536000 is the seconds in 1 year
  // 2592000 is the seconds in 1 month
  // 86400 is the seconds in 1 day
  let year  = Math.floor(abs / 31536000);
  let month = Math.floor((abs - year * 31536000) / 2592000);
  let date;

  if (date_now.getDate() >= date_birth.getDate()) {
    date = date_now.getDate() - date_birth.getDate();
  } else {
    date = DAY_IN_MONTH[date_birth.getMonth() + 1] - date_birth.getDate() + date_now.getDate();
  }

  let result = '';
  if (year > 0) {
    result += year + ' năm';
  }
  if (month > 0) {
    result += ' ' + month + ' tháng ';
  }
  result += date + ' ngày'
  return result
}

const detect_age_arr = (birthday) => {
  let date_birth = new Date(birthday)
  let date_now   = new Date()

  let abs = (date_now.getTime() - date_birth.getTime()) / 1000;

  // 31536000 is the seconds in 1 year
  // 2592000 is the seconds in 1 month
  // 86400 is the seconds in 1 day
  let year  = Math.floor(abs / 31536000),
      month = Math.floor((abs - year * 31536000) / 2592000),
      date;

  if (date_now.getDate() >= date_birth.getDate()) {
    date = date_now.getDate() - date_birth.getDate();
  } else {
    date = DAY_IN_MONTH[date_birth.getMonth() + 1] - date_birth.getDate() + date_now.getDate();
  }

  return [year, month, date];
}

export { format_date, detect_age, detect_age_arr }