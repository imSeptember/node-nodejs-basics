import fs from 'fs';

const read = async () => {
    fs.readFile('./src/fs/files/fileToRead.txt', 'utf8', (err, data) => {
        if (err) {
            console.log('FS operation failed');
            return;
        }
        console.log(data);
    });
};

await read();
