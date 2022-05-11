let lastCall = 0;

/**
 * @param {number?} delay=0
 * @return Promise<void>
 */
const sleep = (delay = 0) => new Promise((resolve) => setTimeout(() => resolve(), delay));

// @TODO: implement a sliding window or leaky bucket queue, preferably as a class
/**
 * Implements a simple function call queue with an interval between each call
 * @template T
 * @param {() => (Promise<T> | T)?} cb
 * @param {number} minDelay
 */
const schedule = async (cb, minDelay = 2000) => {
  const now = Number(new Date());
  const delay = Math.max(minDelay - now + lastCall + 5, 0);
  lastCall = now + delay;
  if (delay > 0) await sleep(delay);
  return cb?.();
};

module.exports = { schedule, sleep };
