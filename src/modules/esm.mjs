import path from 'path';
import { release, version } from 'os';
import { createServer } from 'http';
import './files/c.js'; // Make sure the path is correct

const random = Math.random();

let unknownObject;

if (random > 0.5) {
    import('./files/a.json')
        .then((module) => {
            unknownObject = module.default;
            console.log(unknownObject);
            console.log('ZORRO');
        })
        .catch((error) => {
            console.error('Error loading file a.json:', error);
        });
} else {
    import('./files/b.json')
        .then((module) => {
            unknownObject = module.default;
            console.log(unknownObject);
        })
        .catch((error) => {
            console.error('Error loading file b.json:', error);
        });
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
