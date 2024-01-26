import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import { Readable } from 'stream';

const currentFileUrl = import.meta.url;
const __filename = fileURLToPath(currentFileUrl);
const __dirname = path.dirname(__filename);

const sourceFilePath = path.join(
    __dirname,
    'files',
    'fileToCalculateHashFor.txt'
);

const calculateHash = async () => {
    const readStream = fs.createReadStream(sourceFilePath);

    const hashStream = crypto.createHash('sha256');

    readStream.on('data', (chunk) => {
        hashStream.update(chunk);
    });

    readStream.on('end', () => {
        const hash = hashStream.digest('hex');

        const hashStreamOutput = new Readable();
        hashStreamOutput.push(hash);
        hashStreamOutput.push(null); // Indicates the end of the stream
        hashStreamOutput.pipe(process.stdout);
    });
};

await calculateHash();
