/* eslint-disable @typescript-eslint/no-explicit-any */
const debounce = (fn: any, delay: number) => {
  let timerId: any;
  return (...args: any) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

export default debounce;
