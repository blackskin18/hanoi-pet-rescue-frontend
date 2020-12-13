const format_date      = (string_raw) => {
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
    let birthdayObject = new Date(birthday)
    let dateNow = new Date()

    let abs = (dateNow.getTime() - birthdayObject.getTime()) / 1000
    console.log(birthdayObject, abs)
    let year = Math.floor(abs/(60*60*24*365));
    let month = Math.floor((abs%(60*60*24*365))/(60*60*24*30));

    if(year > 0) {
        return year + ' năm ' + month + ' tháng';
    } else {
        return month + ' tháng';
    }
}

const detect_age_arr = (birthday) => {
  let birthdayObject = new Date(birthday)
  let dateNow = new Date()

  let abs = (dateNow.getTime() - birthdayObject.getTime()) / 1000
  console.log(birthdayObject, abs)
  let year = Math.floor(abs/(60*60*24*365));
  let month = Math.floor((abs%(60*60*24*365))/(60*60*24*30));

  console.log(year, month)

  return [year, month];
}

export {format_date, detect_age, detect_age_arr}