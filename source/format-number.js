// @flow

//
// Copyright (c) 2017 DDN. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

const units = ['', 'k', 'M', 'B', 'T'];

const isNumeric = n => !isNaN(parseFloat(n)) && isFinite(n);

export default (num: number, precision: number, strict: boolean = false) => {
  num = isNumeric(num) ? num : 0;
  precision = isNumeric(precision) ? precision : 3;

  const sign = num < 0 ? '-' : '';
  num = Math.abs(num);

  let pwr = Math.floor(Math.log(num) / Math.log(1000));

  pwr = Math.min(pwr, units.length - 1);
  pwr = Math.max(pwr, 0);
  num /= Math.pow(1000, pwr);

  type formatOptionsT = {
    maximumSignificantDigits?: number,
    maximumFractionDigits?: number,
    minimumSignificantDigits?: number
  };
  const formatOptions: formatOptionsT = {
    maximumSignificantDigits: precision,
    maximumFractionDigits: precision
  };

  if (strict) formatOptions.minimumSignificantDigits = precision;

  const formatter = new global.Intl.NumberFormat('en-us', formatOptions);

  return sign + formatter.format(num) + units[pwr];
};
