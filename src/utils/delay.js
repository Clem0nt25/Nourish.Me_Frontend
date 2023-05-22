export const delay = (func, wait, ...args) => {
  let timeout;
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    func(...args);
  }, wait);
};
