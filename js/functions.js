const checkStringLength = function (string, maxLength) {
  return string.length <= maxLength;
};

const isPalindrome = function (string) {
  const cleanString = string.replace(/\s/g, '').toLowerCase();
  const reversedString = cleanString.split('').reverse().join('');
  return cleanString === reversedString;
};

console.log('Проверка длины строки:');
console.log(checkStringLength('проверяемая строка', 20));
console.log(checkStringLength('проверяемая строка', 18));
console.log(checkStringLength('проверяемая строка', 10));

console.log('\nПроверка палиндромов:');
console.log(isPalindrome('топот'));
console.log(isPalindrome('ДовОд'));
console.log(isPalindrome('Кекс'));
console.log(isPalindrome('Лёша на полке клопа нашёл '));
