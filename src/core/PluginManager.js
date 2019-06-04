class PluginManager {

    constructor (serverManager) {
        this.serverManager = serverManager;
        this.plugins = new Set();
        this.socket = null;
        this.listen();
    }

    listen () {
        this.socket = this.serverManager.io.on('connection', (socket) => {
            socket.emit('plugin.list', Array.from(this.plugins));
        });
    }

    register (plugin) {
        this.plugins.add(plugin);
    }

    initialize () {
        return Promise.all(Array.from(this.plugins).map((plugin) => {
            const name = plugin.constructor.name;
            console.log(`PluginManager: Initializing ${name} ...`);
            return plugin.initialize(this.serverManager);
        }));
    }

}

module.exports = PluginManager;
