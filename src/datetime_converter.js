// Module responsible for converting time and date formats
const weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const getWeekday = (dayIndex) => weekdays[dayIndex];
const getMonthAsString = (monthIndex) => months[monthIndex];

export { getWeekday, getMonthAsString };
