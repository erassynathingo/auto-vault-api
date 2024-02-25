module.exports = {
    apps: [
        {
            name: "autovault-api",
            script: "./index.js",
            watch: true,
            ignore_watch: [
                ".git",
                ".md",
                "/logs",
                "logs",
                "node_modules",
            ],
            time: true,
            env: {
                PORT: process.env.PORT,
            },
        },
    ],
};
