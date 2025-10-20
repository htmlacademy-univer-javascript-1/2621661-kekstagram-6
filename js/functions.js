const checkStringLength = function (string, maxLength) {
  return string.length <= maxLength;
};

const isPalindrome = function (string) {
  const cleanString = string.replace(/\s/g, '').toLowerCase();
  const reversedString = cleanString.split('').reverse().join('');
  return cleanString === reversedString;
};

checkStringLength('проверяемая строка', 20);
checkStringLength('проверяемая строка', 18);
checkStringLength('проверяемая строка', 10);

isPalindrome('топот');
isPalindrome('ДовОд');
isPalindrome('Кекс');


