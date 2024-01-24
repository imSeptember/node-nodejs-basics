const parseEnv = () => {
    // Filter and format RSS_ variables
    const rssVariables = Object.entries(process.env)
        .filter(([key, value]) => key.startsWith('RSS_'))
        .map(([key, value]) => `${key}=${value}`)
        .join('; ');

    // Log filtered RSS_ variables
    console.log(rssVariables);

    process.argv.forEach((val, index) => {
        console.log(`${index}: ${val}`);
    });
};

parseEnv();
