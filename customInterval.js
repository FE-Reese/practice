/**
 * 使用 setTimeout 实现 setInterval
 */

/**
 * 最简单的版本，没有返回间隔id，可以实现固定间隔执行，但是无法实现 clearInterval
 * @param {*} callback
 * @param {*} delay
 */
const customInterval = (callback, delay) => {
  setTimeout(() => {
    callback();
    customInterval(callback, delay);
  }, delay);
};

customInterval(() => console.log('123'), 1000);

/**
 * 使用 setTimeout 实现 setInterval，支持清除功能
 * @param {*} callback
 * @param {*} delay
 */
const customInterval2 = (callback, delay) => {
  const timer = { id: null };

  const run = () => {
    timer.id = setTimeout(() => {
      callback();
      run();
    }, delay);
  };

  run();
  return timer;
};

const customClearInterval = (timer) => {
  if (timer && timer.id) {
    clearTimeout(timer.id);
    timer.id = null;
  }
};

const timer = customInterval2(() => console.log('123'), 1000);
setTimeout(() => {
  customClearInterval(timer);
}, 5100);
