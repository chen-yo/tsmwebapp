
export function addCommas(arrayOfStrings) {
  let str = '';

  if (arrayOfStrings.length == 0) return '';

  if (arrayOfStrings.length == 1) {
    return arrayOfStrings[0];
  }

  let i = 0;
  for (; i < arrayOfStrings.length - 1; i++) {
    str += arrayOfStrings[i] + ', ';
  }

  str += arrayOfStrings[i];

  return str;
}
