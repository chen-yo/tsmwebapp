const moment = require('moment');
const reRange = new RegExp(/^\d+-\d+$/);
const { body, validationResult } = require('express-validator');

function validateDays(value) {
  let error = null;
  let parsed = [];

  if (!value) {
    error = 'Days field required';
  } else {
    const groups = value.split(',').map(i => i.trim());

    for (let group of groups) {
      if (group.includes('-')) {
        if (!reRange.test(group)) {
          error =
            'Invalid date range: format of range ' +
            group +
            ' is incorrect (expect ranges such as 5-21)';
          break;
        }

        let [first, second] = group.split('-');

        first = parseInt(first);
        second = parseInt(second);

        let to = moment()
          .subtract(first + 1, 'days')
          .format('YYYY-MM-DD');

        let from = moment()
          .subtract(first + second + 1, 'days')
          .format('YYYY-MM-DD');

        parsed.unshift({ from, to });
      } else if (group.includes('/')) {
        const parsedDate = moment(group, 'D/M/YYYY', true);
        if (parsedDate.isValid()) {
          parsed.push(parsedDate.format('YYYY-MM-DD'));
          console.log('Valid date: ' + parsedDate.format('DD/MM/YYYY'));
        } else {
          error =
            'Invalid date range: ' +
            group +
            ' is not in the format of DD/MM/YYYY';
          break;
        }
      } else if (!isNaN(group)) {
        // if a number
        let num = +group;
        let d1 = moment()
          .subtract(1 + num, 'days')
          .format('YYYY-MM-DD');
        parsed.unshift({
          from: d1,
          to: moment().subtract(1, 'days').format('YYYY-MM-DD')
        });
      } else {
        error =
          'Invalid date range: date range should be groups of dd-mm and\\or dd/mm/yyyy for example: 1-24, 24/3/2020, 20';
        break;
      }
    }
  }

  if (error) {
    throw new Error(error);
  }

  return true;
}

function validateFiltersRules() {
  return [
    body('dfpAdUnit')
      .isArray({ min: 1 })
      .withMessage('At least one Ad Unit is required'),
    body('days')
      .custom(validateDays)
      .trim()
      .customSanitizer(days => {
        if(days.includes(',')) {
          let arr = days.split(',');
          let result = [];

          for(let i=0; i<arr.length; i++) {
            let val = arr[i].trim();
            if(val) result.push(val);
          }

          return result;
        } else {
          return [days.trim()];
        }
      })
  ];
}

module.exports = {
  validateFiltersRules
};
