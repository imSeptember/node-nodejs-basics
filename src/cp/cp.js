import { spawn } from 'child_process';

const spawnChildProcess = async (args) => {
    const child = spawn('node', ['./src/cp/files/script.js', ...args], {
        stdio: ['pipe', 'pipe', 'inherit'],
    });

    process.stdin.pipe(child.stdin);

    child.stdout.on('data', (data) => {
        process.stdout.write(data.toString());
    });

    process.stdin.on('end', () => {
        child.stdin.end();
    });

    child.on('exit', (code) => {
        process.stdout.write(`Child process exited with code ${code}\n`);
    });
};

// Put your arguments in function call to test this functionality
spawnChildProcess([true, 'someArgument2', 2]);
