'use strict';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const currentFileUrl = import.meta.url;
const __filename = fileURLToPath(currentFileUrl);
const __dirname = path.dirname(__filename);
const sourceFilePath = path.join(__dirname, 'files', 'fileToWrite.txt');

const write = async () => {
    const writeStream = fs.createWriteStream(sourceFilePath);
    process.stdin.pipe(writeStream);
};

await write();
