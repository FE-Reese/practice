const myInterval = (task, delay) => {
  let timer = { id: null };

  const run = () => {
    timer.id = setTimeout(() => {
      task();
      run();
    }, delay);
  };

  run();

  return timer;
};

const timer = myInterval(() => {
  console.log('1');
}, 1000);

setTimeout(() => {
  clearTimeout(timer.id);
}, 5100);
