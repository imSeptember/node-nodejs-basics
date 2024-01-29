'use strict';
import { Worker, isMainThread } from 'worker_threads';
import os from 'os';

const performCalculations = async () => {
    if (isMainThread) {
        const numCores = os.cpus().length;

        const workerScript = './src/wt/worker.js';

        const threads = [];
        const results = [];

        for (let i = 0; i < numCores; i++) {
            const worker = new Worker(workerScript, { workerData: i + 10 });

            worker.on('message', (result) => {
                results.push({ status: 'resolved', data: result });
                if (results.length === numCores) {
                    console.log(results);
                }
            });

            worker.on('error', (err) => {
                results.push({ status: 'error', data: null });
                if (results.length === numCores) {
                    console.log(results);
                }
                console.error('error', err);
            });

            worker.on('exit', (code) => {
                if (code !== 0) {
                    console.error('error');
                }
            });

            threads.push(worker);
        }

        await Promise.all(
            threads.map(
                (worker) => new Promise((resolve) => worker.on('exit', resolve))
            )
        );
    }
};

await performCalculations();
