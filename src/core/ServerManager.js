const Server = require('socket.io');

class ServerManager {

    constructor (config) {
        this.config = config;
        this.io = null;
        this.init();
    }

    init () {
        this.io = new Server(this.config.port, this.config.options);
        this.io.on('connection', (socket) => {
            console.log('ServerManager: Client connected.');
            socket.on('disconnect', () => {
                console.log('ServerManager: Client disconnected.');
            });
        });
        console.log(`ServerManager: Listening on port ${this.config.port}.`);
    }

    attach () {
        // this.io.attach(this.config.port);
    }

}

module.exports = ServerManager;
