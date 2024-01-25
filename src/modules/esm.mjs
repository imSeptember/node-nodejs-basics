import path from 'path';
import { release, version } from 'os';
import { createServer } from 'http';
import './files/c.js'; // Make sure the path is correct
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const aJson = require('./files/a.json');
const bJson = require('./files/b.json');

const random = Math.random();

let unknownObject;

if (random > 0.5) {
    unknownObject = aJson;
    console.log(unknownObject);
} else {
    unknownObject = bJson;
    console.log(unknownObject);
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

// Getting the current file's path
const currentFilePath = new URL(import.meta.url).pathname;
console.log(`Path to current file is ${currentFilePath}`);

// Getting the current directory's path
const currentDirPath = path.dirname(currentFilePath);
console.log(`Path to current directory is ${currentDirPath}`);

const myServer = createServer((_, res) => {
    res.end('Request accepted');
});

const PORT = 3000;

myServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log('To terminate it, use Ctrl+C combination');
});

export { unknownObject, myServer };
