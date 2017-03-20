// @flow

//
// INTEL CONFIDENTIAL
//
// Copyright 2013-2017 Intel Corporation All Rights Reserved.
//
// The source code contained or described herein and all documents related
// to the source code ("Material") are owned by Intel Corporation or its
// suppliers or licensors. Title to the Material remains with Intel Corporation
// or its suppliers and licensors. The Material contains trade secrets and
// proprietary and confidential information of Intel or its suppliers and
// licensors. The Material is protected by worldwide copyright and trade secret
// laws and treaty provisions. No part of the Material may be used, copied,
// reproduced, modified, published, uploaded, posted, transmitted, distributed,
// or disclosed in any way without Intel's prior express written permission.
//
// No license under any patent, copyright, trade secret or other intellectual
// property right is granted to or conferred upon you by disclosure or delivery
// of the Materials, either expressly, by implication, inducement, estoppel or
// otherwise. Any license under such intellectual property rights must be
// express and approved by Intel in writing.

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
