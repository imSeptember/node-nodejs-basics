import { parentPort, workerData, isMainThread } from 'worker_threads';

// n should be received from main thread
const nthFibonacci = (n) =>
    n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const n = workerData;

// Calculate the nth Fibonacci number
const result = nthFibonacci(n);

const sendResult = () => {
    parentPort.postMessage(result);
};

sendResult();
