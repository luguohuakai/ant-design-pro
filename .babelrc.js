module.exports = {
    plugins: [
        ["import",
            {
                "libraryName": "antd",
                "style": true,
            }
        ],
        [
            'babel-plugin-module-resolver',
            {
                alias: {
                    components: './src/components',
                },
            },
        ],
    ],
};