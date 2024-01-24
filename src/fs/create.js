import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const currentFileUrl = import.meta.url;
const __filename = fileURLToPath(currentFileUrl);
const __dirname = path.dirname(__filename);

const create = async () => {
    const filePath = path.join(__dirname, 'files', 'fresh.txt');
    const text = 'I am fresh and young';

    try {
        // Check if the file already exists
        await fs.access(filePath);
        console.error('FS operation failed');
    } catch (error) {
        // If fs.access fails, the file does not exist, proceed with creating it
        await fs.writeFile(filePath, text, 'utf8');
    }
};

await create();
