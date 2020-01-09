function calculateAge(birthday) {
  var birthday_arr = birthday.split("-");
  var birthday_date = new Date(
    birthday_arr[2],
    birthday_arr[1] - 1,
    birthday_arr[0]
  );
  var ageDifMs = Date.now() - birthday_date.getTime();
  var ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function fechaNow() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //Enero toma valor 0

  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  today = dd + "-" + mm + "-" + yyyy;
  return today;
}

module.exports = { calculateAge, fechaNow };
