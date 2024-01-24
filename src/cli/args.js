const parseArgs = () => {
    const userArgs = process.argv.slice(2);

    const regex = /^--/;
    let string = [];

    for (let index = 0; index < userArgs.length; index += 2) {
        string.push(
            `${userArgs[index].replace(regex, '')} is ${userArgs[
                index + 1
            ].replace(regex, '')}`
        );
    }

    console.log(string.join(', '));
};

parseArgs();
