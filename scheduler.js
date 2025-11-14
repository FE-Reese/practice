/**
 * 任务调度器类
 * 用于控制并发任务的执行数量，防止同时执行过多任务
 */
class Scheduler {
  constructor(maxConcurrency) {
    this.queue = []; // 等待队列，存储的是 Promise 的 resolve 函数
    this.runningCount = 0; // 当前正在执行的任务数量
    this.maxConcurrency = maxConcurrency; // 最大并发数
  }

  /**
   * 添加任务到调度器
   * @param {Function} task - 要执行的异步任务
   * @returns {Promise} 返回任务执行结果
   */
  async addTask(task) {
    // 如果当前运行的任务数已达到最大并发数，则需要等待
    if (this.runningCount >= this.maxConcurrency) {
      // 核心设计：不存储任务本身，而是创建一个 Promise 让当前任务在此处等待
      // 将这个 Promise 的 resolve 函数存入队列，等有空闲时再调用它来恢复执行
      await new Promise((resolve) => {
        this.queue.push(resolve);
      });
    }

    // 开始执行任务
    this.runningCount++;
    let res = await task(); // 等待任务执行完成
    this.runningCount--; // 任务完成，运行数减 1

    // 如果有任务在等待，唤醒队列中的下一个任务
    if (this.queue.length) {
      const resolve = this.queue.shift(); // 取出等待队列的第一个 resolve
      resolve(); // 调用 resolve，让对应的任务从 await 处继续执行
    }

    return res;
  }
}

/**
 * 创建一个mock的异步任务
 * @param {Function} task - 要执行的任务函数
 * @param {number} delay - 延迟时间（毫秒）
 * @returns {Function} 返回一个返回 Promise 的函数
 */
const createTask = (task, delay) => {
  return () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        task();
        resolve();
      }, delay);
    });
  };
};

// 创建一个最大并发数为 2 的调度器实例
const scheduler = new Scheduler(2);

scheduler.addTask(
  createTask(() => {
    console.log('任务 1');
  }, 1000)
);

scheduler.addTask(
  createTask(() => {
    console.log('任务 2');
  }, 500)
);

scheduler.addTask(
  createTask(() => {
    console.log('任务 3');
  }, 300)
);

scheduler.addTask(
  createTask(() => {
    console.log('任务 4');
  }, 400)
);
