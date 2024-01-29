import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import * as zlib from 'zlib';

const currentFileUrl = import.meta.url;
const __filename = fileURLToPath(currentFileUrl);
const __dirname = path.dirname(__filename);

const sourceFilePath = path.join(__dirname, 'files', 'fileToCompress.txt');
const newFilePath = path.join(__dirname, 'files', 'archive.gz');

const decompress = async () => {
    const gunzip = zlib.createGunzip();
    const readStream = fs.createReadStream(newFilePath);
    const writeStream = fs.createWriteStream(sourceFilePath);
    readStream.pipe(gunzip).pipe(writeStream);
};

await decompress();
