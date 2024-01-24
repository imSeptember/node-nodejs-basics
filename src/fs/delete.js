import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const currentFileUrl = import.meta.url;
const __filename = fileURLToPath(currentFileUrl);
const __dirname = path.dirname(__filename);

const sourceFilePath = path.join(__dirname, 'files', 'fileToRemove.txt');

const remove = async () => {
    try {
        await fs.access(sourceFilePath, fs.constants.F_OK);
        await fs.unlink(sourceFilePath);
    } catch (error) {
        console.error(`FS operation failed`);
    }
};

await remove();
