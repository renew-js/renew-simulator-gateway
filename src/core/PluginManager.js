class PluginManager {

    constructor (serverManager) {
        this.serverManager = serverManager;
        this.plugins = {};
        this.registerHandlers();
    }

    registerHandlers () {
        this.serverManager.registerHandlers((socket) => {
            socket.emit('plugin.list', Object.values(this.plugins));
        });
    }

    registerPlugin (plugin) {
        this.plugins[plugin.name] = plugin;
    }

    getPlugin (pluginName) {
        return this.plugins[pluginName];
    }

}

module.exports = PluginManager;
