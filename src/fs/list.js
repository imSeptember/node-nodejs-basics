import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const currentFileUrl = import.meta.url;
const __filename = fileURLToPath(currentFileUrl);
const __dirname = path.dirname(__filename);

const sourceFolderPath = path.join(__dirname, 'files');

const list = async () => {
    try {
        const files = await fs.readdir(sourceFolderPath);

        let result = [];

        for (const file of files) {
            const fileName = path.parse(file).base;
            result.push(fileName);
        }

        console.log(result);
    } catch (error) {
        console.error('FS operation failed');
    }
};

await list();
