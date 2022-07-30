import Big from 'big.js';

export const add = (...args) => {
  let result;
  if (args.length > 1) {
    result = args.reduce((prev, current) => {
      return prev.plus(current);
    }, new Big(0));
    result = +result.valueOf();
  } else {
    result = args[0];
  }
  return result;
};

export const minus = (...args) => {
  let result;
  if (args.length > 1) {
    const initValue = new Big(args[0]);
    args = args.slice(1);
    result = args.reduce((prev, current) => {
      return prev.minus(current);
    }, initValue);
    result = +result.valueOf();
  } else {
    result = args[0];
  }
  return result;
};

export const times = (...args) => {
  let result;
  if (args.length > 1) {
    result = args.reduce((prev, current) => {
      return prev.times(current);
    }, new Big(1));
    result = +result.valueOf();
  } else {
    result = args[0];
  }
  return result;
};

export const div = (...args) => {
  let result;
  if (args.length > 1) {
    const initValue = new Big(args[0]);
    args = args.slice(1);
    result = args.reduce((prev, current) => {
      return prev.div(current);
    }, initValue);
    result = +result.valueOf();
  } else {
    result = args[0];
  }
  return result;
};

export const amountFormatter = (amount, decimal = 2) => {
  let valid = true;

  amount = (amount + '').trim();

  switch (true) {
    case amount === '.':
      amount = '0.';
      break;

    case /^0[^.]$/.test(amount):
      amount = amount.slice(1);
      break;

    default:
      break;
  }

  if (amount) {
    const regexpStr = `^[0-9]+${decimal ? `(\\.[0-9]{0,${decimal}})?` : ''}$`;
    const regexp = new RegExp(regexpStr);

    valid = regexp.test(amount);
  }

  return {valid, amount};
};
