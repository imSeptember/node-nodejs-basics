import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import * as zlib from 'zlib';

const currentFileUrl = import.meta.url;
const __filename = fileURLToPath(currentFileUrl);
const __dirname = path.dirname(__filename);

const sourceFilePath = path.join(__dirname, 'files', 'fileToCompress.txt');
const newFilePath = path.join(__dirname, 'files', 'archive.gz');

const compress = async () => {
    const gzib = zlib.createGzip();
    const readStream = fs.createReadStream(sourceFilePath);
    const writeStream = fs.createWriteStream(newFilePath);
    readStream.pipe(gzib).pipe(writeStream);
};

await compress();
