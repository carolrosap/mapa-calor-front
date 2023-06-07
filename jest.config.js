module.exports = {
    module: 'es6',
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    moduleNameMapper: {
        '\\.html$': 'html-loader',
    },
    testEnvironment: 'jest-environment-jsdom'
};
