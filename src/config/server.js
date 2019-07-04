module.exports = {
    port: 3000,
    options: {
        path: '/gateway',
        origins: '*:*',
        serveClient: 'false',
        cookie: false,
    },
};
