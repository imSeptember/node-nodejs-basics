// Import necessary modules
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import { Readable } from 'stream';

// Get the current file's URL and convert it to a file path
const currentFileUrl = import.meta.url;
const __filename = fileURLToPath(currentFileUrl);
const __dirname = path.dirname(__filename);

// Define the path to the source file for which to calculate the hash
const sourceFilePath = path.join(
    __dirname,
    'files',
    'fileToCalculateHashFor.txt'
);

// Define a function to calculate the hash of the source file
const calculateHash = async () => {
    // Create a readable stream to read the contents of the source file
    const readStream = fs.createReadStream(sourceFilePath);

    // Create a hash stream using the SHA-256 algorithm
    const hashStream = crypto.createHash('sha256');

    // Event handler for when data is read from the source file
    readStream.on('data', (chunk) => {
        // Update the hash stream with the current chunk of data
        hashStream.update(chunk);
    });

    // Event handler for when the end of the source file is reached
    readStream.on('end', () => {
        // Finalize the hash computation and obtain the hexadecimal representation
        const hash = hashStream.digest('hex');

        // Create a readable stream for the hash output
        const hashStreamOutput = new Readable();
        hashStreamOutput.push(hash);
        hashStreamOutput.push(null); // Indicates the end of the stream

        // Pipe the hash output stream to the standard output (console)
        hashStreamOutput.pipe(process.stdout);
    });
};

// Call the calculateHash function to start the hash calculation
await calculateHash();
