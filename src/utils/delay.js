export const delay = (func, wait) => {
  let timeout;
  timeout = setTimeout(func, wait);
  return timeout;
};
