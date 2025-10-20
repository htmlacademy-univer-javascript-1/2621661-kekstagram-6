// Функции из предыдущих заданий
const checkStringLength = function (string, maxLength) {
  return string.length <= maxLength;
};

const isPalindrome = function (string) {
  const cleanString = string.replace(/\s/g, '').toLowerCase();
  const reversedString = cleanString.split('').reverse().join('');
  return cleanString === reversedString;
};

// Проверки из предыдущих заданий
checkStringLength('проверяемая строка', 20);
checkStringLength('проверяемая строка', 18);
checkStringLength('проверяемая строка', 10);

isPalindrome('топот');
isPalindrome('ДовОд');
isPalindrome('Кекс');

const isMeetingWithinWorkHours = (workStart, workEnd, meetingStart, meetingDuration) => {
  // Функция для преобразования времени в минуты
  const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  // Преобразуем все времена в минуты
  const workStartMinutes = timeToMinutes(workStart);
  const workEndMinutes = timeToMinutes(workEnd);
  const meetingStartMinutes = timeToMinutes(meetingStart);


  const meetingEndMinutes = meetingStartMinutes + meetingDuration;

  return meetingStartMinutes >= workStartMinutes && meetingEndMinutes <= workEndMinutes;
};

isMeetingWithinWorkHours('08:00', '17:30', '14:00', 90); // true
isMeetingWithinWorkHours('8:0', '10:0', '8:0', 120);     // true
isMeetingWithinWorkHours('08:00', '14:30', '14:00', 90); // false
isMeetingWithinWorkHours('14:00', '17:30', '08:0', 90);  // false
isMeetingWithinWorkHours('8:00', '17:30', '08:00', 900); // false
