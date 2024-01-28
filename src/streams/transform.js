import { Transform } from 'stream';

const transform = async () => {
    const readStream = process.stdin;
    const writeStream = process.stdout;
    console.log(readStream);

    const reverse = new Transform({
        transform(chunk, encoding, callback) {
            callback(null, chunk.toString().split('').reverse().join(''));
        },
    });

    readStream.pipe(reverse).pipe(writeStream);
};

await transform();
