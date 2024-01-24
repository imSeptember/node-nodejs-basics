import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const currentFileUrl = import.meta.url;
const __filename = fileURLToPath(currentFileUrl);
const __dirname = path.dirname(__filename);

const sourceFolderPath = path.join(__dirname, 'files');
const destinationFolderPath = path.join(__dirname, 'files-copy');

const copy = async () => {
    try {
        await fs.access(destinationFolderPath, fs.constants.F_OK);
        console.error(`FS operation failed`);
    } catch (err) {
        try {
            await fs.mkdir(destinationFolderPath);
        } catch (mkdirErr) {
            throw mkdirErr;
        }
    }

    const sourceFiles = await fs.readdir(sourceFolderPath);

    for (const file of sourceFiles) {
        const sourceFilePath = path.join(sourceFolderPath, file);
        const destinationFilePath = path.join(destinationFolderPath, file);
        await fs.copyFile(sourceFilePath, destinationFilePath);
    }
};

await copy();
